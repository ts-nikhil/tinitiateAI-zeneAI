// components/Header.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md fixed w-full top-0 z-10">
      <div className="flex items-center">
        <div className="md:hidden mr-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center mx-auto md:mx-0">
          <img src="/logo.png" alt="Logo" className="h-10 mr-3" />
          <h1 className="text-xl font-bold">LMS</h1>
        </div>
      </div>
      <nav className={`md:flex items-center space-x-4 hidden`}>
        <a className="text-white mx-2 hover:text-gray-400 cursor-pointer" onClick={() => navigateTo('/about')}>About Us</a>
        <a className="text-white mx-2 hover:text-gray-400 cursor-pointer" onClick={() => navigateTo('/contact')}>Contact Us</a>
        <a className="cursor-pointer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600" onClick={() => navigateTo('/login')}>Login</button>
        </a>
      </nav>
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-start p-4">
          <a className="py-2 w-full text-left hover:bg-gray-700" onClick={() => navigateTo('/about')}>About Us</a>
          <a className="py-2 w-full text-left hover:bg-gray-700" onClick={() => navigateTo('/contact')}>Contact Us</a>
          <a className="py-2 w-full text-left hover:bg-gray-700" onClick={() => navigateTo('/login')}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
