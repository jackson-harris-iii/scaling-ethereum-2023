import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NextApiRequest, NextApiResponse } from 'next';
import Link from 'next/link';


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


const NFTDetail = ( {nft, setSelectedNFT} ) => {


  return (
    <>
        <div>I'm an NFT!</div>
        <button onClick={() => setSelectedNFT(null)}>Go back to my collection</button>
      <div className="col-12 col-lg-4 mt-s">
          <div className="sidebar-area">
              <div className="donnot-miss-widget">
                  <div className="who-we-contant">
                      <div className="filers-list">
                      <div className="author-img ml-0"><img src={nft.image} width="300" alt="" /></div>
                          {/* <Link href="/Discover"> */}
                              {/* <a className="filter-item">
                                <img src={nft.src} alt="" />Crypto Art
                              </a>
                          </Link> */}
                      </div>
                      <h4>{nft.name}</h4>
                  </div>
                  <div className="details-list">
                    {Object.keys(nft).map((key) => (
                      <p key={key}>
                        {key}: {" "}
                        <span>
                    {typeof nft[key] === "object"
                      ? JSON.stringify(nft[key])
                      : nft[key]}
                  </span>
                      </p>
                    ))}
                  </div>
                  <div className="author-item mb-30">
                      <div className="author-img ml-0"><img src={nft.image} width="70" alt="" /></div>
                      <div className="author-info">
                          <Link href="/Profile"><h5 className="author-name">N/A</h5></Link>
                          <p className="author-earn mb-0">N/A</p>
                      </div>
                  </div>
                  {/* <Link href="#test-popup"><a className="open-popup-link more-btn width-100 mt-30">Purchase Now</a></Link> */}
              </div>
          </div>
      </div>
    </>
  );
}
//     return (
//       <>
//         <div>I'm an NFT!</div>
//         <button onClick={() => setSelectedNFT(null)}>Go back to my collection</button>
//       </>
//     )
// }


export default NFTDetail
