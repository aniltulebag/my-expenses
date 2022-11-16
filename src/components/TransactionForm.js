import { Fragment, useEffect, useRef } from 'react';

// custom hooks
import useFirestore from '../hooks/useFirestore';

// notification
import { toast } from 'react-toastify';

const TransactionForm = ({ uid }) => {
  const expenseNameInput = useRef();
  const expenseAmountInput = useRef();

  const { response, addDocument } = useFirestore('transactions');

  const notify = notifyText => toast.warn(notifyText);

  const formSubmitHandler = e => {
    e.preventDefault();

    const enteredExpenseName = expenseNameInput.current.value.trim();
    const enteredExpenseAmount = expenseAmountInput.current.value.trim();

    if (enteredExpenseName.length === 0) {
      // alert
      notify('You must enter a value for all fields!');
      return;
    }

    if (enteredExpenseAmount <= 0) {
      // alert
      notify('Amount must be greater than 0!');
      return;
    }

    addDocument({
      uid,
      name: enteredExpenseName,
      amount: enteredExpenseAmount,
    });
  };

  useEffect(() => {
    if (response.success) {
      // clear all input values in the form
      expenseNameInput.current.value = '';
      expenseAmountInput.current.value = '';
    }
  }, [response.success]);

  return (
    <Fragment>
      <h3>Add an Expense</h3>
      <form onSubmit={formSubmitHandler}>
        <label>
          <span>Expense name:</span>
          <input ref={expenseNameInput} type="text" />
        </label>
        <label>
          <span>Amount ($):</span>
          <input ref={expenseAmountInput} type="number" />
        </label>
        <button className="btn">Add Expense</button>
      </form>
    </Fragment>
  );
};

export default TransactionForm;
