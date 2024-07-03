import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import { BoxHelper, Box3 } from 'three';

const FrontModel = ({ position, scale, collisionGroups }) => {
  const frontGltf = useLoader(GLTFLoader, '/models/smalltracks_front1.glb');
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

      // Calculate and log bounding box
      const boundingBox = new Box3().setFromObject(frontScene);
      console.log('Bounding Box:', boundingBox);
      console.log('Bounding Box Min:', boundingBox.min);
      console.log('Bounding Box Max:', boundingBox.max);

      // Log position and scale
      console.log('Position:', position);
      console.log('Scale:', scale);
    }
  }, [frontGltf, scale]);

  return (
    <RigidBody type="fixed" position={position} collisionGroups={collisionGroups}>
      <group ref={groupRef} />
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
};

export default FrontModel;
