import React from 'react';
import { extend } from '@react-three/fiber';
import { PlaneGeometry, MeshStandardMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';

// Extend Three.js objects
extend({ PlaneGeometry, MeshStandardMaterial });

const Plane = ({ position = [0, 0, 0], size = [70, 100] }) => {
  return (
    <RigidBody type="fixed" position={position}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#2e2e2e" />
      </mesh>
    </RigidBody>
  );
};

export default Plane;
