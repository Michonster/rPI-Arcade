import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { TextureLoader, DoubleSide, Mesh } from 'three';

// Define props for the Cube component
interface CubeProps {
  src: string; // Path to the texture image
}

const Cube: React.FC<CubeProps> = ({ src }) => {
  // Reference for the plane mesh
  const planeRef = useRef<Mesh>(null);

  // Load the texture using TextureLoader
  const texture = new TextureLoader().load(src);

  // Rotate the plane continuously on each frame
  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.rotation.y += 0.01; // Rotate the plane around the Y-axis
    }
  });

  return (
    <Plane ref={planeRef} args={[3, 3]} position={[-3, 0, 0]}>
      <meshStandardMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        transparent={true}
      />
    </Plane>
  );
};

export default Cube;
