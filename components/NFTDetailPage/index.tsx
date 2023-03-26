import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { abi } from '../../nft-stuff/abi';
import { CollectionList, Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

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

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const NFTDetail = ({ nft, setSelectedNFT }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [nextTokenId, setNextTokenId] = useState(0);
  const [tokenURI, setTokenURI] = useState('');
  const [showMakeUpdate, setShowMakeUpdate] = useState(false);
  const [showViewUpdate, setShowViewUpdate] = useState(false);
  const router = useRouter();

  //update params
  const [fieldName, setFieldName] = useState('');
  const [value, setValue] = useState('');
  const [metric, setMetric] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState();
  const [updates, setUpdates] = useState<any[]>();

  useEffect(() => {
    listenToUpdates();
  }, []);

  useEffect(() => {
    if (router.pathname.includes('admin') && address === nft.creator) {
      setShowMakeUpdate(true);
    }

    if (router.pathname.includes('admin') && address === nft.owner) {
      setShowViewUpdate(true);
    }
  }, []);

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

  const createUpdate = async (event) => {
    event.preventDefault();
    const col = db.collection('Update');

    // TODO: make the creator the signer by creating app scoped keys
    db.signer((data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
      };
    });

    try {
      if (fieldName === '' || value === '' || !address) {
        alert('must include all required fields');
        return;
      }

      const recordData = await col.create([
        nanoid(), //creates unique id for the NFT entry
        fieldName, //sets the name of the NFT
        `${Date.now()}`,
        value,
        address, //creator address
        nft.id, //
        metric,
        note,
        image,
      ]);

      console.log('update', recordData);

      const colNFT = db.collection('NFT');

      db.signer((data) => {
        return {
          h: 'eth-personal-sign',
          sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
        };
      });

      // --- TODO: Add encrypted Update getting error probably need to stringify outside of call
      // const dataString = JSON.stringify(recordData.data);
      // const updateNFT = await colNFT
      //   .record(nft.id)
      //   .call('addUpdate', [dataString]);

      // console.log('updateNFT', updateNFT);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const listenToUpdates = async () => {
    const col = db.collection('Update');
    const { data } = await col.where('nft', '==', nft.id).get();
    let temps = data.map((nft) => nft.data);
    setUpdates(temps);
  };

  const fieldNameHandler = (event) => {
    setFieldName(event.target.value);
  };

  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  const metricHandler = (event) => {
    setMetric(event.target.value);
  };

  const noteHandler = (event) => {
    setNote(event.target.value);
  };

  const imageUrlHandler = (event) => {
    setImage(event.target.value);
  };

  return (
    <div className="container row justify-content-around mb-5">
      <span
        onClick={() => setSelectedNFT(null)}
        className="fa fa-arrow-circle-left fa-3x"
        style={{ color: '#007bff' }}
      ></span>

      <div className="col-12 col-lg-4 mt-5">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <div className="pricing-item">
                <div className="filers-list">
                  <div className="container">
                    <img
                      src={nft.image}
                      width="300"
                      alt=""
                      className="mx-auto"
                    />
                  </div>
                </div>
                <br></br>
                <br></br>
                <h2>{nft.name}</h2>
                <span style={{ color: 'white' }}>
                  Creator: ...{nft.creator.slice(-4)}
                </span>
                <div>
                  <span style={{ color: 'white' }}>
                    Description: {nft.description}
                  </span>
                </div>
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

      {/* MAKE UPDATE SECTION */}
      {showMakeUpdate ? (
        <div className="col-12 col-lg-4 mt-5 accordion">
          <div className="accordion-item">
            <h5
              style={{ color: 'white' }}
              className="text-center accordion-heade"
            >
              Add Update
            </h5>

            <div className="col-12 col-md-12">
              <label className="text-white">Data Field Name</label>
              <div className="group">
                <span className="highlight"></span>
                <span className="bar"></span>
                <input
                  className="mt-3"
                  type="text"
                  name="fieldName"
                  id="fieldName"
                  value={fieldName}
                  onChange={fieldNameHandler}
                  required
                  placeholder="eg. Weight"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label className="text-white">Data Field Value</label>
              <div className="group">
                <span className="highlight"></span>
                <span className="bar"></span>
                <input
                  className="mt-3"
                  type="text"
                  name="value"
                  id="value"
                  value={value}
                  onChange={valueHandler}
                  required
                  placeholder="eg. 1337"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label className="text-white">Data Field Unit</label>
              <div className="group">
                <span className="highlight"></span>
                <span className="bar"></span>
                <input
                  className="mt-3"
                  type="text"
                  name="metric"
                  id="metric"
                  value={metric}
                  onChange={metricHandler}
                  placeholder="eg. lbs"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label className="text-white">Data Field Note</label>
              <div className="group">
                <span className="highlight"></span>
                <span className="bar"></span>
                <input
                  className="mt-3"
                  type="text"
                  name="note"
                  id="note"
                  value={note}
                  onChange={noteHandler}
                  placeholder="cool things about this update!"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label className="text-white">Image IPFS link</label>
              <div className="group">
                <span className="highlight"></span>
                <span className="bar"></span>
                <input
                  className="mt-3"
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={imageUrlHandler}
                  placeholder="https://nftstorage.link/ipfs/bafkreiehtzrt3aqjsqdg5tfi6mrv4xovcwvtd7sggtvhsuwks4cykaaofq"
                />
              </div>
            </div>

            <button className="btn btn-primary mr-3" onClick={createUpdate}>
              Submit Update
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* VIEW UPDATES SECTION */}
      {showViewUpdate ? (
        <div className="col-12 col-lg-4 mt-5">
          <h5 style={{ color: 'white' }} className="text-center">
            {' '}
            Updates
          </h5>
          <div>
            {updates ? (
              <>
                {updates.map((update, i) => (
                  <div className="card mb-2">
                    <div className="card-body">
                      <div>
                        <span style={{ fontWeight: 'bold' }}>name</span>:{' '}
                        {update.name}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>value</span>:{' '}
                        {update.value}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>metric</span>:{' '}
                        {update?.metric}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>note</span>:
                        {update?.note}
                      </div>
                      <img src={update?.image} />
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NFTDetail;
