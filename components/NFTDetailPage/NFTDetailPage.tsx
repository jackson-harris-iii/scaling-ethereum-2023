import { useRouter } from 'next/router';

const NftDetailsPage = ({ nft }) => {
  return (
    <div>
      <h1>{nft.name}</h1>
      <p>{nft.description}</p>
      <img src={nft.image} alt={nft.name} />
    </div>
  );
};

export default NftDetailsPage;
