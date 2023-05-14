import React, { useEffect, useRef, useState, version } from 'react'
import { Canvas, useFrame, createRoot } from '@react-three/fiber'
import { APILoader, Map, Provider } from '@uiw/react-amap';
import { B3 } from './components/B3'
import { Box } from './components/Box'
import { Buildings } from './components/Buildings'
import { Road } from './components/Road'
import { ThreeLayer } from './components/ThreeLayer'
import { GLTF } from './components/GLTF';


function App() {
  const center = [114.501707, 30.554956] // b3
  return (
    <>
      <APILoader 
        version="2.0" 
        akey="a45ba17570f967ab89704da0cc5fb7de"
        Loca={{ version: '2.0.0' }}
        plugins={['Map3D', 'AMap.DistrictSearch', 'AMap.Object3DLayer', 'AMap.LineSearch', 'AMap.StationSearch']}
      >
        <Provider>
          <Map
            style={{ height: '800px' }} 
            center={center} viewMode="3D" pitch={64} zoom={17} 
            mapStyle={'amap://styles/ef7e45a7c4ab54934a4f23f9f7717d0f'}
            showBuildingBlock={false}
          >
            <B3 />
            <Buildings min={0} area={[
              [114.48,30.56],
              [114.52,30.56],
              [114.51,30.54],
              [114.49,30.55]
            ]} />
            <Road type="城市主干道" />
            <ThreeLayer>
              {
                (({ scene }) => scene && scene.add && <GLTF scene={scene} position={center}/>)
              }
              {/* {
                ({gl, map, camera, scene}) => {
                  if (!gl || !map) return
                  const customCoords = map.customCoords
                  const position = customCoords.lngLatsToCoords(center)
                  return <Canvas>
                    <ambientLight />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                  </Canvas>
                }
              } */}
            </ThreeLayer>
          </Map>
        </Provider>
      </APILoader>
    </>
  )
}

export default App
