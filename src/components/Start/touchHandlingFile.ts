// touchHandlingFile.ts

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Prilagodite putanju prema stvarnom položaju vaših fajlova

export const useTouchHandling = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX > 100) {
      setIsStarted(true);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
    setTimeout(() => {
      navigate('/home');
    }, 550);
  };

  return { isStarted, handleTouchStart, handleTouchMove, handleTouchEnd };
};
