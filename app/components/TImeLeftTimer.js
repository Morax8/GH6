'use client';
import { useEffect } from 'react';

export default function TimerForGuessingGame({ timeLeft, setTimeLeft, onComplete = () => {}, className = '' }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, onComplete]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <span className={`text-5xl text-black font-bold ${className}`}>
      {formatTime(timeLeft)}
    </span>
  );
}