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
      </>
    )
}


export default NFTDetail
