const Footer = () => {
  return (
    <footer className="text-center whitespace-nowrap">
      <p className="italic py-1">
        This website is created for learning purposes.
      </p>
      <p className="py-3 text-sm text-gray-600">
        Copyright &copy; {new Date().getFullYear()}{' '}
        {`${process.env.REACT_APP_AUTHOR}`}
      </p>
    </footer>
  );
};

export default Footer;
