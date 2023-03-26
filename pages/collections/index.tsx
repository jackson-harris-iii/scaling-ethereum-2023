import ListedItems from '../../components/ListedItems';
import Header from '../../layouts/Header';
import HeroContainer from '../../components/Hero';
import { useContract, useOwnedNFTs, useNFTs } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { PolygonZkevmTestnet } from '@thirdweb-dev/chains';
import { SmartContract, ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { abi } from '../../nft-stuff/abi';
import { BaseContract } from 'ethers';
import { useAccount } from 'wagmi';
import { Polybase } from '@polybase/client';

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const HomeDemo1 = () => {
  const [nfts, setNFTs] = useState<any[]>();

  const { address, isConnecting, isDisconnected } = useAccount();

  const { contract, isLoading } = useContract(
    '0x031Ee64fB75a3d23b7Ef4F8c44b3BCE1bB4D728b',
    abi
  );

  const getNFTs = async () => {
    try {
      const col = db.collection('NFT');
      const { data } = await col.get();
      console.log('here is the data', data);
      let temps = data.map((nft) => nft.data);
      setNFTs(temps);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getNFTs();
  }, []);

  useEffect(() => {
    console.log('contract', contract);
  }, [contract]);

  // useEffect(() => {
  //   console.log('data', data);
  // }, [data]);

  return (
    <>
      <Header Title="Scaling Ethereum" />
      <HeroContainer
        ClassDiv="hero-section moving section-padding"
        addMoving={true}
        title="Igniting Trust in Giving: Donate with Confidence, Witness the Change"
        textUp="The best place to support your charitable organizations and get updates on the impact of"
        SpanTex="your donation"
        textDown="Chain of Impact revolutionizes the charitable giving landscape by leveraging transparent blockchain data management to empower donors and support organizations. This project enables users to track their donations and witness their impact firsthand, fostering trust and accountability within the philanthropic sector. Experience a new level of engagement with your favorite causes and stay updated on the tangible outcomes of your generosity."
        linkUp="https://github.com/jackson-harris-iii/scaling-ethereum-2023"
        linkDown="https://ethglobal.com/showcase/chain-of-impact-knbts"
      />
      <div className="container-fluid">
        <div className="row mb-5">
          <Header Title={'se2023-project'} />
        </div>
        <ListedItems nfts={nfts} admin={false} />
      </div>
      {/* <TopCollections />
      <TopSellers />
      <ListedItems />
      <LiveAuctions /> */}
      {/* <Footer /> */}
    </>
  );
};

export default HomeDemo1;
