import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Screen from './Screen';
import Text3D from './Text3D';

const FullStack = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], textPosition = [0, 15, 0.01], textRotation = [0, 0, 0], textSize = 4, textColor = "#123626" }) => {


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


      <Text3D text="• Python / FLASK" position={[-15, 8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• NODE / React" position={[-16, 4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• C# / VB.NET" position={[-17, 0, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• HTML/ CSS" position={[-18, -4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• Javascript / D3" position={[-15, -8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />

      <Text3D text="• T-SQL SSMS" position={[14, 8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• DYNAMO DB" position={[14, 4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• Mongo DB" position={[12, 0, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• SANITY CMS" position={[14, -4, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
      <Text3D text="• SQL ORM" position={[11.5, -8, 0]} rotation={[0, 0, 0]} size={2.5} color={textColor} />
     
      <Text3D text="Full Stack Development" position={textPosition} rotation={textRotation} size={textSize} color={textColor} />



    </RigidBody>
  );
};

export default FullStack;
