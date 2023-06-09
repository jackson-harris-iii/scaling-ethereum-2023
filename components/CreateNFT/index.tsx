import { NFTStorage } from 'nft.storage';
import { useState } from 'react';
import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { nanoid } from 'nanoid';
import { useAccount } from 'wagmi';

const db = new Polybase({
  defaultNamespace:
    'pk/0x491e5edec4b6e998d4c11f0b6fa0eb5f9c0f83f2abb302bddb0027ad9bc1a9f35263e3033a635022be1fe3c85d213ccc9980b57edf3032b50b73ca3e398d76db/se-2023',
});

const CreateNFT = () => {
  const [submitting, isSubmitting] = useState();
  const [ipfs, setIpfs] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { address, isConnecting, isDisconnected } = useAccount();
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const createItem = async (event) => {
    event.preventDefault();
    const collectionReference = db.collection('NFT');
    db.signer((data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.NEXT_PUBLIC_COI_PRIVATE, data),
      };
    });
    try {
      if (
        name === '' ||
        description === '' ||
        imageUrl === '' ||
        price === '' ||
        !address
      ) {
        alert('must include all required fields');
        return;
      }
      const recordData = await collectionReference.create([
        nanoid(), //creates unique id for the NFT entry
        name, //sets the name of the NFT
        description, //sets the description of the NFT
        imageUrl, //sets the image for the NFT
        price, //sets the initial purchase price in ETH
        address, //creator eth address
      ]);
      // console.log('recordData', recordData);
      // const data = new File([image], selectedFile, { type: 'image/png' });
      // const ipfsUrl = await storeImage(data);
      // console.log('here is the ipfsUrl', ipfsUrl);
    } catch (e) {
      console.log('this is the error', e);
      alert(e);
    }
  };
  // save image to ipfs
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0].name);
    setImage(event.target.files[0]);
    setIsFilePicked(true);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const imageUrlHandler = (event) => {
    setImageUrl(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const storeImage = async (data) => {
    const cid = await client.storeBlob(data);
    return cid;
  };

  // save initial nft meta data to polybase

  // set metadata to nft

  // create NFT

  // show success

  // sent to admin Page

  if (submitting && !ipfs) {
    <div>submitting image to ipfs</div>;
  }

  if (!submitting) {
    return (
      <>
        <div className="contact_form">
          <form action="#" method="post" id="main_contact_form" noValidate>
            <div className="row">
              <div className="col-12">
                <div id="success_fail_info"></div>
              </div>

              <div className="col-12 col-md-12">
                <label className="text-white">Name</label>
                <div className="group">
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <input
                    className="mt-3"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={nameHandler}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                {/* <label className="text-white">doing this because trash</label> */}
                <label className="text-white">Image IPFS link</label>
                <div className="group">
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <input
                    className="mt-3"
                    type="text"
                    name="ipfslink"
                    id="ipfslink"
                    required
                    value={imageUrl}
                    onChange={imageUrlHandler}
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="text-white">
                  Item Description{' '}
                  {"(list what kinds of updates you'll provide too!)"}
                </label>
                <div className="group">
                  <textarea
                    name="Description"
                    id="Description"
                    value={description}
                    onChange={descriptionHandler}
                    required
                  ></textarea>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>

              <div className="col-2 col-md-2">
                <label className="text-white">Price</label>
                <div className="group text-white">
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <input
                    className="mt-3"
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    required
                    onChange={priceHandler}
                  />{' '}
                  ETH
                </div>
              </div>

              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="more-btn mb-15"
                  onClick={createItem}
                >
                  Create Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default CreateNFT;
