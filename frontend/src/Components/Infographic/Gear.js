import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ExtrudeGeometry } from 'three';

const Gear = ({ outerRadius, innerRadius, numTeeth, toothDepth, depth, position, color }) => {
    const meshRef = useRef();
  
    useEffect(() => {
      const shape = new THREE.Shape();
  
      // Define the shape of the gear
      for (let i = 0; i < numTeeth; i++) {
        const angle = (i / numTeeth) * Math.PI * 2;
        const nextAngle = ((i + 1) / numTeeth) * Math.PI * 2;
  
        shape.lineTo(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius
        );
  
        shape.lineTo(
          Math.cos(angle + (nextAngle - angle) / 2) * (outerRadius + toothDepth),
          Math.sin(angle + (nextAngle - angle) / 2) * (outerRadius + toothDepth)
        );
      }
      shape.closePath();
  
      // Define the hole in the center
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);
  
      const extrudeSettings = {
        steps: 2,
        depth: depth,
        bevelEnabled: false,
      };
  
      const geometry = new ExtrudeGeometry(shape, extrudeSettings);
      meshRef.current.geometry = geometry;
    }, [outerRadius, innerRadius, numTeeth, toothDepth, depth]);
  
    return (
      <mesh ref={meshRef} position={position}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };

export default Gear;
