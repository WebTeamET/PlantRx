import { useEffect, useState } from 'react';

export function useIsMediaQuery(breakpoint = 1024) {
  const [isMedia, setIsMedia] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMedia(window.innerWidth < breakpoint);
    checkScreen();

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [breakpoint]);

  return isMedia;
}