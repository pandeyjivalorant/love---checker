import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeartOrb = () => {
  const heartRef = useRef();

  const heartGeometry = useMemo(() => {
    const x = 0, y = 0;
    const shape = new THREE.Shape();
    shape.moveTo( x + 5, y + 5 );
    shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const extrudeSettings = {
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 1.5,
      bevelThickness: 1.5,
      curveSegments: 32,
    };
    
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    // Rotate so the tip points down
    geo.rotateZ(Math.PI);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (heartRef.current) {
      // Gentle floating and subtle rotation
      heartRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
      heartRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
      heartRef.current.position.y = Math.sin(t * 1) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -1]}>
      {/* 3D Premium Heart */}
      <mesh ref={heartRef} geometry={heartGeometry} scale={0.12}>
        <meshPhysicalMaterial
          color="#FF2D55"
          emissive="#3a0010"
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Soft Glow */}
      <pointLight color="#FF2D55" intensity={1} distance={6} position={[0, 0, 1]} />
      <pointLight color="#FF4F81" intensity={0.5} distance={4} position={[0, -2, -1]} />
    </group>
  );
};

export default HeartOrb;
