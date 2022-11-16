// custom hooks
import useAuthContext from '../../hooks/useAuthContext';
import useCollection from '../../hooks/useCollection';

// components
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';

const Home = () => {
  const {
    user: { uid },
  } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', uid],
    ['createdAt', 'desc']
  );

  return (
    <div className="main-container">
      <div className="content">
        {error ? <p>{error}</p> : null}
        {documents ? <TransactionList transactions={documents} /> : null}
      </div>
      <div className="sidebar">
        <TransactionForm uid={uid} />
      </div>
    </div>
  );
};

export default Home;
