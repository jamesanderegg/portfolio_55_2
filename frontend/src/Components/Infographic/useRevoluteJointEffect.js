import { useRevoluteJoint } from '@react-three/rapier';
import { useEffect, useRef } from 'react';

const useRevoluteJointEffect = (bodyA, bodyB, config) => {
  const jointRef = useRevoluteJoint(bodyA, bodyB, config);

  useEffect(() => {
    if (jointRef.current) {
      // Optionally add more logic here if needed
    }
  }, [jointRef]);

  return jointRef;
};

export default useRevoluteJointEffect;
