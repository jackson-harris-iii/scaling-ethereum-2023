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
  const [issued, setIssued] = useState<any[]>();
  const [acquired, setAcquired] = useState<any[]>();

  const getIssued = async () => {
    try {
      const col = db.collection('NFT');
      const { data } = await col.where('creator', '==', address).get();
      console.log('here is the data', data);
      let temps = data.map((nft) => nft.data);
      setIssued(temps);
    } catch (error) {
      alert(error);
    }
  };
  const getAcquired = async () => {
    try {
      const col = db.collection('NFT');
      const { data } = await col.where('owner', '==', address).get();
      console.log('here is the data', data);
      let tempdata = data.map((nft) => nft.data);
      setAcquired(tempdata);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getIssued();
    getAcquired();
  }, [address]);

  return (
    <div className="container pt-5">
      <Header Title={'se2023-project'} />
      {/* <div className=" row justify-content-center">
        <div className="col-6 mt-5 text-center mb-5" style={{ color: 'white' }}>
          <h1>Dashboard</h1>
        </div>
      </div> */}

      <h4 className=" text-center">Acquired Collectibles</h4>
      <div className="pt-5">
        <ListedItems nfts={acquired} admin={true} />
      </div>
      <h4 className=" text-center mt-5">Issued Collectibles</h4>
      <div className=" row justify-content-center mb-5">
        <a className="btn more-btn mt-3" href="/admin/create">
          Create Collectible
        </a>
      </div>
      <div className="pt-5">
        <ListedItems nfts={issued} admin={true} />
      </div>
    </div>
  );
};

export default AdminDashboard;
