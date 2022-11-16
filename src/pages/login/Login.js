import { useRef } from 'react';

// custom hooks
import useLogin from '../../hooks/useLogin';

// notification
import { toast } from 'react-toastify';

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const { login } = useLogin();

  const notify = notifyText => toast.warn(notifyText);

  const formSubmitHandler = e => {
    e.preventDefault();

    const enteredEmail = emailInput.current.value.trim();
    const enteredPassword = passwordInput.current.value.trim();

    if (enteredEmail.length === 0 || enteredPassword.length === 0) {
      // alert
      notify('You must enter a value for all fields!');
      return;
    }

    // login
    login(enteredEmail, enteredPassword);
  };

  return (
    <form onSubmit={formSubmitHandler} className="login-form">
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input ref={emailInput} type="email" />
      </label>
      <label>
        <span>Password:</span>
        <input ref={passwordInput} type="password" />
      </label>
      <button className="btn">Login</button>
    </form>
  );
};

export default Login;
