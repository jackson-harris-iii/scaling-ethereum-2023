import Link from 'next/link'

const Item = ({nft, setSelectedNFT}) => {
  console.log('these are the nfts', nft)
  return(
    <div className="col-lg-3 col-sm-6 col-xs-12">
        <div className="pricing-item ">
            <div className="wraper">
                <Link  href="/ItemDetails"><img src={nft.image} alt="" /></Link>
                {/* <Link  href="/ItemDetails"><h4>Scarecrow in daylight</h4></Link> */}
                <div className="owner-info">
                    <img src={nft.image} width="40" alt="" />
                   <button onClick={() => setSelectedNFT(nft)}>{nft.name}</button>
                </div>
                {/* <span><span className="g-text">Price</span> {price} ETH <span className="g-text ml-15">1 of 10</span></span> */}
                {/* <div className="pricing">Highest Bid : <span className="ml-15">{bid} ETH</span> </div> */}
                {/* <div className="admire">
                    <div className="adm"><i className="fa fa-clock-o"></i> 6 Hours Ago</div>
                    <div className="adm"><i className="fa fa-heart-o"></i>134 Like</div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Item
