import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import Lights from "./Lights";
import Camera from "./Camera";
import SpinningGroup from "./SpinningGroup";
import Skier from "./Skier";
import Snowboarder from "./Snowboarder";

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

function getRandomFlashlightProfile() {
  const lightPalette = [
    "#fff2c2",
    "#ffd8a8",
    "#ffe6cc",
    "#c2e8ff",
    "#8ad6ff",
    "#d7d0ff",
    "#ffd1f2",
  ];
  const lightColor = lightPalette[Math.floor(Math.random() * lightPalette.length)];
  const lightIntensity = 85 + Math.random() * 40;
  return { lightColor, lightIntensity };
}

export default function Scene() {
  const [riders, setRiders] = useState([]);
  const [treeColliders, setTreeColliders] = useState([]);
  const treePositions = useMemo(() => generateRandomPositions(400, 1), []);
  const handleTreeSnapshot = useCallback((snapshot) => {
    setTreeColliders(snapshot);
  }, []);

  useEffect(() => {
    let timeoutId;
    let riderId = 0;
    const MIN_SPAWN_MS = 2000;
    const MAX_SPAWN_MS = 4500;
    const MAX_RIDERS_ON_SCREEN = 4;

    const scheduleNextSpawn = () => {
      const delay = MIN_SPAWN_MS + Math.random() * (MAX_SPAWN_MS - MIN_SPAWN_MS);
      timeoutId = setTimeout(() => {
        setRiders((prevRiders) => {
          if (prevRiders.length >= MAX_RIDERS_ON_SCREEN) {
            return prevRiders;
          }
          riderId += 1;
          const type = Math.random() < 0.75 ? "skier" : "snowboarder";
          return [
            ...prevRiders,
            {
              id: riderId,
              type,
              position: getRandomPosition(),
              color: getRandomColor(),
              flashlight: getRandomFlashlightProfile(),
            },
          ];
        });
        scheduleNextSpawn();
      }, delay);
    };

    scheduleNextSpawn();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleRiderExit = (id) => {
    setRiders((prevRiders) => prevRiders.filter((rider) => rider.id !== id));
  };

  return (
    <Canvas
      camera={{ position: [0, 90, 0], fov: 90 }}
      shadows
      gl={{ alpha: true }}
      fog={{ color: "#0a101a", near: 45, far: 240 }}
    >
      <Camera />
      <Lights />
      <SpinningGroup treePositions={treePositions} onTreeSnapshot={handleTreeSnapshot} />
      {riders.map((rider) =>
        rider.type === "snowboarder" ? (
          <Snowboarder
            key={rider.id}
            position={rider.position}
            color={rider.color}
            lightColor={rider.flashlight.lightColor}
            lightIntensity={rider.flashlight.lightIntensity}
            obstaclePositions={treeColliders}
            onExit={() => handleRiderExit(rider.id)}
          />
        ) : (
          <Skier
            key={rider.id}
            position={rider.position}
            color={rider.color}
            lightColor={rider.flashlight.lightColor}
            lightIntensity={rider.flashlight.lightIntensity}
            obstaclePositions={treeColliders}
            onExit={() => handleRiderExit(rider.id)}
          />
        )
      )}
    </Canvas>
  );
}
