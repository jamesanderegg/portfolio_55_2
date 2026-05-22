import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Vector3, CubicBezierCurve3 } from "three";
import { MeshStandardMaterial } from "three";
import { AdditiveBlending, DoubleSide, ShaderMaterial } from "three";

// Create a single material instance
const skierMaterial = new MeshStandardMaterial({ color: "#8B4513" });
const beamOuterMaterial = new ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  side: DoubleSide,
  uniforms: {
    beamColor: { value: new Vector3(0.82, 0.89, 1.0) },
    maxAlpha: { value: 0.48 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 beamColor;
    uniform float maxAlpha;
    void main() {
      float distFade = pow(clamp(1.0 - vUv.y, 0.0, 1.0), 1.55);
      float edgeFade = smoothstep(0.0, 0.42, vUv.x) * (1.0 - smoothstep(0.58, 1.0, vUv.x));
      float nearBoost = 0.65 + 0.35 * smoothstep(0.6, 1.0, 1.0 - vUv.y);
      float alpha = distFade * edgeFade * nearBoost * maxAlpha;
      gl_FragColor = vec4(beamColor, alpha);
    }
  `,
});
const beamCoreMaterial = new ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  side: DoubleSide,
  uniforms: {
    beamColor: { value: new Vector3(0.95, 0.98, 1.0) },
    maxAlpha: { value: 0.34 },
  },
  vertexShader: beamOuterMaterial.vertexShader,
  fragmentShader: beamOuterMaterial.fragmentShader,
});

function Skier({
  position,
  color,
  lightColor = "#fff2c2",
  lightIntensity = 30,
  obstaclePositions = [],
  onExit = () => {},
}) {
  const skierRef = useRef();
  const curveRef = useRef();
  const progress = useRef(0);
  const hasExited = useRef(false);
  const speed = 0.002;
  const spotlightRef = useRef();
  const swayPhase = useRef(Math.random() * Math.PI * 2);
  const swayRate = useRef(0.16 + Math.random() * 0.12);
  const swayAmount = useRef(0.45 + Math.random() * 0.35);
  const bounceOffset = useRef(new Vector3(0, 0, 0));
  const bounceVelocity = useRef(new Vector3(0, 0, 0));
  const lastBounceTime = useRef(-10);

  useEffect(() => {
    const start = new Vector3(...position);
    const tightSCurve = Math.random() < 0.45;
    const sAmplitude = tightSCurve
      ? 22 + Math.random() * 16
      : 45 + Math.random() * 30;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const drift = (Math.random() - 0.5) * 22;
    const control1 = new Vector3(
      start.x + direction * sAmplitude,
      0,
      start.z + 85 + Math.random() * 20
    );
    const control2 = new Vector3(
      start.x - direction * sAmplitude * 0.9 + drift,
      0,
      start.z + 170 + Math.random() * 25
    );
    const end = new Vector3(start.x + drift * 0.6, 0, 220 + Math.random() * 40);

    curveRef.current = new CubicBezierCurve3(start, control1, control2, end);
  }, [position]);

  useFrame(({ clock }) => {
    if (curveRef.current && !hasExited.current) {
      progress.current += speed;
      if (progress.current >= 1) {
        hasExited.current = true;
        onExit();
        return;
      }
      const point = curveRef.current.getPoint(progress.current);
      const nextPoint = curveRef.current.getPoint((progress.current + 0.01) % 1);
      const forward = nextPoint.clone().sub(point).normalize();
      const side = new Vector3(-forward.z, 0, forward.x).normalize();
      const sway =
        Math.sin(clock.getElapsedTime() * swayRate.current + swayPhase.current) *
        swayAmount.current;

      if (clock.getElapsedTime() - lastBounceTime.current > 0.35) {
        for (let i = 0; i < obstaclePositions.length; i += 1) {
          const tree = obstaclePositions[i];
          const dx = point.x - tree.x;
          const dz = point.z - tree.z;
          const minDist = tree.radius + 0.95;
          if (dx * dx + dz * dz < minDist * minDist) {
            let away = new Vector3(dx, 0, dz);
            if (away.lengthSq() < 0.0001) {
              away = side.clone();
            } else {
              away.normalize();
            }
            bounceVelocity.current.add(away.multiplyScalar(0.55));
            lastBounceTime.current = clock.getElapsedTime();
            break;
          }
        }
      }

      bounceVelocity.current.multiplyScalar(0.88);
      bounceOffset.current.add(bounceVelocity.current);
      bounceOffset.current.multiplyScalar(0.9);

      const riderPosition = point.clone().add(bounceOffset.current);
      const riderLookTarget = nextPoint.clone().add(bounceOffset.current);

      skierRef.current.position.copy(riderPosition);
      skierRef.current.lookAt(riderLookTarget);
      if (spotlightRef.current) {
        const adjustedTarget = riderPosition
          .clone()
          .add(forward.multiplyScalar(18))
          .add(side.multiplyScalar(sway))
          .add(new Vector3(0, 0.1, 0));
        spotlightRef.current.position.copy(riderPosition.clone().add(new Vector3(0, 1.8, 0)));
        spotlightRef.current.target.position.copy(adjustedTarget);
        spotlightRef.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <>
      <mesh ref={skierRef} castShadow>
        <sphereGeometry args={[0.8, 15, 12]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} />
        <mesh position={[0.5, -0.85, 0]} material={skierMaterial}>
          <boxGeometry args={[0.5, 2, 4]} />
        </mesh>
        <mesh position={[-0.5, -0.85, 0]} material={skierMaterial}>
          <boxGeometry args={[0.5, 2, 4]} />
        </mesh>
        <mesh
          position={[0, 0, 8]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={beamOuterMaterial}
        >
          <coneGeometry args={[4.0, 16, 8, 1, true]} />
        </mesh>
        <mesh
          position={[0, 0, 6]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={beamCoreMaterial}
        >
          <coneGeometry args={[2.0, 12, 8, 1, true]} />
        </mesh>
        <group position={[0, -0.55, -0.8]}>
          <Sparkles
            count={18}
            speed={0.28}
            opacity={0.45}
            color="#edf5ff"
            size={2.3}
            scale={[2.8, 0.55, 2.2]}
            noise={1.4}
          />
        </group>
      </mesh>
      <spotLight
        ref={spotlightRef}
        args={[lightColor, 1, 190]}
        intensity={lightIntensity}
        position={[10, 0, 0]}
        angle={Math.PI / 3}
        penumbra={0.9}
        decay={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />
    </>
  );
}

export default Skier;

