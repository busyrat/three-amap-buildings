// 模型数据geoJSONSource
// 备注：只需要一个形成闭合的经纬度列表coordinates，通过起始位置altitude + 高度height，即可绘制一层楼，多层楼只是通过设置起始位置和高度，一层一层拼起来的
// 参考文档：https://lbs.amap.com/demo/loca-v2/demos/cat-polygon/hz-gn
export const mock = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        title: "第1层",
        height: 50, // 层高
        altitude: 0, //
        status: 1, // 0 未完成, 1 已完成, 2 建设中
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.49484025938, 30.555452380806],
            [114.49529839519, 30.555235416914],
            [114.49510076798, 30.554884936053],
            [114.49460669995, 30.554951694381],
            [114.49459771689, 30.555285485535],
            [114.49459771689, 30.555285485535],
            [114.49484025938, 30.555452380806],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "楼板",
        type: "cell",
        height: 2, // 层高
        altitude: 50, //
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.49484025938, 30.555452380806],
            [114.49529839519, 30.555235416914],
            [114.49510076798, 30.554884936053],
            [114.49460669995, 30.554951694381],
            [114.49459771689, 30.555285485535],
            [114.49459771689, 30.555285485535],
            [114.49484025938, 30.555452380806],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "第2层",
        height: 50, // 层高
        altitude: 52, //
        status: 2, // 0 未完成, 1 已完成, 2 建设中
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.49484025938, 30.555452380806],
            [114.49529839519, 30.555235416914],
            [114.49510076798, 30.554884936053],
            [114.49460669995, 30.554951694381],
            [114.49459771689, 30.555285485535],
            [114.49459771689, 30.555285485535],
            [114.49484025938, 30.555452380806],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "楼板",
        type: "cell",
        height: 2, // 层高
        altitude: 102, //
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.49484025938, 30.555452380806],
            [114.49529839519, 30.555235416914],
            [114.49510076798, 30.554884936053],
            [114.49460669995, 30.554951694381],
            [114.49459771689, 30.555285485535],
            [114.49459771689, 30.555285485535],
            [114.49484025938, 30.555452380806],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "第3层",
        height: 50, // 层高
        altitude: 104, //
        status: 0, // 0 未完成, 1 已完成, 2 建设中
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.49484025938, 30.555452380806],
            [114.49529839519, 30.555235416914],
            [114.49510076798, 30.554884936053],
            [114.49460669995, 30.554951694381],
            [114.49459771689, 30.555285485535],
            [114.49459771689, 30.555285485535],
            [114.49484025938, 30.555452380806],
          ],
        ],
      },
    },
  ],
};