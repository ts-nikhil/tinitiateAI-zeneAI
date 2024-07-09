import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import log from '../lib/logger';


export default function dashboard() {
    
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedRole = sessionStorage.getItem('role');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setRole(JSON.parse(storedRole));
    } else {
      router.push('/login');
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <h1>Dashboard</h1>
        <p>Welcome, {user}. You are logged in as {role}.</p>
      </main>
      <Footer />
    </div>
  );
}
