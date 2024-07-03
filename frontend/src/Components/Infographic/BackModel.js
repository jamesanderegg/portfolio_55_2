import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import { BoxHelper, Box3 } from 'three';

const BackModel = ({ position, scale, collisionGroups }) => {
  const backGltf = useLoader(GLTFLoader, '/models/smalltracks_back1.glb');
  const groupRef = useRef();

  useEffect(() => {
    if (backGltf && groupRef.current) {
      const backScene = backGltf.scene.clone();
      backScene.position.set(-1, 0, 0); // Adjust as needed
      backScene.scale.set(...scale);

      groupRef.current.add(backScene);

      // Add BoxHelper to visualize the bounding box
      const boxHelper = new BoxHelper(backScene, 0x0000ff); // Blue color for the box
      groupRef.current.add(boxHelper);

      const boundingBox = new Box3().setFromObject(backScene);
      console.log('Bounding Box:', boundingBox);
      console.log('Bounding Box Min:', boundingBox.min);
      console.log('Bounding Box Max:', boundingBox.max);

      // Log position and scale
      console.log('Position:', position);
      console.log('Scale:', scale);
    }
  }, [backGltf, scale]);

  return (
    <RigidBody position={position} collisionGroups={collisionGroups}>
      <group ref={groupRef} />
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
};

export default BackModel;
