// import Link from 'next'
// import InfoComponent from '../InfoComponent'
import React from 'react';
// import Item from './item';
import { useState } from 'react';
import NFTDetailPage from '../NFTDetailPage';
// import {ListedItemsData} from '../../data/data-components/data-ListedItems.js'
// import ListedItemsData from './data.json'

// import './listedItems.css'

const ListedItems = ({ nfts, admin }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);

  if (selectedNFT) {
    return <NFTDetailPage nft={selectedNFT} setSelectedNFT={setSelectedNFT} />;
  }

  return (
    <section className="features section-padding-0-100 ">
      <div className="container">
        {admin ? <></> : <div style={{ color: 'white' }}>Collections Page</div>}

        <div className="row align-items-center">
          {nfts &&
            nfts.map((item, i) => (
              <Item key={i} nft={item} setSelectedNFT={setSelectedNFT} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ListedItems;

export { Item };


const Item = ({ nft, setSelectedNFT }) => {
  const handleClick = () => {
    setSelectedNFT(nft);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="single-feature">
        <div className="feature-thumb">
          <img className="img-fluid" src={nft.image} alt={nft.name} />
          <div className="price">{nft.price}</div>
        </div>
        <div className="feature-content">
          <h4>{nft.name}</h4>
          <p>{nft.description}</p>
          <button className="btn btn-primary" onClick={handleClick}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
