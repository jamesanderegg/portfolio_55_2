import React, { useEffect } from 'react';
import { useRapier } from '@react-three/rapier';

const Joints = ({ gearRefs }) => {
  const { world, rapier } = useRapier();

  useEffect(() => {
    if (world) {
      gearRefs.current.forEach((gear, index) => {
        const body = gear?.api;
        if (body) {
          const jointParams = rapier.JointData.revolute(
            { x: 5, y: 10, z: 0 }, // position of the joint relative to the first body (gear)
            { x: 0, y: 1, z: 0 }  // axis of rotation
          );
          const planeBodyHandle = world.bodies[0].handle; // assuming the plane is the first body
          world.createJoint(jointParams, body.handle, planeBodyHandle);
        }
      });
    }
  }, [world, gearRefs, rapier]);

  return null;
};

export default Joints;
