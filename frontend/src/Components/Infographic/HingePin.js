import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import { BoxHelper, Box3 } from 'three';

const HingePin = ({ position, scale,  }) => {
  const frontGltf = useLoader(GLTFLoader, '/models/smalltracks_hinge.glb');
  const groupRef = useRef();

  useEffect(() => {
    if (frontGltf && groupRef.current) {
      const frontScene = frontGltf.scene.clone();
      frontScene.position.set(0, 0, 0); // Adjust as needed
      frontScene.scale.set(...scale);

      groupRef.current.add(frontScene);

      // Add BoxHelper to visualize the bounding box
      const boxHelper = new BoxHelper(frontScene, 0xff0000); // Red color for the box
      groupRef.current.add(boxHelper);

    
    }
  }, [frontGltf, scale]);

  return (
    <RigidBody type="fixed" position={position}>
      <group ref={groupRef} />
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
};

export default HingePin;
