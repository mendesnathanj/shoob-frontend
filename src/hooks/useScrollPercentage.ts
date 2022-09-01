import { useEffect, useState } from 'react';

function getPercentage() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercentRounded = Math.round(scrollPercent * 100);

  return scrollPercentRounded;
}

export default function useScrollPercentage() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(getPercentage());

    const listener = () => {
      const percent = getPercentage();

      setPercentage(percent);
    };

    document.addEventListener('scroll', listener);

    return () => document.removeEventListener('scroll', listener);
  }, []);

  return percentage;
}
