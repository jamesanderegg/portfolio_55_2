import React from 'react';
import { useBox } from '@react-three/cannon';

const Plane = () => {
  const [ref] = useBox(() => ({ 
    mass: 0,
    position: [0, -1, 0], 
    args: [10, 0.1, 10],
  }));

  return (
    <mesh ref={ref} position={[0, -1, 0]} scale={[20, 0.2, 100]}>
      <boxGeometry />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
};

export default Plane;
