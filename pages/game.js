import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css';
import log from '../lib/logger';
import { useRouter } from 'next/router';

export default function Game() {
    const [recognition, setRecognition] = useState(null);
      const [text, setText] = useState('');
      const [isRecognizing, setIsRecognizing] = useState(false);
      const router = useRouter();



  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setText(spokenText);
        speechSynthesis.speak(new SpeechSynthesisUtterance(`You said: ${spokenText}`));
      };

      speechRecognition.onerror = (event) => {
        alert('Speech recognition error: ' + event.error);
      };

      setRecognition(speechRecognition);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, []);

  
  const startSpeechRecognition = () => {
    if (recognition) {
        log.info('voice recognition start');
      recognition.start();

    }
  };


  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsRecognizing(false);
    }
  };

  const GetBack = ()=>{
    router.push('/dashboard')
  }

  const resetRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
   
    setIsRecognizing(false);
  };
  return (
    <div className={styles.container}>
      <h1>Speech to Text</h1>
      
      <button onClick={startSpeechRecognition} className={styles.speechButton}>Start Speech Recognition</button>
      <button onClick={stopSpeechRecognition} className={styles.speechButton} disabled={!isRecognizing}>Stop Speech Recognition</button>

      <p>{text}</p>
      <button onClick={resetRecognition} className={styles.speechButton}>
      Reset
      </button>
      <button onClick={GetBack} className="go_back">Go - Back</button>

    </div>
  );
}
