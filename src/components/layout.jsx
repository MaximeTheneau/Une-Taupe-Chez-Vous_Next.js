import PropTypes from 'prop-types';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
