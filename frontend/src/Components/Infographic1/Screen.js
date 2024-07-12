import React, { useEffect, forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Screen = forwardRef(({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], children }, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/screen.glb');
  
  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 'grey',
            metalness: 0.1,
            roughness: 0.9,
          });
        }
      });
    }
  }, [gltf]);

  if (!gltf) return null;

  return (
    <RigidBody
      type="fixed" 
      colliders="hull"
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <primitive object={gltf.scene.clone()} />
      {children}
    </RigidBody>
  );
});

export default Screen;
