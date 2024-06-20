import React, { useEffect, useState } from "react";
import * as d3 from "d3";


const useTransition = ( {targetValue, name, startValue, easing }) => {
  const [renderValue, setRenderValue] = useState(startValue || targetValue);

  useEffect(() => {
      d3.selection()
          .transition(name)
          .duration(2000)
          .ease(easing || d3.easeLinear )
          .tween(name, ()=>{
              const interpolate = d3.interpolate(renderValue, targetValue);
              return t => setRenderValue(interpolate(t));
          })
          return function cleanup(){
            setRenderValue(null)
          };
    }, [targetValue]);

    return renderValue;
};

const Bar = ({ data, y, width, thickness }) => {
    const renderWidth = useTransition({ 
      targetValue: width,
      name: `width-${data.name}`,
      easing: d3.easeExpInOut
    });

    const renderY = useTransition({
      targetValue: y,
      name: `y-${data.name}`,
      startValue: 0,
      easing:d3.easeCubicInOut
    });
    const renderX = useTransition({
        targetValue: 0, 
        name: `x-${data.name}`,
        startValue: 0,
        easing:d3.easeCubicInOut
    });

  return (
    <g transform={`translate(${renderX}, ${renderY})`}>
      <rect x={10} y={0} width={renderWidth} height={thickness} fill="#bebfc2" />
    </g>
  );
};
//draws for single year
const Barchart = ({ data, x, y, barThickness, width }) => {
  //create scale for vertical alignment
  const yScale = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .paddingInner(0.1)
    .range([data.length * barThickness, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.transistors)])
    .range([0, width]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.map(d => (
        <Bar
          data={d}
          key={d.name}
          y={yScale(d.name)}
          width={xScale(d.transistors)}
          thickness={yScale.bandwidth()}
        />
      ))}
    </g>
  );
};

export default Barchart;
