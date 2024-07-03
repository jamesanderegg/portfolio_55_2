import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, CubicBezierCurve3 } from "three";
import { MeshStandardMaterial } from "three";

// Create a single material instance
const skierMaterial = new MeshStandardMaterial({ color: "#8B4513" });
const colors = ["orange", "blue", "yellow", "red", "green", "purple"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomPosition() {
  const x = -100 - Math.random() * 50; // Generates a number between -100 and -150
  const z = -Math.random() * 100;
  return [x, 0, z];
}
function Skier({ position, color }) {
  const skierRef = useRef();
  const curveRef = useRef();
  const progress = useRef(0);
  const speed = 0.002;
  const spotlightRef = useRef();

  useEffect(() => {
    const start = new Vector3(...position);
    const control1 = new Vector3(Math.random() * 200 - 100, 0, Math.random() * 100 - 50);
    const control2 = new Vector3(Math.random() * 200 - 100, 0, Math.random() * 200 + 50);
    const end = new Vector3(Math.random() * 200 - 100, 0, 200);

    curveRef.current = new CubicBezierCurve3(start, control1, control2, end);
  }, [position]);

  useFrame(() => {
    if (curveRef.current) {
      progress.current = (progress.current + speed) % 1;
      const point = curveRef.current.getPoint(progress.current);
      const nextPoint = curveRef.current.getPoint((progress.current + 0.01) % 1);
      const direction = nextPoint.clone().sub(point).normalize();
      skierRef.current.position.copy(point);
      skierRef.current.lookAt(nextPoint);

      // Adjust nextPoint as needed
      const adjustedTarget = nextPoint.clone().add(new Vector3(0, 2, 2));

      // Update the spotlight position and target
      spotlightRef.current.position.copy(point.clone().add(new Vector3(0, 5, 0)));
      spotlightRef.current.target.position.copy(adjustedTarget);
      spotlightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <mesh ref={skierRef} castShadow>
        <sphereGeometry args={[0.8, 15, 0.8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} />
        <mesh position={[0.5, -1, 0]} material={skierMaterial}>
          <boxGeometry args={[0.5, 2, 4]} />
        </mesh>
        <mesh position={[-0.5, -1, 0]} material={skierMaterial}>
          <boxGeometry args={[0.5, 2, 4]} />
        </mesh>
      </mesh>
      <spotLight
        ref={spotlightRef}
        args={["#a49963", 5, 300]}
        intensity={300}
        position={[0, 10, 0]}
        angle={Math.PI / 7}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.001}
        shadow-radius={100}
      />
    </>
  );
}

export default Skier;
