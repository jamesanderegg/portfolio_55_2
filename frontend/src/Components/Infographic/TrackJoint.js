import React, { useRef } from 'react';
import { useRevoluteJoint, RigidBody } from '@react-three/rapier';

const TrackJoint = () => {
  const bodyA = useRef(null);
  const bodyB = useRef(null);

  useRevoluteJoint(bodyA, bodyB, [
    // Position of the joint in bodyA's local space
    [0, 0, 0],
    // Position of the joint in bodyB's local space
    [0, 2, 1],
    // Axis of the joint, expressed in the local-space of
    // the rigid-bodies it is attached to. Cannot be [0,0,0].
    [0, 3, 0]
  ]);

  return (
    <group>
      <RigidBody type="fixed"  ref={bodyA}>
        <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB}>
        <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default TrackJoint;
