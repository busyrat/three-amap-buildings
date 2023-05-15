import { useEffect } from "react"
import { ThreeLayer, ThreeGltf } from '../three-layer/src/'
import { useMapContext } from './AMap'

export function AMapGltf({ layer }) {
  const { map } = useMapContext()

  useEffect(() => {
    if (!layer) return

    // 数据转换工具
    const customCoords = map.customCoords
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    const positions = customCoords.lngLatsToCoords([[114.501707, 30.554956]])
    console.log(positions);
    
    const threeGltf = new ThreeGltf(layer, {
      // url: 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
      url: '/crane.glb',
      position: [114.501707, 30.554956],
      scale: 100,
      rotation: { x:90, y:0, z:0 },
      onLoaded(object) {
        // 位置计算错误，修正
        object.position.set(...positions[0])
        console.log('ThreeGltf', object);
      }
    })
  }, [layer])

  return
}