import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import Plane from './Plane'
import { Physics } from '@react-three/rapier';



const Camera = () => {
  return <perspectiveCamera position={[0, 0, 10]} />;
};

const Scene = () => {
  return (
    <Canvas style={{ background: 'skyblue' }} camera={{ position: [0, 0, 15], fov: 90 }}>
  <pointLight position={[10, 10, 10]} />
  <Physics>
  
   
    <Plane />
  </Physics>
</Canvas>
  );
};

export default Scene;