import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import Sphere from '../Sphere/Sphere';
import Plane from './Plane'
import { Physics } from '@react-three/cannon';

const Box = ({ position }) => {
  const [hovered, setHovered] = React.useState(false);
  const props = useSpring({
    scale: hovered ? [3, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? 'green' : 'blue',
  });

  return (
    <a.mesh
      position={position}
      scale={props.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <a.meshStandardMaterial color={props.color} />
    </a.mesh>
  );
};




const Floor = () => {
  const props = useSpring({
    position: [0, -1, 0],
    scale: [10, 0.1, 10],
    color: 'brown',
  });

  const halfWidth = props.scale[0] / 2;
  const halfDepth = props.scale[2] / 2;

  const boxPositions = [
    [-halfWidth, 0, -halfDepth],
    [-halfWidth, 0, halfDepth],
    [halfWidth, 0, -halfDepth],
    [halfWidth, 0, halfDepth],
  ];

  return (
    <>
      <a.mesh position={props.position} scale={props.scale}>
        <boxGeometry />
        <a.meshStandardMaterial color={props.color} />
      </a.mesh>
      {boxPositions.map((pos, index) => (
        <Box key={index} position={pos} />
      ))}
    </>
  );
};

const Camera = () => {
  return <perspectiveCamera position={[0, 0, 10]} />;
};

const Scene = () => {
  return (
    <Canvas style={{ background: 'skyblue' }} camera={{ position: [0, 0, 15], fov: 90 }}>
  <pointLight position={[10, 10, 10]} />
  <Physics>
    <Floor />
    <Box position={[-4.5, -.45, -4.5]} />
    <Box position={[4.5, -.45, -4.5]} />
    <Box position={[-4.5, -.45, 4.5]} />
    <Box position={[4.5, -.45, 4.5]} />
    <Box position={[0, -.45, 0]} />
    <Sphere position={[0, 3, 0]} />
    <Plane />
  </Physics>
</Canvas>
  );
};

export default Scene;