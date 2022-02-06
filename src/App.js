import { useRef, useState } from 'react'
import './App.scss'

import { Canvas, useFrame } from 'react-three-fiber'
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from '@react-three/drei'

import { useSpring, animated } from '@react-spring/three'

softShadows()

const SpinningMesh = ({ position, args, color }) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  const [isAnimated, setIsAnimated] = useState(false)

  const props = useSpring({
    scale: isAnimated ? [1.3, 1.3, 1.3] : [1, 1, 1],
  })
  return (
    <animated.mesh
      onClick={() => setIsAnimated(!isAnimated)}
      scale={props.scale}
      castShadow
      ref={mesh}
      position={position}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={1}
        factor={0.6}
      />
    </animated.mesh>
  )
}

function App() {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-50}
        />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.2} />
          </mesh>
        </group>

        <SpinningMesh position={[0, 1, 0]} args={[3, 2, 2]} color="lightblue" />
        <SpinningMesh position={[-4, 1, -1]} color="pink" />
        <SpinningMesh position={[5, 1, -2]} color="pink" />

        <OrbitControls />
      </Canvas>
      <div>Hello</div>
    </>
  )
}

export default App
