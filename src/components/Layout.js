import { Fragment } from 'react';

// components
import MainNavigation from './MainNavigation';
import Footer from './Footer';

// notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <header>
        <MainNavigation />
      </header>
      <main className="container mx-auto mb-20">{children}</main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default Layout;
