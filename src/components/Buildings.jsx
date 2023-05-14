import gcoord from 'gcoord'
import { geojson } from '../../public/wuhan2'
gcoord.transform(geojson, gcoord.WGS84, gcoord.GCJ02);
import { useMapContext } from '@uiw/react-amap'
import booleanContains from '@turf/boolean-contains'

export function Buildings({ min, area }) {
  const { map } = useMapContext()
  const Loca = window.Loca
  if (!Loca || !map) return null

  const geojsonData = {
    "type": "FeatureCollection", 
    "features": geojson.features.filter(feature => feature.properties.Elevation >= min)
  }

  if (area) {
    const areaGeoJSON = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [area]
      }
    }
    geojsonData.features = geojsonData.features.filter(feature => booleanContains(areaGeoJSON, feature))
  }

  const loca = new Loca.Container({ map });

  // 创建圆点图层
  const polygonLayer = new Loca.PolygonLayer({
    loca,
    zooms: [0, 50],
    zIndex: 10000000000,
    opacity: 1,
    visible: true,
    acceptLight: true,
    shininess: 10,
    hasSide: true
  });
  // 创建数据源
  const dataSource = new Loca.GeoJSONSource({ data: geojsonData });

  // 图层添加数据
  polygonLayer.setSource(dataSource);

  // 设置样式
  polygonLayer.setStyle({
    visible: true,
    topColor: 'rgba(27, 63, 138, 0.9)',
    sideTopColor: 'rgba(27, 63, 138, 0.4)',
    sideBottomColor : 'rgba(27, 63, 138, 0.4)',
    unit: 'meter',
    height: function (index, feature) {
      return feature.properties.Elevation
    },
    textureSize: function(index, feature) {
      const size = feature.properties.Elevation
      return [size, size]
    },
  })
}
