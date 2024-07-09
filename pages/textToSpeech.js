import { useEffect, useState, useRef } from 'react';
import styles from '../styles/TextToSpeech.module.css';
import { useRouter } from 'next/router';

export default function TextToSpeech() {
  const [textToRead] = useState("This is the phrase to read. Try to match it exactly.");
  const [highlightedText, setHighlightedText] = useState("");
  const [remainingText, setRemainingText] = useState(textToRead);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const router = useRouter()
  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      const speechUtterance = new SpeechSynthesisUtterance(textToRead);
      speechUtterance.lang = 'en-US';
      speechUtterance.rate = 1;

      speechUtterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const spokenText = textToRead.slice(0, charIndex);
          const remaining = textToRead.slice(charIndex);
          setHighlightedText(spokenText);
          setRemainingText(remaining);
        }
      };

      speechUtterance.onend = () => {
        setIsSpeaking(false);
      };

      setUtterance(speechUtterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  }, [textToRead]);

  const startTextToSpeech = () => {
    if (utterance) {
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopTextToSpeech = () => {
    if (utterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const resetTextToSpeech = () => {
    stopTextToSpeech();
    setHighlightedText("");
    setRemainingText(textToRead);
  };
  const GetBack = ()=>{
    router.push('/dashboard')
  }
  return (
    <div className={styles.container}>
      <h1>Text to Speech Recognition</h1>
      <div className={styles.phraseContainer}>
        <span className={styles.highlightedText}>{highlightedText}</span>
        <span className={styles.remainingText}>{remainingText}</span>
      </div>
      <button onClick={startTextToSpeech} className={styles.speechButton} disabled={isSpeaking}>
        Start Text-to-Speech
      </button>
      <button onClick={stopTextToSpeech} className={styles.speechButton} disabled={!isSpeaking}>
        Stop Text-to-Speech
      </button>
      <button onClick={resetTextToSpeech} className={styles.resetButton}>
        Reset
      </button>
      <button onClick={GetBack} className="go_back">Go - Back</button>

    </div>
  );
}
