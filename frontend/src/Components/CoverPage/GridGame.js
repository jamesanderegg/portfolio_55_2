import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const GridGame = () => {
  const [counter, setCounter] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    drawGrid();
  }, []);

  const drawGrid = () => {
    const svg = d3.select(svgRef.current);
    const numSquares = 26;
    const squareSize = 10;
    const padding = 5;

    // Create a group for the squares
    const squaresGroup = svg.append('g');

    // Draw squares
    for (let i = 0; i < numSquares; i++) {
      for (let j = 0; j < numSquares; j++) {
        squaresGroup
          .append('rect')
          .attr('x', i * (squareSize + padding) + padding)
          .attr('y', j * (squareSize + padding) + padding)
          .attr('width', squareSize)
          .attr('height', squareSize)
          .attr('fill', 'white')
          .attr('stroke', 'black')
          .on('mouseover', function (d, i) {
            d3.select(this)
              .transition()
              .duration(300)
              .attr('fill', 'blue')
              .transition()
              .duration(600)
              .attr('fill', 'white');
          });
      }
    }

    // Randomly select a square to be red
    const randomX = Math.floor(Math.random() * numSquares);
    const randomY = Math.floor(Math.random() * numSquares);

    squaresGroup
      .select(`rect:nth-child(${randomX * numSquares + randomY + 1})`)
      .attr('fill', 'red')
      .on('mouseover', function (d, i) {
        setCounter((prev) => prev + 1);
        console.log('hello')
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', 'white')
          .on('end', drawGrid);
      });
  };

  return (
    <div>
      <svg ref={svgRef} width={400} height={400}></svg>
      <div>
        Counter: {counter}
      </div>
    </div>
  );
};

export default GridGame;