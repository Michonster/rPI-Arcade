import React, { useEffect, useRef } from 'react';

interface RotatingImageProps {
  src: string; // Path to the image
  size?: number; // Size of the image in pixels (optional)
}

const RotatingImage: React.FC<RotatingImageProps> = ({ src }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let angle = 0;

    const rotateImage = () => {
      if (imageRef.current) {
        angle += 0.9; // Adjust the speed of rotation
        imageRef.current.style.transform = `rotateY(${angle}deg)`;
      }
      animationFrameId = requestAnimationFrame(rotateImage);
    };

    rotateImage();

    return () => {
      cancelAnimationFrame(animationFrameId); // Clean up the animation frame
    };
  }, []);

  return (
    <div
      ref={imageRef}
      style={{
        width: `500px`,
        height: `360px`,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s linear',
        // display: 'grid',
        // left: '100px', 
      }}
    />
  );
};

export default RotatingImage;