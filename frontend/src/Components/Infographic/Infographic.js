import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Camera from './Camera';
import Lights from './Lights';
import Plane from './Plane';
import SmallTracks from './SmallTracks';
import './Infographic.css';
import TrackJoint from './TrackJoint';


const Infographic = ({ cameraPosition = [0, 100, 60], cameraLookAt = [0, 0, 0] }) => {
  const trackPositions = [
  
    [0, 30, 0],
    // Add more positions as needed
  ];

  const trackScale = [1, 1, 1];

  return (
    <div className="infographic">
      <Canvas 
        camera={{ position: [0, 50, 30], fov: 90 }} 
        shadows 
        fog={{ color: 'grey', near: 10, far: 50 }}
      >
        <color attach="background" args={["#06040d"]} />
        <Camera position={cameraPosition} lookAt={cameraLookAt} />
        <Lights />
        <Physics>
          {/* <Plane position={[0, -0.9, 0]} size={[400, 400]} />
          {trackPositions.map((pos, index) => (
            <SmallTracks key={index} position={pos} scale={trackScale} />
          ))} */}
          {/* <TrackJoint /> */}
        </Physics>
      </Canvas>
    </div>
  );
}

export default Infographic;
