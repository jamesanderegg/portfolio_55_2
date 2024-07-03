import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

function Camera({ position = [0, 0, 60], lookAt = [0, 0, 0] }) {
  const { camera } = useThree();

  useEffect(() => {
    // Set the camera position and lookAt based on props
    camera.position.set(...position);
    camera.lookAt(...lookAt);
  }, [camera, position, lookAt]);

  return null;
}

export default Camera;
