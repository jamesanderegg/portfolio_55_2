import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Lights() {
  const moonRef = useRef();
  const orbitAngle = useRef(0);
  const orbitRadius = 170;
  const orbitHeight = 72;

  useFrame((_, delta) => {
    if (!moonRef.current) return;
    orbitAngle.current += delta * 0.015;
    moonRef.current.position.x = Math.cos(orbitAngle.current) * orbitRadius;
    moonRef.current.position.z = Math.sin(orbitAngle.current) * orbitRadius;
    moonRef.current.position.y = orbitHeight;
    moonRef.current.target.position.set(0, 0, 0);
    moonRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <ambientLight intensity={0.04} color="#5e6f9e" />
      <directionalLight
        ref={moonRef}
        castShadow
        intensity={0.22}
        color="#cfd7ee"
        position={[orbitRadius, orbitHeight, 0]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={600}
        shadow-camera-left={-260}
        shadow-camera-right={260}
        shadow-camera-top={260}
        shadow-camera-bottom={-260}
        shadow-bias={-0.00015}
        shadow-normalBias={0.025}
      />
    </>
  );
}

export default Lights;
