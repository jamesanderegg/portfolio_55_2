import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';

const Sphere = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const props = useSpring({
    scale: hovered ? [1.6, 1.6, 1.6] : [2.5, 2.5, .5],
    color: hovered ? 'orange' : 'green',
  });

  useFrame(() => {
    meshRef.current.scale.set(...props.scale.get());
  });

  return (
    <a.mesh
      position={position}
      ref={meshRef}
      scale={[0.5, 0.5, 0.5]}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <a.meshStandardMaterial color={props.color} />
    </a.mesh>
  );
};

export default Sphere;
