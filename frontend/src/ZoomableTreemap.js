import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const palette = [
  "#f7fcf0",
  "#e0f3db",
  "#ccebc5",
  "#a8ddb5",
  "#7bccc4",
  "#4eb3d3",
  "#2b8cbe",
  "#0868ac",
  "#084081",
].reverse();

const ZoomableTreemap = ({ data }) => {
  const treemapRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node === selectedNode ? null : node);
  };

  useEffect(() => {
    const width = treemapRef.current.offsetWidth;
    const height = treemapRef.current.offsetHeight;

    const x = d3.scaleLinear().domain([0, width]).range([0, width]);
    const y = d3.scaleLinear().domain([0, height]).range([0, height]);

    const color = d3.scaleOrdinal().range(
      palette.map(function (c) {
        c = d3.rgb(c);
        return c;
      })
    );

    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingInner(0)
      .round(false);

    const svg = d3
      .select(treemapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-size", "10px");

    const root = d3.hierarchy(data).sum((d) => d.value);

    treemap(root);

    const node = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("div")
      .attr("class", (d) => "node level-" + d.depth)
      .style("left", (d) => x(d.x0) + "px")
      .style("top", (d) => y(d.y0) + "px")
      .style("width", (d) => x(d.x1) - x(d.x0) + "px")
      .style("height", (d) => y(d.y1) - y(d.y0) + "px")
      .style("background", (d) => (d.data.value ? color(d.data.name) : null))
      .on("click", handleNodeClick);

    node
      .append("img")
      .attr("src", (d) => d.data.value || null)
      .style("max-width", "100%")
      .style("max-height", "100%");

    node
      .append("p")
      .attr("class", "label")
      .text((d) => d.data.name)
      .style("opacity", (d) => (d.data.value ? 0 : 1));
  }, [data]);

  useEffect(() => {
    const svg = d3.select(treemapRef.current).select("svg");

    if (selectedNode) {
      svg
        .selectAll(".node")
        .classed(
          "hide",
          (d) =>
            d !== selectedNode && d.ancestors().indexOf(selectedNode) === -1
        );
    } else {
      svg.selectAll(".node").classed("hide", false);
    }
  }, [selectedNode]);

  return <div className="treemap-container" ref={treemapRef}></div>;
};

export default ZoomableTreemap;
