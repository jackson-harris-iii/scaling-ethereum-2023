import { Web3Button } from '@web3modal/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
// import './navbar.css'
// import { NavbarLogo } from '../../utils/allImgs';
import { Addshrink } from '../utils';
import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { ethers } from 'ethers';
import { nanoid } from 'nanoid';

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const checkForUser = async (address: string) => {
  await db.signer((data) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
    };
  });

  // const metaCol = db.collection('CollectionMetadata');
  // const metaRecords = await metaCol.get();

  // if (metaRecords.data.length === 0) {
  //   const init = await metaCol.create([nanoid()]);
  //   console.log('init metaData', init);
  // } else {
  //   console.log('meta records made', metaRecords);
  // }
  const col = db.collection('User');
  const doc = col.record(address);
  const user = await doc.get().catch(() => null);
  if (user) {
    return;
  }
  const collectionReference = db.collection('User');

  const { data } = await collectionReference.where('id', '==', address).get();
  // console.log('here is the address', address);
  // console.log('here is the data', data);
  // console.log('here is the PRIVATE', process.env.NEXT_PUBLIC_COI_PRIVATE);
  // console.log('here is the PUBLIC', process.env.NEXT_PUBLIC_COI_PUBLIC);

  if (data.length === 0) {
    const recordData = await collectionReference.create([
      address, //sets the user colleciton id to the current user address
      address, //sets the userPublicKey to the current user address
      address, //sets the user name to the current user address
    ]);

    console.log('here is the recordData', recordData);
  }
  // const response = await collectionReference
  //   .record(address)
  //   .call('setName', [address]);
  // console.log('here is the response', response);
};

function Header({ Title }) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const router = useRouter();

  // useEffect(() => {
  //   Addshrink();
  // }, [window.pageYOffset]);

  useEffect(() => {
    if (!address || (address.length < 10 && router)) {
      router.push('/');
    }
    checkForUser(address);
  }, [address]);

  // if (isConnecting) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="mb-5">
      {/* <Preloader Title={Title} /> */}
      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top"
        id="banner"
        style={{
          marginTop: '0px',
          zIndex: `100`,
          // position: 'absolute',
          width: '100vw',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="container">
          <Link legacyBehavior href="/">
            <a className="navbar-brand">Chain of Impact</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link legacyBehavior href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  Discover
                </a>
                <div className="dropdown-menu">
                  {data[0].dataUp &&
                    data[0].dataUp.map((item, i) => (
                      <Link legacyBehavior key={i} href={item.path}>
                        <a className="dropdown-item">{item.title}</a>
                      </Link>
                    ))}
                </div>
              </li> */}
              <li className="nav-item">
                <Link legacyBehavior href="/admin">
                  <a className="nav-link">Admin</a>
                </Link>
              </li>

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  Pages
                </a>
                <div className="dropdown-menu">
                  {data[1].dataDown &&
                    data[1].dataDown.map((item, i) => (
                      <Link legacyBehavior key={i} href={item.path}>
                        <a className="dropdown-item">{item.title}</a>
                      </Link>
                    ))}
                </div>
              </li> */}

              <li className="lh-55px">
                <Web3Button />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
