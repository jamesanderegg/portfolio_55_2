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
      {/* <pointLight
        castShadow
        intensity={.01}
        args={["#d31b1b", 0, 30]}
        position={[lightX, lightY, lightZ]}
      />
      <spotLight
        castShadow
        intensity={10}
        args={["#a49963", 5, 400]}
        position={[lightX, lightY, lightZ]}
        penumbra={0.3}
        angle={Math.PI / 3}
      /> */}
      {/* Directional Light (Sun) */}
      <directionalLight
        castShadow
        intensity={.3}
        color="#fff9db"
        position={[55, 55, 100]}  
        shadow-mapSize-width={350}
        shadow-mapSize-height={350}
        shadow-camera-far={500}
        shadow-camera-left={-180}
        shadow-camera-right={180}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    </>
  );
}

export default Lights;
