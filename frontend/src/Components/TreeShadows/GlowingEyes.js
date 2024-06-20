import React, {useEffect, useRef} from "react";
import * as THREE from 'three'; // Import THREE
import { useThree } from "@react-three/fiber";

const Eye = ({ position }) => {
  const meshRef = useRef();

  const { size, scene } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      // Calculate the center of the canvas
      const canvasCenter = new THREE.Vector3(size.width / 2, size.height / 2, 0);
      
      // Set the target position to the center of the canvas
      const targetPosition = new THREE.Vector3(0, 0, 0);
      // Update the eye's rotation to look at the target position
      meshRef.current.lookAt(targetPosition);
    }
  }, [scene]);

  return (
    <group position={position}>
    <mesh ref={meshRef} position={position}>
      <sphereGeometry attach="geometry" args={[0.07, 6, 6]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
      <pointLight
        distance={6}
        intensity={0.02}
        color="red"
        position={[0, 1, 0.4]} // Adjust position to make the glow originate from the eye
      />
    </group>
  );
};

const GlowingEyes = ({ position }) => {
  return (
    <group position={position}>
      <Eye position={[-0.1, 0, 0]} /> {/* Left Eye */}
      <Eye position={[0.1, 0, 0]} /> {/* Right Eye */}
    </group>
  );
};

export default GlowingEyes;
