import { Web3Button } from '@web3modal/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
// import './navbar.css'
// import { NavbarLogo } from '../../utils/allImgs';
import { Addshrink } from '../utils';

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
  }, [address]);

  // if (isConnecting) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div>
      {/* <Preloader Title={Title} /> */}
      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top"
        id="banner"
      >
        <div className="container">
          <Link legacyBehavior href="/">
            <a className="navbar-brand">
              {/* <img src={NavbarLogo.src} alt="logo" /> */}
            </a>
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
                <Link legacyBehavior href="/Activity">
                  <a className="nav-link">Activity</a>
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
