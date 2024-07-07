import React from 'react';
import Bar from './Bar';

const BarChart = ({ data }) => {
  return (
    <group>
      {data.map((d, index) => (
        <Bar
          key={index}
          position={[-10 + index * 5, 22.5, 10]}
          scale={[2, d.value, 5]}
          rotation={[0, 0, 0]}
          color={d.color}
          targetHeight={d.value}
        />
      ))}
    </group>
  );
};

export default BarChart;
