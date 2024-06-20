import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles/Zoom.css";

import StateManagment from "./utilities/StateManagment";

function TreeMap(props) {
  const [clickData, setClickData] = useState(null);
  const zoomRef = useRef(null);
  const ref = useRef();
  const rootNodeRef = useRef(null);

  useEffect(() => {
    const drawTreemap = () => {
      setClickData(props.treeMapData.children[0]);
      var height = 100,
        width = 100,
        x = d3.scaleLinear().domain([0, width]).range([0, width]),
        y = d3.scaleLinear().domain([0, height]).range([0, height]),
        color = d3.scaleOrdinal().range(
          d3.schemeRdBu[3].map(function (c) {
            c = d3.rgb(c);
            return c;
          })
        ),
        treemap = d3
          .treemap()
          .size([width, height])
          //.tile(d3.treemapResquarify) // doesn't work - height & width is 100%
          .paddingInner(0)
          .round(false);
      var data;

      props.treeMapData === null
        ? console.log("no data yet")
        : (data = props.treeMapData);
      var nodes = d3.hierarchy(data).sum(function (d) {
        return d.value ? 1 : 0;
      });
      //.sort(function(a, b) { return b.height - a.height || b.value - a.value });

      rootNodeRef.current = nodes.children[0];

      var currentDepth;

      treemap(nodes);

      const chart = d3.select(ref.current);

      var Cells = chart
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("div")
        .attr("class", function (d) {
          return "node level-" + d.depth;
        })
        .attr("title", function (d) {
          return d.data.name ? d.data.name : "null";
        })
        .attr("id", function (d) {
          return d.data.id ? d.data.id.split(" ")[0] : "null";
        });

      Cells.style("left", function (d) {
        return x(d.x0) + "%";
      })
        .style("top", function (d) {
          return y(d.y0) + "%";
        })
        .style("width", function (d) {
          return x(d.x1) - x(d.x0) + "%";
        })
        .style("height", function (d) {
          return y(d.y1) - y(d.y0) + "%";
        })
        //.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
        //.style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
        .style("background-color", function (d) {
          while (d.depth > 2) d = d.parent;
          
          
          return color(d.data.name);
        })
        .on("click", function (event, d) {
            console.log("CLICKS control zoom here")
              // return d.depth === 2 ? zoom(d) : null;
            return zoom(d)
        });
      Cells.append("p")
        .attr("class", "label")
        .text(function (d) {
          
          return d.data.name ? d.data.name : "---";
        }).style("display", function (d) {
          // Conditionally setting the display property
          if (d.data.name === "Welcome" || d.data.name ==="File") {
            return "none"; // Hide the element
          } else {
            return "block"; // Show the element (default for p elements)
          }
        });
        ;
      // Cells.append("p").attr("class", "text").text(function(d) {
      //     return d.data.displayText ? d.data.displayText : "---";
      // });

      var parent = d3.select(".up").datum(nodes).on("click", function (event,d) {

        return zoom(d)
      });
      
      
      function zoom(d) {
        // http://jsfiddle.net/ramnathv/amszcymq/

        if (d) {
            
          setClickData(d);
        }

        currentDepth = d.depth;
        parent.datum(d.parent || nodes);

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        var t = d3.transition().duration(800).ease(d3.easeCubicOut);

        Cells.transition(t)
          .style("left", function (d) {
            return x(d.x0) + "%";
          })
          .style("top", function (d) {
            return y(d.y0) + "%";
          })
          .style("width", function (d) {
            return x(d.x1) - x(d.x0) + "%";
          })
          .style("height", function (d) {
            return y(d.y1) - y(d.y0) + "%";
          });

        Cells.filter(function (d) { // hide this depth and above
          return d.ancestors();
        })
          .classed("hide", function (d) {
            return d.children ? true : false;
          });

        Cells.filter(function (d) { // show this depth + 1 and below
          return d.depth > currentDepth;
        })
          .classed("hide", false);
      }
      zoomRef.current = zoom;
    };
    if (props.treeMapData) {
      drawTreemap();
    }
    
  }, [props]);
  
  const handleZoomClick = () => {
    if (rootNodeRef.current && zoomRef.current) {
        zoomRef.current(rootNodeRef.current);
    }
};
  return (
    <div className="feature" ref={ref}>
      <StateManagment treeMapData={props.treeMapData} clickData={clickData} handleZoomClick={handleZoomClick} />
      
      
    </div>
  );
}

export default TreeMap;
