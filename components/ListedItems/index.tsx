// import Link from 'next'
// import InfoComponent from '../InfoComponent'
import Item from './item'
import {useState} from 'react'
import NFTDetailPage from '../NFTDetailPage'
// import {ListedItemsData} from '../../data/data-components/data-ListedItems.js'
// import ListedItemsData from './data.json'

// import './listedItems.css'

const ListedItems = ({nfts}) => {
  const [selectedNFT, setSelectedNFT] = useState(null)

  if (selectedNFT) {
    return (<NFTDetailPage nft={selectedNFT} setSelectedNFT={setSelectedNFT}/>)
  }


  return(
    <section className="features section-padding-0-100 ">

        <div className="container">
            <div style={{ color: 'white' }}>collections Page</div>

            <div className="row align-items-center">
            	{nfts && nfts.map((item , i) => (
                  <Item key={i} nft={item} setSelectedNFT={setSelectedNFT}/>
            	))}
            </div>

        </div>
    </section>
  )
}

export default ListedItems
