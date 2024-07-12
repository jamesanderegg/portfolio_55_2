import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Screen from './Screen';
import Text3D from './Text3D';

const DataWrangling = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], textPosition = [0, 15, 0.01], textRotation = [0, 0, 0], textSize = 4, textColor = "#123626" }) => {


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


      <Text3D text="• Application Programming Interface" position={[0, 8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• Pandas / Numpy / Excel" position={[-8, 4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• Beautiful Soup" position={[-16, 0, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• Automation / Selenium" position={[-9.5, -4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• SQL / noSQL" position={[-17, -8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
     
      <Text3D text="Data Wrangling" position={textPosition} rotation={textRotation} size={textSize} color={textColor} />



    </RigidBody>
  );
};

export default DataWrangling;
