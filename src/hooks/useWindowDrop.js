import { useEffect, useState } from 'react';

export function useWindowDrop(onFile) {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const over = (event) => {
      event.preventDefault();
      setDragging(true);
    };
    const leave = (event) => {
      if (!event.relatedTarget) setDragging(false);
    };
    const drop = (event) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) onFile(file);
    };
    window.addEventListener('dragover', over);
    window.addEventListener('dragleave', leave);
    window.addEventListener('drop', drop);
    return () => {
      window.removeEventListener('dragover', over);
      window.removeEventListener('dragleave', leave);
      window.removeEventListener('drop', drop);
    };
  }, [onFile]);

  return dragging;
}
