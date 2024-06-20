import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

import Barchart from "./Barchart";

const Svg = styled.svg`
  width: 100%;
  height: 130px;
  border: 2px solid #bebfc2;
`;

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const processors = d3.range(5).map(i => `${i} CPU`),
      random = d3.randomUniform(1000, 50000);

    const data = d3.range(1970, 2025).map(year =>
      d3.range(5).map(i => ({
        year: year,
        name: processors[i],
        transistors: Math.round(random())
      }))
    );

    setData(data);
  }, []);

  return data;
};
function App() {
  const data = useData();
  const [currentYear, setCurrentYear] = useState(1);

  const yearIndex = d3
    .scaleOrdinal()
    .domain(d3.range(1, 2025))
    .range(d3.range(0, 2025-1970));
  //main animation a simple counter
  
  useEffect(() => {
    const interval = d3.interval(() => {
      setCurrentYear(year => {
      
        return year + 1;
      });

      
    }, 1500);

    return () => interval.stop();
  }, []);
  
  return (
    <Svg style={{paddingTop: "10px"}}>
      {data ? (
        <Barchart data={data[yearIndex(currentYear)]} 
        x={0} 
        y={0} 
        barThickness={19} 
        width={"98%"} />
      ) : null}
    </Svg>
  );
}

export default App;
