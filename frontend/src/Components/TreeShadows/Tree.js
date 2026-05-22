import React from "react";

function Tree({ position, heightMultiplier = 1 }) {
  const treeScale = 1.21;
  const scaledMultiplier = heightMultiplier * treeScale;
  const cylinderHeight = 2 * scaledMultiplier;
  const coneHeight = [2, 1.5, 1].map((height) => height * scaledMultiplier);
  const foliageColors = ["#2b4d3f", "#355b49", "#3f6b53"];

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, cylinderHeight / 2, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[0.15 * scaledMultiplier, 0.15 * scaledMultiplier, cylinderHeight, 12]}
        />
        <meshStandardMaterial
          attach="material"
          color="#4a3326"
          roughness={0.92}
          metalness={0.03}
        />
      </mesh>
      {coneHeight.map((height, index) => (
        <mesh
          castShadow
          receiveShadow
          key={index}
          position={[
            0,
            (cylinderHeight + coneHeight.slice(0, index + 1).reduce((a, b) => a + b, 0)) / 2,
            0,
          ]}
        >
          <coneGeometry attach="geometry" args={[0.7 * scaledMultiplier, height, 12]} />
          <meshStandardMaterial
            attach="material"
            color={foliageColors[index]}
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Tree;
