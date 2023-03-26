import React, { useEffect } from 'react';
import { useState } from 'react';
import NFTDetailPage from '../NFTDetailPage';
import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { useRouter } from 'next/router';

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const ListedItems = ({ nfts, admin }) => {
  const router = useRouter();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nftPrice, setNftPrice] = useState('');
  const [showPriceChange, setShowPriceChange] = useState(false);

  const handlePriceChange = (event) => {
    setNftPrice(event.target.value);
  };

  const updatePrice = async (event, nft) => {
    event.preventDefault();
    const col = db.collection('NFT');
    db.signer((data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
      };
    });

    try {
      const response = await col.record(nft.id).call('setPrice', [nftPrice]);
      console.log('here is the response', response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (router.pathname.includes('admin')) {
      setShowPriceChange(true);
    }
  }, []);

  if (selectedNFT) {
    return <NFTDetailPage nft={selectedNFT} setSelectedNFT={setSelectedNFT} />;
  }

  return (
    <section className="features section-padding-0-100 ">
      <div className="container">
        {admin ? <></> : <h3 style={{ color: 'white' }}>Explore</h3>}

        <div className="row align-items-center">
          {nfts &&
            nfts.map((item, i) => (
              <Item
                key={item.id}
                nft={item}
                setSelectedNFT={setSelectedNFT}
                handlePriceChange={handlePriceChange}
                showPriceChange={showPriceChange}
                updatePrice={updatePrice}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ListedItems;

export { Item };

const Item = ({
  nft,
  setSelectedNFT,
  handlePriceChange,
  showPriceChange,
  updatePrice,
}) => {
  const handleClick = () => {
    setSelectedNFT(nft);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={nft.id}>
      <div className="single-feature dd-bg pricing-item">
        <div className="feature-thumb">
          <img className="img-fluid" src={nft.image} alt={nft.name} />
        </div>
        <div className="feature-content">
          <h4 className="text-center">{nft.name}</h4>
          {/* <p>{nft.description}</p> */}
          <div className="price text-white text-center">
            Mint Price: {nft.price} ETH
          </div>
          <div className="container text-center">
            <button className="btn btn-primary m-3" onClick={handleClick}>
              View Details
            </button>
          </div>
          {/* <div className="mt-3">
            {showPriceChange ? (
              <span style={{ color: 'white' }}>
                update price<input onChange={handlePriceChange}></input>
                <button onClick={(event) => updatePrice(event, nft)}>
                  submit update
                </button>
              </span>
            ) : (
              <></>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
