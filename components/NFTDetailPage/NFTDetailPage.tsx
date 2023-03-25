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

// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import {NFTs} from '../../pages/collections';

// const Collection = ({ nfts }) => {
//   return (
//     <div>
//       <h1>My NFT Collection</h1>
//       {nfts.map((nft) => (
//         <div key={nft.id}>
//           <h2>{nft.name}</h2>
//           <Link href={`/nft/${nft.id}`}>
//             <a>{nft.name}</a>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// const NftDetails = ({ nft }) => {
//   return (
//     <div>
//       <h1>{nft.name}</h1>
//       <p>{nft.description}</p>
//       <img src={nft.image} alt={nft.name} />
//     </div>
//   );
// };

// const NftPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const nft = nfts.find((nft) => nft.id === id);

//   if (!nft) {
//     return <div>NFT not found</div>;
//   }

//   return <NftDetails nft={nft} />;
// };

// export { Collection, NftPage };
