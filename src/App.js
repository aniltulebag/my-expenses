import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// custom hooks
import useAuthContext from './hooks/useAuthContext.js';

// components
import Layout from './components/Layout.js';
import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';

// spinner
import { Oval } from 'react-loader-spinner';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady ? (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                exact
                path="/"
                children={!user ? <Redirect to="/login" /> : <Home />}
              />
              <Route
                path="/login"
                children={!user ? <Login /> : <Redirect to="/" />}
              />
              <Route
                path="/signup"
                children={!user ? <Signup /> : <Redirect to="/" />}
              />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      ) : (
        <Oval wrapperClass="spinner" />
      )}
    </div>
  );
}

export default App;
