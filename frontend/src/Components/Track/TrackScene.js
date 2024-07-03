import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, } from '@react-three/rapier';
import Lights from './Lights';
import Plane from './Plane';
import Camera from './Camera';
import FrontModel from './FrontModel';
import BackModel from './BackModel';
import HingePin from './HingePin';
import Joint from './Joint';
import * as Three from 'three';
import './Track.css';

const TrackScene = ({ cameraPosition = [0, 70, 60], cameraLookAt = [0, 0, 0] }) => {
  return (
    <div className="trackscene">
      <Canvas 
        camera={{ position: [0, 20, 30], fov: 90 }} 
        shadows 
        fog={{ color: 'grey', near: 10, far: 50 }}
      >
        <color attach="background" args={["#06040d"]} />
        <Camera position={cameraPosition} lookAt={cameraLookAt} />
        <Lights />
        <Physics gravity={[0, -9.81, 0]} solverIterations={20}>
          <Plane position={[0, -1, 0]} size={[200, 200]} />
          <Joint />
          {/* <FrontModel position={[0, 2, 0]} scale={[1, 1, 1]} />
          <BackModel position={[0, 1, 0]} scale={[1, 1, 1]} />
          <HingePin position={[0, 2, 0]} scale={[1, 1, 1]} /> */}
        </Physics>
      </Canvas>
    </div>
  );
}

export default TrackScene;
