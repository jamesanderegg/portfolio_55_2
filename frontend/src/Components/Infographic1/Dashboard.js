import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Screen from './Screen';
import Text3D from './Text3D';

const Dashboard = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], textPosition = [0, 15, 0.01], textRotation = [0, 0, 0], textSize = 4, textColor = "#123626" }) => {
  const texture = useLoader(THREE.TextureLoader, '/images/powerbi.png');
  const tableauLogo = useLoader(THREE.TextureLoader, '/images/Tableau-Logo.png');
  const matplotlibLogo = useLoader(THREE.TextureLoader, '/images/matplotlib.png');
  const looker = useLoader(THREE.TextureLoader, '/images/looker.png');

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
      lockRotations={true}  // Add this line to lock rotations
    >
      <Screen position={[0, 0, 0]} scale={[1, 1, 1]} rotation={[0, 0, 0]} />
      <mesh position={[-20, 5, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
      <mesh position={[-20, -7, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={tableauLogo} transparent />
      </mesh>
      <mesh position={[14, 5, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={matplotlibLogo} transparent />
      </mesh>
      <mesh position={[14, -7, 0.01]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial map={looker} transparent />
      </mesh>
      <Text3D text="DASHBOARDS" position={textPosition} rotation={textRotation} size={textSize} color={textColor} />
    </RigidBody>
  );
};

export default Dashboard;
