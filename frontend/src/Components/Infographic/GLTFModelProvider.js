import React, { createContext, useContext, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GLTFModelContext = createContext();

export const useGLTFModel = () => useContext(GLTFModelContext);

export const GLTFModelProvider = ({ children }) => {
  const [gltf, setGLTF] = useState();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/models/gear.glb', setGLTF);
  }, []);

  return (
    <GLTFModelContext.Provider value={gltf}>
      {children}
    </GLTFModelContext.Provider>
  );
};

export default GLTFModelProvider;