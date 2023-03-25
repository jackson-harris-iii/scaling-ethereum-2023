<<<<<<< HEAD
import { useRouter } from 'next/router';
import { NFTs } from './index'
import NftDetailsPage from '../../components/NFTDetailPage/NFTDetailPage';

=======
>>>>>>> 1efb256 (prep for rebse)
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

<<<<<<< HEAD
  export async function getServerSideProps({ params }) {
    const nftId = Number(params.id)
    const nft = NFTs.find((nft) => nft.id === nftId);

    if (!nft) {
        return {
          notFound: true,
        };
      }
=======
export async function getServerSideProps({ params }) {
  const nftId = params.id;
  const nft = Nfts.find((nft) => nft.id === nftId);
>>>>>>> 1efb256 (prep for rebse)

  return {
    props: {
      nft,
    },
  };
}
