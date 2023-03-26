import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { abi } from '../../nft-stuff/abi';
import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export const Collection = ({ nfts }) => {
  return (
    <div>
      <h1>My NFT Collection</h1>
      {nfts.map((nft) => (
        <div key={nft.id}>
          <h2>{nft.name}</h2>
          <Link href={`/nft/${nft.id}`}>
            <a>View NFT</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

// const safeMintConfig = (address, nextTokenId, tokenURI, setConfig) => {
//   const { config, error } = usePrepareContractWrite({
//     address: '0x031Ee64fB75a3d23b7Ef4F8c44b3BCE1bB4D728b',
//     abi: abi,
//     functionName: 'safeMint',
//     args: [address, nextTokenId, tokenURI],
//   });
//   setConfig(config);
//   return <></>;
// };

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const NFTDetail = ({ nft, setSelectedNFT }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [nextTokenId, setNextTokenId] = useState(0);
  const [tokenURI, setTokenURI] = useState('');

  // let { config, error } = usePrepareContractWrite({
  //   address: '0x031Ee64fB75a3d23b7Ef4F8c44b3BCE1bB4D728b',
  //   abi: abi,
  //   functionName: 'safeMint',
  //   args: [address, nextTokenId, tokenURI],
  // });

  // const [sMconfig, setSMConfig] = useState(config);

  useEffect(() => {
    // console.log('sMconfig', sMconfig);
  }, [address, nextTokenId, tokenURI]);

  const purchaseNFT = async () => {
    const uri =
      'https://testnet.polybase.xyz/v0/collections/pk%2F0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db%2Fse-2023%2FNFT/records/' +
      nft.id +
      '?format=nft`';

    setTokenURI(uri);

    const col = db.collection('CollectionMetadata');
    db.signer((data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
      };
    });
    const colMetadata = await col.record('MNCZm9jWAal292JkXRJQo').get();
    // console.log('colMetadata', colMetadata.data.count);
    const id = colMetadata.data.count + 1;
    setNextTokenId(id);

    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.NEXT_PUBLIC_COI_PRIVATE, // Your wallet's private key (only required for write operations)
      {
        name: 'Polygon zkEVM Testnet',
        //@ts-ignore
        title: 'Polygon zkEVM Testnet',
        chain: 'Polygon',
        rpc: [
          'https://polygon-zkevm-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}',
          'https://rpc.public.zkevm-test.net',
        ],
        faucets: [],
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        infoURL: 'https://polygon.technology/solutions/polygon-zkevm/',
        shortName: 'testnet-zkEVM-mango',
        chainId: 1442,
        networkId: 1442,
        explorers: [
          {
            name: 'Polygon zkEVM explorer',
            url: 'https://explorer.public.zkevm-test.net',
            standard: 'EIP3091',
          },
        ],
        testnet: true,
        slug: 'polygon-zkevm-testnet',
      }
    );

    // const { write } = useContractWrite(config);
    try {
      const contract = await sdk.getContract(
        '0x031Ee64fB75a3d23b7Ef4F8c44b3BCE1bB4D728b', // The address of your smart contract
        abi // The ABI of your smart contract
      );
      // const response = await contract.call(
      //   'safeMint',
      //   address,
      //   nextTokenId,
      //   tokenURI
      // );
      console.log('here is the contract', contract);
      console.log('items', address, nextTokenId, tokenURI);
      const updateCount = await col
        .record('MNCZm9jWAal292JkXRJQo')
        .call('updateCount', [nextTokenId]);
      console.log('here is the updateCount', updateCount);

      // --- TODO ---
      // check user balance for enough eth
      // take payment send to creator wallet

      // update polybase nft record with tokenid, owner, contractAddress
      const nftCol = db.collection('NFT');
      db.signer((data) => {
        return {
          h: 'eth-personal-sign',
          sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
        };
      });
      const response = await nftCol.record(nft.id).call('setOwner', [address]);
      console.log('here is the response', response);

      const setContractAddress = await nftCol
        .record(nft.id)
        .call('setContractAddress', [
          '0x031Ee64fB75a3d23b7Ef4F8c44b3BCE1bB4D728b',
        ]);
      console.log('here is the response', setContractAddress);

      const updateTokenId = await nftCol
        .record(nft.id)
        .call('setTokenId', [nextTokenId]);
      console.log('here is the response', updateTokenId);

      // update user record with owned NFT
    } catch (error) {
      console.log('err', error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <span
        onClick={() => setSelectedNFT(null)}
        className="fa fa-arrow-circle-left fa-3x"
      ></span>
      <div className="col-12 col-lg-4 mt-5">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <div className="filers-list">
                <div className="author-img ml-0">
                  <img src={nft.image} width="300" alt="" />
                </div>
              </div>
              <br></br>
              <br></br>
              <h2>{nft.name}</h2>
              <span style={{ color: 'white' }}>Creator: {nft.creator}</span>
              <div>
                <span style={{ color: 'white' }}>
                  Description: {nft.description}
                </span>
              </div>
              <div className="mt-3">
                {nft.tokenId > 0 ? (
                  <button className="btn btn-primary mr-3" disabled>
                    Claimed
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary mr-3"
                      onClick={purchaseNFT}
                    >
                      Mint
                    </button>
                    <span style={{ color: 'white' }}>
                      Mint Price: {nft.price} ETH
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
