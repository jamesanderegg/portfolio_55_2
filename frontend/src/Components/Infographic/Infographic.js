import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Camera from './Camera';
import Lights from './Lights';
import Plane from './Plane';
import GearModel from './GearModel';
import './Infographic.css';
import Joints from './Joints';

const Infographic = ({ cameraPosition = [0, 100, 60], cameraLookAt = [0, 0, 0] }) => {
  const gearRefs = useRef([]);

  const gearPositions = [
    [8, 0, 10.698],
    [0, 10, -20],
    // Add more positions as needed
  ];

  const gearScale = [1, 1, 1];

  return (
    <div className="infographic">
      <Canvas 
        camera={{ position: [0, 40, 0], fov: 50 }} 
        shadows 
        fog={{ color: 'grey', near: 10, far: 50 }}
      >
        <color attach="background" args={["#06040d"]} />
        <Camera position={cameraPosition} lookAt={cameraLookAt} />
        <Lights />
        <Physics>
          <Plane />
          {gearPositions.map((pos, index) => (
            <GearModel 
              key={`gear-${index}`} 
              position={pos} 
              scale={gearScale} 
              ref={el => gearRefs.current[index] = el} 
            />
          ))}
          {/* <Joints gearRefs={gearRefs} /> */}
        </Physics>
      </Canvas>
    </div>
  );
}

export default Infographic;
