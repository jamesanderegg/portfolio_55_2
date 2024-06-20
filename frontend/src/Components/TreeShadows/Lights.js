import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

function Lights() {
  const { gl, camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert screen coordinates to normalized device coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl.domElement]);

  // Convert normalized device coordinates to a range suitable for light positioning
  const lightX = mousePosition.x * 50;
  const lightY = 1; // You can adjust the Y position as needed
  const lightZ = -mousePosition.y * 50;

  return (
    <>
      <pointLight
        castShadow
        intensity={0.09}
        args={["#d31b1b", 0, 30]}
        position={[lightX, lightY, lightZ]}
      />
      <spotLight
        castShadow
        intensity={1}
        args={["#a49963", 30, 100]}
        position={[lightX, lightY, lightZ]}
        penumbra={0.3}
        angle={Math.PI / 3}
      />
    </>
  );
}

export default Lights;
