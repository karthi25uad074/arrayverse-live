import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

function AstronautModel() {
  const group = useRef();

  const modelPath = `${import.meta.env.BASE_URL}models/space-teacher.glb`;

  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const animationNames = Object.keys(actions);

    if (animationNames.length > 0) {
      const action = actions[animationNames[0]];

      action.reset();
      action.fadeIn(0.5);
      action.play();

      return () => {
        action.fadeOut(0.5);
        action.stop();
      };
    }
  }, [actions]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={2.4}
        position={[0, -2.4, 0]}
      />
    </group>
  );
}

function SpaceTeacher3D() {
  return (
    <div className="space-teacher-3d">
      <Canvas
        camera={{
          position: [0, 0.2, 7],
          fov: 35,
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[3, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-3, 2, 2]}
          intensity={1.5}
        />

        <AstronautModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload(
  `${import.meta.env.BASE_URL}models/space-teacher.glb`
);

export default SpaceTeacher3D;