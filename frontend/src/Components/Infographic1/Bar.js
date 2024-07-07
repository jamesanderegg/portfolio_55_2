import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';

// Extend Three.js objects
extend({ BoxGeometry, MeshStandardMaterial });

const Bar = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], color = "red", targetHeight }) => {
  const barRef = useRef();

  useFrame((state, delta) => {
    if (barRef.current) {
      const currentHeight = barRef.current.scale.y;
      const newHeight = currentHeight + (targetHeight - currentHeight) * delta * 2; // Smooth transition
      barRef.current.scale.y = newHeight;
      barRef.current.position.y = newHeight / 2; // Adjust position to keep bottom at the same level
    }
  });

  return (
    <RigidBody type="fixed" position={position}>
      <mesh ref={barRef} position={[position[0], scale[1] / 2, position[2]]} scale={[scale[0], scale[1], scale[2]]} rotation={rotation} receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
      </mesh>
    </RigidBody>
  );
};

export default Bar;
