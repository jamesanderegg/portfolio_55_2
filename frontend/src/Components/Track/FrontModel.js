import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const FrontModel = ({ position, scale }) => {
  const gltf = useLoader(GLTFLoader, '/models/smalltracks_front1.glb');
  return (
    <RigidBody type="dynamic">
      <primitive object={gltf.scene} position={position} scale={scale} />
    </RigidBody>
  );
};

export default FrontModel;
