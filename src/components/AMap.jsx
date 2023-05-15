import { useContext, useEffect, useRef, createContext, useReducer } from "react";
import AMapLoader from '@amap/amap-jsapi-loader';

export const initialState = {
  map: undefined,
  AMap: undefined,
  Loca: undefined,
  container: undefined,
}

export const reducer = (state, action) => {
  return {
    ...state,
    ...action,
  };
}

export const Context = createContext({
  state: initialState,
  dispatch: () => null,
});

export function useMapContext() {
  const { state, dispatch } = useContext(Context);
  return { ...state, state, dispatch };
}

export function AMap ({ center, children }) {
  const AMapRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AMapLoader.load({
      "key": "a45ba17570f967ab89704da0cc5fb7de",              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],
      "Loca": {                // 是否加载 Loca， 缺省不加载
        "version": '2.0.0'  // Loca 版本，缺省 1.3.2
      },
    }).then((AMap) => {
      const Loca = window.Loca
      const map = new AMap.Map(AMapRef.current, {
        center: center,
        viewMode: '3D',
        pitch: 72,
        rotation: -40,
        mapStyle: 'amap://styles/ef7e45a7c4ab54934a4f23f9f7717d0f',
        layers: [],
        zoom: 18.32,
        showBuildingBlock: false
      });

      dispatch({ map, container: AMapRef.current, AMap, Loca });
    })
  }, [AMapRef])

  return <Context.Provider value={{ ...state, state, dispatch }}>
    <div ref={AMapRef} style={{ height: '900px' }}></div>
    { children }
  </Context.Provider>
}