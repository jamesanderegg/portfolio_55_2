import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import Lights from "./Lights";
import Camera from "./Camera";
import SpinningGroup from "./SpinningGroup";
import Skier from "./Skier";

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
    const x = Math.random() * 400 - 200;
    const y = 0;
    const z = Math.random() * 400 - 200;
    const newPos = [x, y, z];

    if (isPositionValid(newPos)) {
      positions.push(newPos);
    }
  }

  return positions;
}

function getRandomColor() {
  const colors = ["orange", "blue", "yellow", "red", "green", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomPosition() {
  const z = -100 - Math.random() * 50; // Generates a number between -100 and -150
  const x =  100 - Math.random() * 200;
  return [x, 0, z];
}

const SpinningGroupWrapper = React.memo(() => {
  const treePositions = generateRandomPositions(400, 1);
  return <SpinningGroup treePositions={treePositions} />;
});

const MAX_SKIERS = 10; // Set a maximum number of skiers

export default function Scene() {
  const [skiers, setSkiers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkiers((prevSkiers) => {
        if (prevSkiers.length >= MAX_SKIERS) {
          return prevSkiers; // Do not add new skiers if the limit is reached
        }
        return [
          ...prevSkiers,
          { position: getRandomPosition(), color: getRandomColor() },
        ];
      });
    }, Math.random() * 6000 + 1000); // Random interval between 3000 and 10000 ms

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <Canvas camera={{ position: [0, 90, 0], fov: 90 }} shadows fog={{ color: '#06040d', near: 10, far: 50 }}>
      <color attach="background" args={["#06040d"]} />
      <Camera />
      <Lights />
      <SpinningGroupWrapper />
      {skiers.map((skier, index) => (
        <Skier key={index} position={skier.position} color={skier.color} />
      ))}
    </Canvas>
  );
}