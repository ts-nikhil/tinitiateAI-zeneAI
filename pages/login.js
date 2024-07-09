// pages/login.js
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import log from '../lib/logger';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    log.info('Login attempt', { email });
debugger
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      debugger
      const data = await res.json();

      log.info('Login successful', { email });
      sessionStorage.setItem('user', JSON.stringify(email));
      sessionStorage.setItem('role', JSON.stringify(data.role));

      router.push('/dashboard');
    } else {
      const data = await res.json();
      log.error('Login failed', { email });
      setError(data.message);
    }
  };

  const handleBackToHome = () => {
    log.info('Navigating back to home');
    router.push('/');
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="max-w-lg w-full bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter username" 
                onChange={(e) => setEmail(e.target.value)}
                required autoComplete='off'
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter password" 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
