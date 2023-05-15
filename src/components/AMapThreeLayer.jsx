import { useEffect, useState, Children, cloneElement, isValidElement, Fragment } from "react";
import { AmbientLight } from 'three'
import { ThreeLayer, ThreeGltf } from '../three-layer/src/'
import { useMapContext } from './AMap'
import POS from '../const'

export function AMapThreeLayer ({ children }) {
  const { map } = useMapContext()
  const [layer, setLayer] = useState()

  const childs = Children.toArray(children)

  useEffect(() => {
    if (!map) return

    // 数据转换工具
    const customCoords = map.customCoords
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    const positions = customCoords.lngLatsToCoords([POS.mockCenter])
    console.log(positions);

    
    const threeLayer = new ThreeLayer(map)
    threeLayer.on('complete', () => {
      setLayer(threeLayer)
      
      const light = new AmbientLight('#ffffff', 1);
      threeLayer.add(light)

      const threeGltf = new ThreeGltf(threeLayer, {
        // url: 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
        url: '/crane.glb',
        position: [0, 0],
        scale: 70,
        rotation: { x:90, y:0, z:0 },
        onLoaded(object) {
          // 位置计算错误，修正
          object.position.set(...positions[0], -40)
          console.log('ThreeGltf', object);
        }
      })

    })
  }, [map])


  return (<Fragment>
    {
      layer && childs.map((child, key) => {
        if (!isValidElement(child)) return null;
        if (typeof child === 'string') {
          return cloneElement(<Fragment>{child}</Fragment>, { key });
        }
        if (child.type && typeof child.type === 'string') {
          return cloneElement(child, { key });
        }
        return cloneElement(child, {
          ...child.props,
          layer
        });
      })
    }
  </Fragment>)
}