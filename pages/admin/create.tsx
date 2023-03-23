import CreateNFT from '../../components/CreateNFT';

// import '../../assets/css/createItem.css'

const CreateItemContainer = () => {
  return (
    <>
      <section className="blog-area section-padding-100">
        <div className="container">
          <a className="btn more-btn" href="/admin">
            {'<'}
          </a>
          <div className="row">
            <CreateNFT />
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
