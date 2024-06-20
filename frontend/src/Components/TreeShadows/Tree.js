import React from "react";

function Tree({ position, heightMultiplier = 1 }) {
  const cylinderHeight = 2 * heightMultiplier;
  const coneHeight = [2, 1.5, 1].map(height => height * heightMultiplier); // Heights for the three cones

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow receiveShadow position={[0, cylinderHeight / 2, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[0.15 * heightMultiplier, 0.15 * heightMultiplier, cylinderHeight, 32]}
        />
        <meshStandardMaterial attach="material" color="sienna" />
      </mesh>
      {/* Cones */}
      {coneHeight.map((height, index) => (
        <mesh
          castShadow
          receiveShadow
          key={index}
          position={[0, (cylinderHeight + coneHeight.slice(0, index + 1).reduce((a, b) => a + b, 0)) / 2, 0]}
        >
          <coneGeometry attach="geometry" args={[0.7 * heightMultiplier, height, 32]} />
          <meshStandardMaterial attach="material" color="green" />
        </mesh>
      ))}
    </group>
  );
}

export default Tree;
