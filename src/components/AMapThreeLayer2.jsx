import { useEffect } from "react";
import { useMapContext } from '@uiw/react-amap'
import { AmbientLight } from 'three'
// import {ThreeLayer, ThreeGltf} from '@amap/three-layer/src'
import {ThreeLayer, ThreeGltf} from '../three-layer/src/'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from 'three'

export function AMapThreeLayer2 ({ children }) {
  const { map, AMap } = useMapContext()
  useEffect(() => {
    if (!map) return

    // 数据转换工具
    const customCoords = map.customCoords
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    const positions = customCoords.lngLatsToCoords([[114.501707, 30.554956]])

    let meshes = []

    const data = customCoords.lngLatsToCoords([
      [114.501707, 30.554956]
    ]);

    console.log(
      new AMap.LngLat(114.501707, 30.554956)
    );

    console.log(positions[0])
    console.log(data);

    const layer = new ThreeLayer(map, {
      // customCoordsCenter: [114.501707, 30.554956]
    })
    layer.on('complete', () => {
      const light = new AmbientLight('#ffffff', 1);
      layer.add(light)

      var texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
      texture.minFilter = THREE.LinearFilter;
      //  这里可以使用 three 的各种材质
      var mat = new THREE.MeshPhongMaterial({
          color: 0xfff0f0,
          depthTest: true,
          transparent: true,
          map: texture,
      });
      var geo = new THREE.BoxBufferGeometry(100, 100, 100);
      for (let i = 0; i < data.length; i++) {
          const d = data[i];
          var mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(d[0], d[1], 300);
          meshes.push({
              mesh,
              count: i,
          });
          layer.add(mesh);
      }

      const threeGltf = new ThreeGltf(layer, {
        url: 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
        position: [114.501707, 30.554956],
        scale: 100,
        rotation: { x:90, y:0, z:0 },
        onLoaded(object) {
          // object.children[0].scale.set(1, 1, 1)
          // object.position.set(0, 0, 0)
          console.log('ThreeGltf', object);
        }
      })

      // console.log(layer, gltf)
      const loader = new GLTFLoader();

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
            // layer.add( gltf.scene );
            gltf.scene.scale.set(100, 100, 100);
            layer.update()
            gltf.scene.rotation.set(Math.PI / 2, 0, 0);
            layer.update()
            gltf.scene.position.setX(d[0]);
            gltf.scene.position.setY(d[1]);
            layer.update()
            console.log('THREE', gltf.scene);
          }
        }
      )
    })
  }, [map])
  return children
}