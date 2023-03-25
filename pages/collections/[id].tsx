import { useRouter } from 'next/router';
import { NFTs } from '.index'
import NftDetailsPage from '../../components/NFTDetailPage/NFTDetailPage';

const NftDetail = ({ nft }) => {
    return (
      <div>
        <h1>{nft.name}</h1>
        <p>{nft.description}</p>
        <img src={nft.image} alt={nft.name} />
      </div>
    );
  };

  const NftDetailPage = ({ nft }) => {
    return (
      <div>
        <h1>NFT Details</h1>
        <NftDetail nft={nft} />
      </div>
    );
  };

  export default NftDetailPage;

  export async function getServerSideProps({ params }) {
    const nftId = params.id;
    const nft = Nfts.find((nft) => nft.id === nftId);

    return {
      props: {
        nft,
      },
    };
  }
