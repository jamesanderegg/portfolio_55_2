import React from 'react';

function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight 
        position={[-10, 50, -10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      {/* <pointLight 
        color={'silver'}
        position={[15, 55, 10]} 
        intensity={2500} 
        castShadow 
        shadow-mapSize-width={2024} 
        shadow-mapSize-height={2024} 
        shadow-bias={-0.005}
      /> */}
      <spotLight 
      color={"silver"}
        position={[30, 60, 25]} 
        angle={15} 
        penumbra={0} 
        intensity={1000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <spotLight 
        color={"silver"}
        position={[0, 65, 45]} 
        angle={20} 
        penumbra={0} 
        intensity={3000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <spotLight 
        color={"silver"}
        position={[-30, 60, 25]} 
        angle={15} 
        penumbra={0} 
        intensity={1000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      <spotLight 
        color={"silver"}
        position={[-20, 20, 15]} 
        angle={15} 
        penumbra={0.1} 
        intensity={2000} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-bias={-0.001}
      />
      {/* <hemisphereLight skyColor={'#ffffff'} groundColor={'#000000'} intensity={10} /> */}
      {/* Additional lights can be added here */}
    </>
  );
}

export default Lights;
