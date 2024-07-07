import React, { useRef, useEffect, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody, useRapier } from '@react-three/rapier';

const GearModel = forwardRef(({ position = [0, 0, 0], scale = [1, 1, 1] }, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/gear.glb');
  const internalRef = useRef();
  const { rapier, world } = useRapier();

  useEffect(() => {
    if (!gltf) return;
    console.log('GLTF loaded:', gltf);
  }, [gltf]);

  useFrame(() => {
    if (internalRef.current) {
      const body = world.getRigidBody(internalRef.current.handle);
      const rotation = body.rotation();
      body.setRotation({ x: rotation.x, y: rotation.y, z: rotation.z + .9 });
    }
  });

  if (!gltf) return null;

  return (
    <RigidBody
      colliders="hull"
      position={position}
      scale={scale}
      restitution={0}
      friction={1}
      linearDamping={0.9}
      angularDamping={0.5}
      ref={internalRef}
    >
      <primitive object={gltf.scene.clone()} />
    </RigidBody>
  );
});

export default GearModel;
