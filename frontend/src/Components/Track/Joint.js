import React, { useRef, useEffect } from 'react';
import { useRevoluteJoint, RigidBody, usePrismaticJoint, RapierRigidBody } from '@react-three/rapier';
import FrontModel from './FrontModel';
import BackModel from './BackModel';
import { Mesh } from "three";
const PrismaticExample = () => {
  const box1 = useRef<RapierRigidBody>(null);
  const box2 = useRef<RapierRigidBody>(null);
  const joint = usePrismaticJoint(box1, box2, [
    [-4, 0, 0],
    [0, 4, 0],
    [1, 0, 0],
    [-2, 2]
  ]);

  return (
    <group>
      <RigidBody ref={box1}>
        <Box />
      </RigidBody>
      <RigidBody ref={box2}>
        <Box />
      </RigidBody>
    </group>
  );
};

const Box = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />  // Width, height, depth of the box
      <meshBasicMaterial color={'orange'} /> // Simple color material
    </mesh>
  );
}

const Joint = () => {
  const frontModelRef = useRef(null);
  const backModelRef = useRef(null);

  useEffect(() => {
    console.log('Front Model Ref:', frontModelRef.current);
    console.log('Back Model Ref:', backModelRef.current);
  }, []);

  useRevoluteJoint(frontModelRef, backModelRef, [
    { x: -1, y: 5, z: 0 }, // Position of the joint in frontModel's local space
    { x: 0, y: 5, z: 0 }, // Position of the joint in backModel's local space
    { x: 0, y: 1, z: 0 }  // Axis of the joint
  ], {
    enableCollision: false // Disable collision between connected bodies
  });

  return (
    <group collisionsEnabled={false}>
      {/* <RigidBody ref={frontModelRef} type="fixed" collisionsEnabled={false}>
    
        <FrontModel position={[-.1, 15, 0]} scale={[1, 1, 1]} />
      </RigidBody>
      <RigidBody ref={backModelRef} type="fixed" collisionsEnabled={false}>
        
        <BackModel position={[1, 15, 0]} scale={[1, 1, 1]} />
      </RigidBody> */}
      <PrismaticExample />
    </group>
  );
};

export default Joint;
