import React, { useEffect, forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import Text3D from './Text3D';

const Screen = forwardRef(({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/screen.glb');
  const texture = useLoader(THREE.TextureLoader, '/images/powerbi.png');
  const tableauLogo = useLoader(THREE.TextureLoader, '/images/Tableau-Logo.png');
  const matplotlibLogo = useLoader(THREE.TextureLoader, '/images/matplotlib.png');
  const looker = useLoader(THREE.TextureLoader, '/images/looker.png');
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
      colliders="hull"
      position={position}
      scale={scale}
      rotation={rotation}
      restitution={0}
      friction={1}
      linearDamping={0.9}
      angularDamping={0.5}
      lockTranslations={true}
    >
      <primitive object={gltf.scene.clone()} />
      <mesh position={[-18, 5, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
      <mesh position={[-18, -7, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={tableauLogo} transparent />
      </mesh>
      <mesh position={[15, 5, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={matplotlibLogo} transparent />
      </mesh>
      <mesh position={[15, -7, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={looker} transparent />
      </mesh>
      <Text3D text="DASHBOARDS" position={[0, 15, 0.01]} rotation={[0, 0, 0]} size={4} color={"#123626"} />
    </RigidBody>
  );
});

export default Screen;
