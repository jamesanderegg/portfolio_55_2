import React from "react";
import * as THREE from "three";

const Plane = () => {
  return (
    <mesh scale={10} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <circleGeometry attach="geometry" args={[50, 32]} /> {/* args are [radius, segments] */}
      <meshStandardMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Plane;
