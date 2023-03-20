import ListedItems from "../../components/ListedItems";

const NFTs = [{"description":"alignmint is bringing web2 conservation efforts on-chain, creating donation transparency through verification of resources while allowing wildlife, oceanic, or any other conservation project to rapidly tokenize their efforts. we are incentivizing sustainable projects to provide data that may otherwise go unreported while giving them the power of web3 in seamlessly creating their own data-backed, dynamic NFT collection via template embedded in our UI.\n\nwe are offering our technology to verified projects for a percentage of their NFT sale revenue and are redistributing aggregated data profits back to projects who continue to update their data. our community will be able to see exactly where their money is going when donating to a project as all NFT's are updated by our verified partners to show progress of their efforts.\n\nour tokenization protocol gives projects exposure to investors who need high-quality quantification of impact. as our network grows, we have an opportunity to become one of the largest aggregators of environmental and social impact data, along with extremely granular data that can be used to quantify and model social impact results.","name":"Alignmint Genesis","attributes":[{"trait_type":"mission","value":"transparency on chain"}],"image":"https://nftstorage.link/ipfs/bafkreidjkweylf5kahig6lxtr5o2wes75yx4jvsun3v5rjgalyxh6tilsa","background_color":"","youtube_url":"","external_url":""},
{"description":"Please support Tony","name":"Tony the Tiger","attributes":[{"trait_type":"animal","value":"tiger"},{"trait_type":"data","value":"https://app.niftykit.com/access/f2529398-1832-409d-aa07-884249b8d847"}],"image":"https://nftstorage.link/ipfs/bafkreicgdnalzumwsoztncxv2ewjrpytx6ipxq5q7ze7wx76m6il4mb35e","background_color":"","youtube_url":"","external_url":""}]



const Home = () => {
  return (
    <>
      <ListedItems nfts={NFTs}/>
    </>
  );
};

export default Home;
