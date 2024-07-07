import React, { useRef, useEffect } from 'react';
import { useRevoluteJoint } from '@react-three/rapier';
import GearModel from './GearModel';

const GearWithJoint = ({ position, scale }) => {
  const gearRef = useRef();

  useRevoluteJoint(gearRef, null, {
    worldAnchor1: [0, 0, 0],
    worldAnchor2: [0, 0, 0],
    axis: [0, 1, 0],
  });

  return <GearModel ref={gearRef} position={position} scale={scale} />;
};

export default GearWithJoint;
