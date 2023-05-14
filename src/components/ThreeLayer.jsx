import { useMapContext } from '@uiw/react-amap'
import { Children, cloneElement, isValidElement, Fragment, useEffect, useState } from 'react'
import * as THREE from 'three'



export function ThreeLayer ({ children }) {
  const { map, AMap } = useMapContext()
  const [scene, setScene] = useState()

  useEffect(() => {
    if (!map || !scene) return
    const customCoords = map.customCoords;
    let renderer
    let camera
    new AMap.GLCustomLayer({
      map,
      // 图层的层级
      zIndex: 100000,
      // 初始化的操作，创建图层过程中执行一次。
      init: (gl) => {
        setScene(new THREE.Scene())
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30)
        const renderer = new THREE.WebGLRenderer({
          context: gl,  // 地图的 gl 上下文
          // alpha: true,
          // antialias: true,
          // canvas: gl.canvas,
        })
        // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
        renderer.autoClear = false;
  
        // 环境光照和平行光
        // var aLight = new THREE.AmbientLight(0xffffff, 0.3);
        // var dLight = new THREE.DirectionalLight(0xffffff, 1);
        // dLight.position.set(-1000, 100, 900);
        // scene.add(dLight);
        // scene.add(aLight);
      },
      render: () => {
        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
        renderer.resetState();
  
        const { near, far, fov, up, lookAt, position } = customCoords.getCameraParams();
        // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
        camera.near = near;
        camera.far = far;
        camera.fov = fov;
        camera.position.set(...position);
        camera.up.set(...up);
        camera.lookAt(...lookAt);
        camera.updateProjectionMatrix();
  
        renderer.render(scene, camera);
        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
        renderer.resetState();
      },
    })
  }, [map])

  return children({ scene })

}