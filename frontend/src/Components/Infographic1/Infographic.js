import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Camera from './Camera';
import Lights from './Lights';
import Plane from './Plane';
import GearModel from './GearModel';
import GearModelHat from '../Infographic/GearModelHat';
import Text3D from './Text3D';
import Box from './Box';
import BarChart from './BarChart';
import Screen from './Screen';
import Picture from './Picture';
import './Infographic.css';

const Infographic = ({ cameraPosition = [0, 0, 140], cameraLookAt = [0, 0, 0] }) => {
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  // Define collision groups
  const GEAR1_GROUP = 1;
  const GEAR2_GROUP = 2;
  const GEAR3_GROUP = 3;
  const NONE_GROUP = 0;

  const initialBarChartData = [
    { value: 5, color: '#FF0000' }, // Red
    { value: 6, color: '#FF7F00' }, // Orange
    { value: 6, color: '#FFFF00' }, // Yellow
    { value: 7, color: '#00FF00' }, // Green
    { value: 6, color: '#0000FF' }, // Blue
    { value: 2, color: '#4B0082' }, // Indigo
    { value: 4, color: '#8B00FF' }, // Violet
    { value: 7, color: '#FF00FF' }, // Magenta
    { value: 3, color: '#FF69B4' }, // Pink
    { value: 6, color: '#FF0000' },
    { value: 8, color: '#FF7F00' }, // Purple
    { value: 5, color: '#FFFF00' },  // Cyan
    { value: 7, color: '#00FF00' }, // Green
    { value: 6, color: '#0000FF' }, // Blue
    { value: 2, color: '#4B0082' }, // Indigo
    { value: 4, color: '#8B00FF' }, // Violet
    { value: 4, color: 'purple' }
  ];

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
          <Plane position={[0, -50, 0]} size={[500, 300]} />
          <Text3D text="TOOLS & SKILLS" position={[0, 55, 0]} rotation={[0, 0, 0]} size={6.5} color="#b0b3b8" />
          <Box position={[0, 18, 0]} scale={[50, 0.7, 12]} rotation={[0, 0, 0]} />

          <GearModel ref={gear1Ref} position={[-15, 1, 2]} scale={[.5, .5, .5]} velocity={0} rotation={[Math.PI / 2, 0, 0]} collisionGroups={[GEAR1_GROUP, NONE_GROUP]} />
          <GearModel ref={gear2Ref} position={[15, 1, 2]} scale={[.5, .5, .5]} velocity={0} rotation={[Math.PI / 2, 0.175, 0]} collisionGroups={[GEAR2_GROUP, NONE_GROUP]} />
          <GearModelHat ref={gear3Ref} position={[6, -27, 2]} scale={[.5, .5, .5]} velocity={0} rotation={[Math.PI / 2, 0, 0]} collisionGroups={[GEAR3_GROUP, NONE_GROUP]} />
          <GearModelHat ref={gear3Ref} position={[22, 37, 5]} scale={[0.25, 0.25, 0.25]} velocity={0} rotation={[Math.PI / 2, 0, 0]} collisionGroups={[GEAR3_GROUP, NONE_GROUP]} />
          <Picture
            position={[-32, 38, 0.01]}
            size={[18, 18]}
            rotation={[0, 0, 0]}
            filePath="/images/matplotlibLogo.png"
          />
          <Picture
            position={[28, 42, 0.01]}
            size={[12, 12]}
            rotation={[0, 0, 0]}
            filePath="/images/python.png"
          />
          <Picture
            position={[24, 20, 0.01]}
            size={[10, 10]}
            rotation={[0, 0, 0]}
            filePath="/images/javaScript-logo.png"
          />
          <BarChart initialData={initialBarChartData} />

          <Screen position={[-15, 20, 5]} scale={[.5, .5, .5]} velocity={0} rotation={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Infographic;
