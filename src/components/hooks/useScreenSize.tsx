import * as React from 'react';

export interface ScreenSize {
  width: number | undefined;
  height: number | undefined;
}
const useScreenSize = () => {
// Initialize screen size object
  const [screenSize, setScreenSize] = React.useState<ScreenSize>({
    width: undefined,
    height: undefined,
  })
// Update screenWidth on widow resize
  React.useEffect(() => {
    const handleScreenChange = (): void => setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // Get initial screen size
    handleScreenChange();
    window.addEventListener('resize', handleScreenChange)
    return () => removeEventListener('resize', handleScreenChange)
  }, [])
  return screenSize;
}

export default useScreenSize;