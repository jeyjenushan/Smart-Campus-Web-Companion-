import { useEffect, useState } from 'react';

/**
 * True for phones/tablets where we want to defer to the native camera app
 * instead of a live getUserMedia video stream.
 *
 * Uses a coarse pointer (touch-primary) + viewport width check rather than
 * user-agent sniffing, since UA strings are unreliable/spoofable and this
 * still correctly excludes touch-enabled desktops/laptops.
 */
export function useIsMobileDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 1024px)').matches;
    setIsMobile(coarsePointer && narrowViewport);
  }, []);

  return isMobile;
}