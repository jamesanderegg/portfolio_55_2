import React, { forwardRef } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

const SimpleBox = forwardRef(({ position = [0, 0, 0], scale = [1, 1, 1] }, ref) => {
  return (
    <RigidBody position={position} scale={scale}>
      <CuboidCollider args={[0.5, 0.5, 0.5]} />
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
});

export default SimpleBox;
