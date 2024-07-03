import React, { useEffect, useRef } from "react";
import "./CoverPage.css";
import { Canvas } from '@react-three/fiber';
import Scene from '../TreeShadows/Scene'
// import Scene from "../Lamp.js/Scene";
// import SphereGrid from '../Sphere/SphereGrid'
// import GridGame from './GridGame';
import Sentence from '../Sentence/Sentence'
// import Scene from "../Lamp/Scene";
// import Infographic from "../Infographic/Infographic";
// import TrackScene from "../Track/TrackScene";

function CoverPage() {
  // const colors = ["purple", "gold", "royalblue", "crimson"];
  const sentences = [
    "hello world",
    "welcome to my portfolio",
    "please click anywhere to enter"
  ];
  return (
  
    <>
      <div className="sentence">
      <Sentence
        sentences={sentences}
        color="green"
        startDelay={500}
        typingSpeed={100}
        maxFontSize={15}
        minFontSize={20}
      />
      
    </div>
    {/* <Infographic /> */}
      <Scene />
      {/* <TrackScene /> */}
      </>
  );
}

export default CoverPage;
