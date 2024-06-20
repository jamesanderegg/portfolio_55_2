import React, { useEffect, useRef } from "react";
import "./CoverPage.css";
import { Canvas } from '@react-three/fiber';
import Scene from '../TreeShadows/Scene'
// import Scene from "../Lamp.js/Scene";
// import SphereGrid from '../Sphere/SphereGrid'
// import GridGame from './GridGame';
// import Sentence from '../Sentence/Sentence'
// import Scene from "../Lamp/Scene";


function CoverPage() {
  // const colors = ["purple", "gold", "royalblue", "crimson"];

  return (
    // <div className="container">
    //   {/* <Sentence
    //     sentences={["Welcome.", "full stack portfolio", "art gallery", "data viz"]}
    //     color="green"
    //     startDelay={500}
    //     typingSpeed={100}
    //     maxFontSize={80}
    //     minFontSize={80}
    //   /> */}
      
    // </div>
    <>
    <h1 >hello world</h1>
      <Scene />
      </>
  );
}

export default CoverPage;
