// custom hooks
import useFirestore from '../hooks/useFirestore';

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore('transactions');

  const deleteTransactionHandler = id => {
    // delete document from firestore
    deleteDocument(id);
  };

  return (
    <ul className="expenses">
      {transactions.map(transaction => (
        <li key={transaction.id}>
          <p className="name">{transaction.name}</p>
          <p className="amount">{transaction.amount}</p>
          <button onClick={deleteTransactionHandler.bind(null, transaction.id)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
