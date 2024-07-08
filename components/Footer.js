const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} LMS. All rights reserved.</p>
        <div className="mt-4">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
