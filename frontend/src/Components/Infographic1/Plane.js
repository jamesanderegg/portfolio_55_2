import React from 'react';
import { extend } from '@react-three/fiber';
import { PlaneGeometry, MeshStandardMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';

// Extend Three.js objects
extend({ PlaneGeometry, MeshStandardMaterial });

const Plane = ({ position = [0, 0, 0], size = [100, 100], rotation=[0,0,0] }) => {
  return (
    <RigidBody type="fixed" position={position}>
      <mesh receiveShadow rotation={rotation}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#67a9cf" />
      </mesh>
    </RigidBody>
  );
};

export default Plane;
