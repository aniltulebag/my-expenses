import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

// custom hooks
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const MainNavigation = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className="navbar">
      <ul>
        <li className="title">myExpenses</li>
        {!user ? (
          <Fragment>
            <li>
              <NavLink activeClassName="test" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="test" to="/signup">
                Signup
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
