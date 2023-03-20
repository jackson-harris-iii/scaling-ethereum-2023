import { Web3Button } from '@web3modal/react';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import Header from '../layouts/Header';

const Home = () => {
  //hook to access wallet connect user address
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (address && address.length > 10) {
      Router.push('/collections');
    }
  }, [address]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-5">
          <Header Title={'se2023-project'} />
        </div>
        <br />

        <div className="row">
          <div style={{ color: 'white' }}>Home Page</div>
        </div>
      </div>
    </>
  );
};

export default Home;
