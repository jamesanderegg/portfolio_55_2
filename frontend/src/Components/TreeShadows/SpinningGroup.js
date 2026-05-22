import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import Plane from "./Plane";
import Tree from "./Tree";

const SpinningGroup = ({ treePositions, onTreeSnapshot }) => {
  const treeRefs = useRef(new Map());
  const nextTreeId = useRef(0);
  const snapshotTimer = useRef(0);
  const scrollSpeed = 0.16;
  const exitPadding = 28;
  const bounds = useMemo(() => {
    const zValues = treePositions.map((p) => p[2]);
    const xValues = treePositions.map((p) => p[0]);
    const minZ = Math.min(...zValues);
    const maxZ = Math.max(...zValues);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    return { minZ, maxZ, minX, maxX };
  }, [treePositions]);

  const sampleCenterBiasedX = useCallback(() => {
    const center = (bounds.minX + bounds.maxX) / 2;
    const halfRange = (bounds.maxX - bounds.minX) / 2;
    const randomSigned = Math.random() * 2 - 1;
    const biased = Math.sign(randomSigned) * Math.pow(Math.abs(randomSigned), 2.2);
    return center + biased * halfRange;
  }, [bounds]);

  const createTree = useCallback((spawnZ) => {
    const id = nextTreeId.current;
    nextTreeId.current += 1;
    return {
      id,
      x: sampleCenterBiasedX(),
      y: 0,
      z: spawnZ,
      heightMultiplier: Math.random() * 0.5 + 0.75,
    };
  }, [sampleCenterBiasedX]);

  const [trees, setTrees] = useState(() => {
    const width = bounds.maxX - bounds.minX;
    const depth = bounds.maxZ - bounds.minZ;
    const initialCount = Math.min(
      220,
      Math.max(120, Math.floor((width * depth) / 900))
    );
    return Array.from({ length: initialCount }, () =>
      createTree(bounds.minZ + Math.random() * depth)
    );
  });

  useEffect(() => {
    let timeoutId;
    const width = bounds.maxX - bounds.minX;
    const depth = bounds.maxZ - bounds.minZ;
    const maxTrees = Math.min(300, Math.max(160, Math.floor((width * depth) / 700)));

    const scheduleSpawn = () => {
      const delay = 120 + Math.random() * 140;
      timeoutId = setTimeout(() => {
        setTrees((prevTrees) => {
          if (prevTrees.length >= maxTrees) {
            return prevTrees;
          }
          const spawnZ = bounds.minZ - exitPadding - Math.random() * exitPadding;
          return [...prevTrees, createTree(spawnZ)];
        });
        scheduleSpawn();
      }, delay);
    };

    scheduleSpawn();
    return () => clearTimeout(timeoutId);
  }, [bounds, createTree]);

  useFrame((_, delta) => {
    const frameSpeed = scrollSpeed * delta * 60;
    const exiting = [];
    treeRefs.current.forEach((treeGroup, id) => {
      treeGroup.position.z += frameSpeed;
      if (treeGroup.position.z > bounds.maxZ + exitPadding) {
        exiting.push(id);
      }
    });

    if (exiting.length > 0) {
      const exitingSet = new Set(exiting);
      setTrees((prevTrees) => prevTrees.filter((tree) => !exitingSet.has(tree.id)));
      exiting.forEach((id) => treeRefs.current.delete(id));
    }

    if (onTreeSnapshot) {
      snapshotTimer.current += delta;
      if (snapshotTimer.current >= 0.2) {
        snapshotTimer.current = 0;
        const treeDataById = new Map(trees.map((tree) => [tree.id, tree]));
        const snapshot = [];
        treeRefs.current.forEach((node, id) => {
          const treeData = treeDataById.get(id);
          if (!treeData) return;
          snapshot.push({
            x: node.position.x,
            z: node.position.z,
            radius: 1.15 * treeData.heightMultiplier,
          });
        });
        onTreeSnapshot(snapshot);
      }
    }
  });

  return (
    <group>
      <Plane />
      {trees.map((tree) => (
        <group
          key={tree.id}
          ref={(node) => {
            if (node) {
              treeRefs.current.set(tree.id, node);
            } else {
              treeRefs.current.delete(tree.id);
            }
          }}
          position={[tree.x, tree.y, tree.z]}
        >
          <Tree position={[0, 0, 0]} heightMultiplier={tree.heightMultiplier} />
        </group>
      ))}
    </group>
  );
};

export default SpinningGroup;
