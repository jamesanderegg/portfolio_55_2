import React from 'react';

function Lights() {
  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight 
        position={[-10, 50, -10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <pointLight 
        position={[10, 10, 0]} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.005}
      />
      <spotLight 
        position={[5, 10, 5]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <hemisphereLight skyColor={'#ffffff'} groundColor={'#000000'} intensity={10} />
      {/* Additional lights can be added here */}
    </>
  );
}

export default Lights;
