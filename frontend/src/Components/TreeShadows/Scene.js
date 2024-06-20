import React from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import Lights from "./Lights";
import Camera from "./Camera";
import SpinningGroup from "./SpinningGroup";
import GlowingEyes from "./GlowingEyes";

function generateRandomPositions(count, minDistance) {
    const positions = [];
    
    function distanceBetween(pos1, pos2) {
      return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[2] - pos2[2], 2));
    }
  
    function isPositionValid(newPos) {
      for (const pos of positions) {
        if (distanceBetween(newPos, pos) < minDistance) {
          return false;
        }
      }
      return true;
    }
  
    while (positions.length < count) {
      const x = Math.random() * 200 - 100;
      const y = 0;
      const z = Math.random() * 200 - 100;
      const newPos = [x, y, z];
  
      if (isPositionValid(newPos)) {
        positions.push(newPos);
      }
    }
  
    return positions;
  }

  export default function Scene() {
    const treePositions = generateRandomPositions(400, 2);
    const glowingEyePostions = generateRandomPositions(10, 2);
  
    return (
    <Canvas camera={{ position: [0, 50, 0], fov: 90 }} shadows fog={{ color: '#06040d', near: 10, far: 50 }}>
      <color attach="background" args={["#06040d"]} />
      <Camera />
      <directionalLight intensity={0.0001} castShadow />
      <Lights />
      <SpinningGroup treePositions={treePositions} />
      {glowingEyePostions.map((eyes, index) => (
      <GlowingEyes position={eyes} key={index}/> 
      ))}
    </Canvas>
    );
  }
