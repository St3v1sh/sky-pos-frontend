'use client';

import { useEffect, useState } from 'react';

interface DigitalClockProps {
  className?: string;
}

export default function DigitalClock({ className }: DigitalClockProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div>
      <p className={className}>
        {date.toLocaleTimeString([], {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </p>
    </div>
  );
}
