import React, { useRef } from 'react';
import FrontModel from './FrontModel';
import BackModel from './BackModel';
import HingePin from './HingePin';
import { RigidBody, useRevoluteJoint } from '@react-three/rapier';
const HingeJoint = ({ body, hinge, bodyAnchor, hingeAnchor, rotationAxis }) => {
  useRevoluteJoint(body, hinge, [bodyAnchor, hingeAnchor, rotationAxis]);
  return null;
};

const SmallTracks = ({ position, scale }) => {
  const frontRef = useRef();
  const backRef = useRef();

  // Define collision groups
  const collisionGroups = {
    front: { mask: 0b0001, group: 0b0010 },
    back: { mask: 0b0010, group: 0b0100 }
  };

  return (
    <>
      <RigidBody type="fixed" ref={frontRef} position={position} collisionGroups={collisionGroups.front}>
        <FrontModel position={[0, 0, 0]} scale={scale} collisionGroups={collisionGroups.front} />
      </RigidBody>
      <RigidBody >
        <HingeJoint position={[0, 0, 0]} scale={scale}/>
      </RigidBody>
      <RigidBody ref={backRef} position={[position[0], position[1], position[2]]} collisionGroups={collisionGroups.back}>
        <BackModel position={[0, 0, 0]} scale={scale} collisionGroups={collisionGroups.back} />
      </RigidBody>
      <HingeJoint
        body={frontRef}
        hinge={backRef}
        bodyAnchor={[0, 0, 0]}
        hingeAnchor={[0, 0, 0]}
        rotationAxis={[1, 0, 0]} // Rotate around the y-axis
      />
    </>
  );
};

export default SmallTracks;
