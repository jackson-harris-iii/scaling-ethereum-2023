import ListedItems from '../../components/ListedItems';
import Header from '../../layouts/Header';
import HeroContainer from '../../components/Hero'

export const NFTs = [
  {
    Description:
      "alignmint is bringing web2 conservation efforts on-chain, creating donation transparency through verification of resources while allowing wildlife, oceanic, or any other conservation project to rapidly tokenize their efforts. we are incentivizing sustainable projects to provide data that may otherwise go unreported while giving them the power of web3 in seamlessly creating their own data-backed, dynamic NFT collection via template embedded in our UI.\n\nwe are offering our technology to verified projects for a percentage of their NFT sale revenue and are redistributing aggregated data profits back to projects who continue to update their data. our community will be able to see exactly where their money is going when donating to a project as all NFT's are updated by our verified partners to show progress of their efforts.\n\nour tokenization protocol gives projects exposure to investors who need high-quality quantification of impact. as our network grows, we have an opportunity to become one of the largest aggregators of environmental and social impact data, along with extremely granular data that can be used to quantify and model social impact results.",
    name: 'Alignmint Genesis',
    Attributes: [{ trait_type: 'mission', value: 'transparency on chain' }],
    image:
      'https://nftstorage.link/ipfs/bafkreidjkweylf5kahig6lxtr5o2wes75yx4jvsun3v5rjgalyxh6tilsa',
    background_color: '',
    youtube_url: '',
    external_url: '',
  },
  {
    description: 'Please support Tony',
    name: 'Tony the Tiger',
    attributes: [
      { trait_type: 'animal', value: 'tiger' },
      {
        trait_type: 'data',
        value:
          'https://app.niftykit.com/access/f2529398-1832-409d-aa07-884249b8d847',
      },
    ],
    image:
      'https://nftstorage.link/ipfs/bafkreicgdnalzumwsoztncxv2ewjrpytx6ipxq5q7ze7wx76m6il4mb35e',
    // background_color: '',
    // youtube_url: '',
    // external_url: '',
  },
];


const HomeDemo1 = () => {

  return (
  	<>
      <Header Title='Scaling Etherum' />
      <HeroContainer
        ClassDiv="hero-section moving section-padding"
        addMoving={true}
        title="Igniting Trust in Giving: Donate with Confidence, Witness the Change"
        textUp="The best place to support your charitable organizations and get updates on the impact of"
        SpanTex="your donation"
        textDown="Chain of Impact revolutionizes the charitable giving landscape by leveraging transparent blockchain data management to empower donors and support organizations. This project enables users to track their donations and witness their impact firsthand, fostering trust and accountability within the philanthropic sector. Experience a new level of engagement with your favorite causes and stay updated on the tangible outcomes of your generosity."
        linkUp="https://github.com/jackson-harris-iii/scaling-ethereum-2023"
        linkDown="https://ethglobal.com/showcase/chain-of-impact-knbts"
      />
        <div className="container-fluid">
        <div className="row mb-5">
          <Header Title={'se2023-project'} />
        </div>
        <ListedItems nfts={NFTs} admin={false} />
      </div>
      {/* <TopCollections />
      <TopSellers />
      <ListedItems />
      <LiveAuctions /> */}
      {/* <Footer /> */}
    </>
  );
}

export default HomeDemo1;


// const Home = () => {
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row mb-5">
//           <Header Title={'se2023-project'} />
//         </div>
//         <ListedItems nfts={NFTs} admin={false} />
//       </div>
//     </>
//   );
// };

// export default Home;
