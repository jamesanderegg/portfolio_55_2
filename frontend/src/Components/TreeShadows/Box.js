import React from "react";

function Box({ position }) {
  return (
    <mesh castShadow position={position}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default Box;
