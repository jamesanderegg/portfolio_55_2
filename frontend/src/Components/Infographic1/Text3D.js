import React, { useRef, useEffect, useState } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as THREE from 'three';

// Ensure TextGeometry is properly extended into THREE namespace
extend({ TextGeometry });

const Text3D = ({ text, position, rotation, size, color, fontUrl="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json" }) => {
  const [font, setFont] = useState(null);
  const textRef = useRef();

  useEffect(() => {
    const loader = new FontLoader();
    loader.load(fontUrl, (loadedFont) => {
      setFont(loadedFont);
    });
  }, [fontUrl]);

  useEffect(() => {
    if (textRef.current && font) {
      textRef.current.geometry.center(); // Center the text geometry
    }
  }, [text, font]);

  if (!font) return null;

  return (
    <mesh position={position} rotation={rotation} ref={textRef}>
      <textGeometry args={[text, { font, size: size, height: 1 }]} />
      <meshStandardMaterial attach="material" metalness={0.8} roughness={0.2} color={color} />
    </mesh>
  );
};

export default Text3D;
