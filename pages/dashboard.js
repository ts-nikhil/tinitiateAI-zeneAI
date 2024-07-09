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

  const handleTileClick = (path) => {
    router.push(path);
  };


  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <h1>Dashboard</h1>
        <p>Welcome, {user}. You are logged in as {role}.</p>  
        <div className={styles.tilesContainer}>
          <div className={styles.tile} onClick={() => handleTileClick('/DragNDrop')}>
            <h2>Drag and Drop Game</h2>
            
          </div>
          <div className={styles.tile} onClick={() => handleTileClick('/game')}>
            <h2>Speech to Text</h2>
           
          </div>
          <div className={styles.tile} onClick={() => handleTileClick('/textToSpeech')}>
            <h2>Text to Speech</h2>
          
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
