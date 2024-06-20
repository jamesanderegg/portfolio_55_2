import React from 'react';
import Sphere from './Sphere';

const SphereGrid = () => {
  const spheres = [];

  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      for (let z = -2; z <= 2; z++) {
        spheres.push(<Sphere position={[x, y, z]} key={`${x}-${y}-${z}`} />);
      }
    }
  }

  return <>{spheres}</>;
};

export default SphereGrid;
