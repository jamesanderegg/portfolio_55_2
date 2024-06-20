import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Plane from "./Plane";
import Tree from "./Tree";

const SpinningGroup = ({ treePositions }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00005; // Adjust rotation speed here
    }
  });

  return (
    <group ref={groupRef}>
      <Plane />
      {treePositions.map((position, idx) => (
        <Tree position={position} key={idx} heightMultiplier={Math.random() * 0.5 + 0.75} />
      ))}
    </group>
  );
};

export default SpinningGroup;
