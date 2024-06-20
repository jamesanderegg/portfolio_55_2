import React from "react";

function Marble({position}) {
  return (
    <mesh castShadow position={position}>
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default Marble;
