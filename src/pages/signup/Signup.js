import { useRef } from 'react';

// custom hooks
import useSignup from '../../hooks/useSignup';

// notification
import { toast } from 'react-toastify';

const Signup = () => {
  const displayNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const { signup } = useSignup();

  const notify = notifyText => toast.warn(notifyText);

  const formSubmitHandler = e => {
    e.preventDefault();

    const enteredDisplayName = displayNameInput.current.value.trim();
    const enteredEmail = emailInput.current.value.trim();
    const enteredPassword = passwordInput.current.value.trim();
    const enteredConfirmPassword = confirmPasswordInput.current.value.trim();

    if (
      enteredDisplayName.length === 0 ||
      enteredEmail.length === 0 ||
      enteredPassword.length === 0 ||
      enteredConfirmPassword.length === 0
    ) {
      // alert
      notify('You must enter a value for all fields!');
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      // alert
      notify('Passwords do not match!');
      return;
    }

    // signup
    signup(enteredEmail, enteredPassword, enteredDisplayName);
  };

  return (
    <form onSubmit={formSubmitHandler} className="signup-form">
      <h2>Signup</h2>
      <label>
        <span>Display Name:</span>
        <input ref={displayNameInput} type="text" />
      </label>
      <label>
        <span>Email:</span>
        <input ref={emailInput} type="email" />
      </label>
      <label>
        <span>Password:</span>
        <input ref={passwordInput} type="password" />
      </label>
      <label>
        <span>Confirm Password:</span>
        <input ref={confirmPasswordInput} type="password" />
      </label>
      <button className="btn">Signup</button>
    </form>
  );
};

export default Signup;
