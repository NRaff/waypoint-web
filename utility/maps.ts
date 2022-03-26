import { Loader } from "@googlemaps/js-api-loader";
import { ACCESS_TOKEN } from "config/mapbox_config";
import { firebaseConfig } from "config/setup_firebase";
import mapboxgl from 'mapbox-gl';

export const MapLoader = new Loader({
  apiKey: firebaseConfig.apiKey,
  version: 'weekly',
})

export const initMapBox = (
  mapId: string,
) => {
  mapboxgl.accessToken = ACCESS_TOKEN
  const map = new mapboxgl.Map({
    container: mapId,
    style: 'mapbox://styles/nraff/cl17db9sb003t15un9s3npd3o',
    center: [150.644, -34.397],
    zoom: 9,
    keyboard: true,
    optimizeForTerrain: true,
    touchZoomRotate: true,
  })
}

export const initMapWithHandler = (
  mapId: string,
  event: string,
  callback: Function,
) => {
  MapLoader.load().then(() => {
    const map = new google.maps.Map(document.getElementById(mapId) as HTMLElement, {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8,
      streetViewControl: false,
      disableDoubleClickZoom: true,
      fullscreenControl: false,
      zoomControl: true,
    })
    map.addListener(event, callback)
  })
}

export const initMapWithHandlerAsync = async (
  mapId: string,
  event: string,
  callback: Function,
) => {
  const google = await MapLoader.load()
  const map = new google.maps.Map(document.getElementById(mapId) as HTMLElement, {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 8,
    streetViewControl: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    zoomControl: true,
  })
  map.addListener(event, callback)
  return map
}