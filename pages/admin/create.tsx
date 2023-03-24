import CreateNFT from '../../components/CreateNFT';

// import '../../assets/css/createItem.css'

const CreateItemContainer = () => {
  return (
    <>
      <div className="p-2">
        <a className="" href="/admin">
          <span className="fa fa-arrow-circle-left fa-3x"></span>
        </a>
      </div>
      <li></li>
      <section className="blog-area section-padding-100">
        <div className="container">
          <div className="row">
            <CreateNFT />
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
