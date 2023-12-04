// useImageWidth.js
import React, { useState, useEffect } from 'react';

export default function useImageWidth() {
  const [imageWidth, setImageWidth] = useState<any>();
  const [showMobile, setShowMobile] = useState<boolean>(false);

  React.useEffect(() => {
        setImageWidth(window.innerWidth);
      }, []);
  useEffect(() => {
    const handleResize = () => setImageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    if (imageWidth < 768) {
      setShowMobile(true);
    } else {
      setShowMobile(false);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageWidth]);

  return {showMobile, imageWidth};
}
