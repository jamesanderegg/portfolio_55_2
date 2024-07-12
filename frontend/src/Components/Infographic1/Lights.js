import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

function Lights() {
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const targetRef1 = useRef();
  const { size } = useThree();

  const [mousePosition, setMousePosition] = useState(new Vector3());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isMobile) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;
        setMousePosition(new Vector3(x * 50, y * 50, 0)); // Adjust the scaling factor for non-mobile
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size, isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (spotLightRef1.current && targetRef1.current) {
      spotLightRef1.current.target = targetRef1.current;
    }
    if (spotLightRef2.current && targetRef1.current) {
      spotLightRef2.current.target = targetRef1.current;
    }
  }, [mousePosition]);

  useFrame(({ clock }) => {
    if (isMobile) {
      const elapsedTime = clock.getElapsedTime();
      const y = -30 + (Math.sin(elapsedTime * 0.4) + 1) / 2 * 65; // Smooth transition
      setMousePosition(new Vector3(0, y, 0));
    }
  });

  return (
    <>
      <directionalLight 
        position={[10, 30, 2]} 
        intensity={4} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />

      <spotLight
        ref={spotLightRef1}
        color={"silver"}
        position={[75, 35, 30]} 
        angle={Math.PI / 5} 
        penumbra={0} 
        intensity={5000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <spotLight
        ref={spotLightRef2}
        color={"silver"}
        position={[-75, 35, 30]} 
        angle={Math.PI / 5} 
        penumbra={0} 
        intensity={5000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />

      <mesh ref={targetRef1} position={mousePosition} visible={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
}

export default Lights;
