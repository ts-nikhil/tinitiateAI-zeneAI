import { useRouter } from 'next/router';
import styles from '../styles/NextPage.module.css';

export default function NextPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Next Page</h1>
      <p>Welcome to the next page!</p>
      <button onClick={() => router.push('/about')} className={styles.backButton}>Back to About Page</button>
    </div>
  );
}
