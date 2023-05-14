import { roadJSON } from '../../public/whroad2'
import { useMapContext } from '@uiw/react-amap'

export function Road({ type }) {
  const { map } = useMapContext()
  const Loca = window.Loca
  if (!Loca || !map) return null

  const mainRoad = {
    "type": "FeatureCollection", 
    "features": roadJSON.features.filter(feature => feature.properties.type === type)
  }

  const roadSource = new Loca.GeoJSONSource({ data: mainRoad })

  const loca = new Loca.Container({ map })
  const lineLayer = new Loca.PulseLineLayer({
      loca,
      zIndex: 10,
      opacity: 1,
      visible: true,
      zooms: [2, 22],
  });
  

  const headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6'];

  lineLayer.setSource(roadSource);
  lineLayer.setStyle({
    altitude: 0,
    lineWidth: 2,
    visible: true,
    // 脉冲头颜色
    // headColor: (_, feature) => {
    //     return headColors[feature.properties.type - 1];
    // },
    // 脉冲尾颜色
    headColor: 'rgba(251, 232, 130, 1)',
    trailColor: 'rgba(255, 165,0,0)',
    // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
    interval: 1,
    // 脉冲线的速度，几秒钟跑完整段路
    duration: 2000,
  });
  loca.animate.start();
  return null
}