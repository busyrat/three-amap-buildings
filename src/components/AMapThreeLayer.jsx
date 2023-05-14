import { useEffect } from "react";
import { useMapContext } from '@uiw/react-amap'
import { AmbientLight } from 'three'
import {ThreeLayer, ThreeGltf} from '@amap/three-layer'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function AMapThreeLayer ({ map, children }) {
  useEffect(() => {
    if (!map) return
    console.log(map);
    const layer = new ThreeLayer(map)
    layer.on('complete', () => {
      const light = new AmbientLight('#ffffff', 1);
      layer.add(light)
      // const threeGltf = new ThreeGltf(layer, {
      //   url: 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
      //   position: [[114.501707, 30.554956]],
      //   scale: 100,
      //   rotation: { x:90, y:0, z:0 },
      //   onLoaded(object) {
      //     // object.children[0].scale.set(1, 1, 1)
      //     object.position.set(0, 0, 0)
      //   }
      // })

      // console.log(layer, gltf)
      const loader = new GLTFLoader();
      // 数据转换工具
      const customCoords = map.customCoords
      // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
      const positions = customCoords.lngLatsToCoords([[114.501707, 30.554956]])
    
      // // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      // const dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
      // loader.setDRACOLoader( dracoLoader );
    
      // Load a glTF resource
      loader.load(
        // resource URL
        'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
        // '/crane.glb',
        // called when the resource is loaded
        function ( gltf ) {
          for (let i = 0; i < positions.length; i++) {
            const d = positions[i];
            console.log(d);
            layer.add( gltf.scene );
            gltf.scene.position.setX(d[0]);
            gltf.scene.position.setY(d[1]);
            gltf.scene.rotation.set(Math.PI / 2, 0, 0);
            gltf.scene.children[0].scale.set(1, 1, 1);
          }
        }
      )
    })
  }, [map])
  return children
}