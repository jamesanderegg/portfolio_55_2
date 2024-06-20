import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

function Camera() {
  const { camera, gl } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl.domElement]);

  useEffect(() => {
    camera.position.x = mousePosition.x * 0;
    camera.position.z = -mousePosition.y * 0;
    camera.lookAt(0, 0, 0); // You might need to adjust this depending on your scene's structure
  }, [mousePosition, camera]);

  return null;
}

export default Camera;
