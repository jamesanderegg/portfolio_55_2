import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Picture = ({ position = [0, 0, 0], size = [1, 1], rotation = [0, 0, 0], filePath }) => {
  const texture = useLoader(THREE.TextureLoader, filePath);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default Picture;
