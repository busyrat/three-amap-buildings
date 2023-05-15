// import React, { useEffect, useRef, useState, version } from 'react'
// import { Canvas, useFrame, createRoot } from '@react-three/fiber'
import { APILoader, Map } from '@uiw/react-amap';
import { B3 } from './components/B3'
import { B2 } from './components/B2'
// import { Box } from './components/Box'
import { Buildings } from './components/Buildings'
// import { Road } from './components/Road'
// import { ThreeLayer } from './components/ThreeLayer'
// import { GLTF } from './components/GLTF';
import { AMapThreeLayer } from './components/AMapThreeLayer';
import { AMapThreeLayer2 } from './components/AMapThreeLayer2';
import { AMap } from './components/AMap';
import { AMapGltf } from './components/AMapGltf';
import POS from './const'

function App() {
  const center = POS.bigui // 碧桂园
  return (
    <>
      <AMap center={center}>
        <B3 />
        <AMapThreeLayer />
        <Buildings min={0} area={[
          [114.48,30.56],
          [114.52,30.56],
          [114.51,30.54],
          [114.49,30.55]
        ]} />
      </AMap>
    </>
  )
}

function App2() {
  const center = [114.50170, 30.55495] // b3
  return (
    <>
      <APILoader 
        version="2.0" 
        akey="a45ba17570f967ab89704da0cc5fb7de"
        Loca={{ version: '2.0.0' }}
        plugins={['Map3D', 'AMap.DistrictSearch', 'AMap.Object3DLayer', 'AMap.LineSearch', 'AMap.StationSearch']}
      >
        <Map
          style={{ height: '800px' }} 
          center={center} viewMode="3D" pitch={64} zoom={17} 
          mapStyle={'amap://styles/ef7e45a7c4ab54934a4f23f9f7717d0f'}
          showBuildingBlock={false}
        >
          <B2 />
          {/* <Buildings min={0} area={[
            [114.48,30.56],
            [114.52,30.56],
            [114.51,30.54],
            [114.49,30.55]
          ]} /> */}
          {/* <Road type="城市主干道" /> */}
          <AMapThreeLayer2></AMapThreeLayer2>
        </Map>
      </APILoader>
    </>
  )
}

export default App
