import React from "react";


// need to attach to node 1 if want to make work for entire page.
// import Background from '../../images/background.png'

// const background = {
//     width: "100%",
//     height: "100%",
// }

function ComponentDisplay({data}) {
  

  return (
    <div
      className="component-display"
      style={{height: "100%"}}
    >
      {/* <h4>{props.data.name}</h4> */}
      {data.component}
    </div>
  );
} 

export default ComponentDisplay;
