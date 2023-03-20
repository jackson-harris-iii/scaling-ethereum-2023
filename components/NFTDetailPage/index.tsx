import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NextApiRequest, NextApiResponse } from 'next';


const NFTDetail = ( {nft, setSelectedNFT} ) => {


    return (
      <>
        <div>I'm an NFT!</div>
        <button onClick={() => setSelectedNFT(null)}>Go back to my collection</button>
      </>
    )
}


export default NFTDetail
