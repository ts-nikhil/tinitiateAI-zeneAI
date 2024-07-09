import { useEffect, useState,useRef  } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Game.module.css';


export default function DragNDrop() {
    const [text, setText] = useState('');
    const [draggedElement, setDraggedElement] = useState(null);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const dropzoneRef = useRef(null);
  const router = useRouter();


  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(data);
    const dropzone = e.target;

    if (dropzone === dropzoneRef.current) {
        dropzone.appendChild(draggableElement);
        draggableElement.style.position = 'static';
      } else {
        resetDraggableElement();
      }
    };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDraggedElement(e.target);
    setTouchPosition({
      x: touch.clientX - e.target.getBoundingClientRect().left,
      y: touch.clientY - e.target.getBoundingClientRect().top,
    });
  };

  const handleTouchMove = (e) => {
    if (!draggedElement) return;

    const touch = e.touches[0];
    const newX = touch.clientX - touchPosition.x;
    const newY = touch.clientY - touchPosition.y;

    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${newX}px`;
    draggedElement.style.top = `${newY}px`;
  };

  const handleTouchEnd = (e) => {
    const dropzone = dropzoneRef.current;
    const draggableElement = e.target;

    const touch = e.changedTouches[0];
    const dropzoneRect = dropzone.getBoundingClientRect();
    const isInsideDropzone = (
      touch.clientX >= dropzoneRect.left &&
      touch.clientX <= dropzoneRect.right &&
      touch.clientY >= dropzoneRect.top &&
      touch.clientY <= dropzoneRect.bottom
    );

    if (isInsideDropzone) {
      dropzone.appendChild(draggableElement);
      draggableElement.style.position = 'static';
    } else {
      resetDraggableElement();
    }

    setDraggedElement(null);
  };

 

  const resetDraggableElement = () => {
    const draggable = document.getElementById('draggable');
    const initialContainer = document.getElementById('initialContainer');
    initialContainer.appendChild(draggable);
    draggable.style.position = 'static';
  };

  const GetBack = ()=>{
    router.push('/dashboard')
  }

      return (
        <div className={styles.container}>
       <div className={styles.initialContainer} id="initialContainer">
        <div
          className={styles.draggable}
          id="draggable"
          draggable="true"
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          Drag me
        </div>
      </div>
      <div className={styles.dropzone} ref={dropzoneRef} onDrop={handleDrop} onDragOver={handleDragOver}>
        Drop here
      </div>
      <button onClick={resetDraggableElement} className={styles.resetButton}>Reset</button>
      <button onClick={GetBack} className="go_back">Go - Back</button>
      </div>
      );


}