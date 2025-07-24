'use client';
import { useEffect, useState } from 'react';

export default function TimerAngel({ duration = 10, onComplete = () => {}, className = '' }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onComplete]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <span className={`text-5xl text-black font-bold ${className}`}>
    {formatTime(secondsLeft)}
    </span>
  );
}