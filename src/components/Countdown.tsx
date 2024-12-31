import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isNewYear, setIsNewYear] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextYear = new Date(now.getFullYear() + 1, 0, 1);
      const difference = nextYear.getTime() - now.getTime();

      if (difference <= 0) {
        setIsNewYear(true);
        setTimeLeft('Feliz Ano Novo!');
        triggerConfetti();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const triggerConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>2025 🚀</h1>
      <div className="time">{timeLeft}</div>
      {isNewYear && <h2>🎉 Feliz Ano Novo! 🎉</h2>}
    </div>
  );
};

export default Countdown;
