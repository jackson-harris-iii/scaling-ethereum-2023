import { Polybase } from '@polybase/client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ListedItems from '../../components/ListedItems';
import Header from '../../layouts/Header';

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const AdminDashboard = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [nfts, setNFTs] = useState<any[]>();

  const getNFTs = async () => {
    try {
      const col = db.collection('NFT');
      const { data } = await col.where('creator', '==', address).get();
      console.log('here is the data', data);
      let temps = data.map((nft) => nft.data);
      setNFTs(temps);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [address]);

  return (
    <div className="container">
      <Header Title={'se2023-project'} />
      <div className=" row justify-content-center">
        <div className="col-6 mt-5 text-center mb-5" style={{ color: 'white' }}>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className=" row justify-content-center mb-5">
        <a className="btn more-btn" href="/admin/create">
          Create NFT
        </a>
      </div>
      <h4 className=" text-center">My Created NFTs</h4>
      <ListedItems nfts={nfts} admin={true} />
    </div>
  );
};

export default AdminDashboard;
