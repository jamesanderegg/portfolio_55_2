import React, { useRef, useEffect, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const GearModel = forwardRef(({ position = [0, 0, 0], scale = [1, 1, 1], velocity = 0, rotation = [0, 0, 0], collisionGroups }, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/gear.glb');
  const internalRef = useRef();

  useEffect(() => {
    if (!gltf) return;
    console.log('GLTF loaded:', gltf);

    // Apply metal material to all meshes
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'silver',
          metalness: 0.9,
          roughness: 0.1,
        });
      }
    });
  }, [gltf]);

  useFrame(() => {
    if (internalRef.current) {
      const body = internalRef.current;
      body.setAngvel({ x: 0, y: 0, z: velocity });
    }
  });

  if (!gltf) return null;

  return (
    <RigidBody
      colliders="hull"
      position={position}
      scale={scale}
      restitution={0} // Reduce bouncing
      friction={1}
      linearDamping={0.9}
      angularDamping={0.5}
      lockTranslations={true} // Lock the gear in place
      lockRotations={[true, true, false]} // Allow rotation around z-axis only
      collisionGroups={collisionGroups} // Set collision group
      ref={internalRef}
    >
      <primitive
        object={gltf.scene.clone()}
        rotation={rotation} // Set initial rotation
      />
    </RigidBody>
  );
});

export default GearModel;
