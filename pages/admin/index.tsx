import ListedItems from '../../components/ListedItems';
import Header from '../../layouts/Header';
const AdminDashboard = () => {
  return (
    <div className="container">
      <Header Title={'se2023-project'} />
      <div className=" row justify-content-center">
        <div className="col-6 mt-5 text-center mb-5" style={{ color: 'white' }}>
          <h1>Dashboard</h1>
        </div>
      </div>
      <a className="btn more-btn" href="/admin/create">
        Create NFT
      </a>
      <h4 className=" text-center">My Created NFTs</h4>
      <ListedItems nfts={[]} admin={true} />
    </div>
  );
};

export default AdminDashboard;
