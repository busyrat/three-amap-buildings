import { useMapContext } from '@uiw/react-amap'
import { useEffect } from 'react'

export function B2() {
  const { map } = useMapContext()

  function generateBuildingLayer() {
    // b3
    var areaPath = [
      [114.501503, 30.55527],
      [114.502168, 30.554947],
      [114.501948, 30.554577],
      [114.501245, 30.554887]
    ]

    // 楼块图层
    var buildingLayer = new AMap.Buildings({
      zooms: [0, 50],
      zIndex: 10,
    })
    buildingLayer.setStyle({
      hideWithoutStyle: true,
      areas: [{
        color1: 'rgba(255, 0, 0, 1)',
        color2: 'rgba(0, 255, 0, 1)',
        path: areaPath,
      }]
    })
    return buildingLayer
  }
  
  useEffect(() => {
    map && map.addLayer(generateBuildingLayer())
  }, [map])
}
