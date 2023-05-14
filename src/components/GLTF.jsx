import * as THREE from 'three'
import { useMapContext } from '@uiw/react-amap'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useEffect } from 'react'

export function GLTF({ scene, position }) {
  const { map } = useMapContext()
  // Instantiate a loader
  useEffect(() => {
    if (!map || !scene) return
    const loader = new GLTFLoader();
    // 数据转换工具
    const customCoords = map.customCoords
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    const positions = customCoords.lngLatsToCoords(position)
  
    // // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    // loader.setDRACOLoader( dracoLoader );
  
    // Load a glTF resource
    loader.load(
      // resource URL
      // 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
      '/crane.glb',
      // called when the resource is loaded
      function ( gltf ) {
        for (let i = 0; i < positions.length; i++) {
          const d = positions[i];
          gltf.scene.position.set(d[0], d[1], 10);
          gltf.scene.rotation.set(Math.PI / 2, 0, 0);
          gltf.scene.children[0].scale.set(10, 10, 10);
          scene.add( gltf.scene );
        }
      }
    )
  }, [map, scene])
}