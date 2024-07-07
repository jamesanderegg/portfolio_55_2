import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { MeshStandardMaterial, BoxGeometry, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const BoxModel = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const boxRef = React.useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <RigidBody>
      <mesh ref={boxRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
};

export default BoxModel;
