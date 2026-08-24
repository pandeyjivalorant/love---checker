import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import HeartOrb from './HeartOrb';

const Scene = ({ viewState }) => {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FF2D55" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <HeartOrb viewState={viewState} />
        </Float>

        <Environment preset="city" />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;
