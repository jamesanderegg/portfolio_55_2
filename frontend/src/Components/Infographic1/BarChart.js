import React, { useEffect, useState } from 'react';
import Bar from './Bar';

const BarChart = ({ initialData, updateInterval = 1800 }) => {
  const [data, setData] = useState(initialData || []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(data.map(d => ({
        ...d,
        value: Math.random() * 10 + 1 // Random value between 1 and 8
      })));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [data, updateInterval]);

  if (!data || !data.length) return null; // Add this safeguard to avoid rendering when data is undefined or empty

  return (
    <group>
      {data.map((d, index) => (
        <Bar
          key={index}
          position={[-10 + index * 1.2, 46, 2.2]}
          scale={[2, 1, 2]} // Initial height set to 1
          rotation={[0, 0, 0]}
          color={d.color}
          targetHeight={d.value} // Target height
        />
      ))}
    </group>
  );
};

export default BarChart;
