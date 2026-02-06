import { useEffect, useState } from 'react';

export function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsTablet(window.innerWidth < breakpoint);
    checkScreen();

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [breakpoint]);

  return isTablet;
}