import React from 'react';
import { extend } from '@react-three/fiber';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';

// Extend Three.js objects
extend({ BoxGeometry, MeshStandardMaterial });

const Box = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], color="#8B4513" }) => {
  return (
    <RigidBody type="fixed" position={position}>
      <mesh position={position} scale={scale} rotation={rotation} receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
      </mesh>
    </RigidBody>
  );
};

export default Box;
