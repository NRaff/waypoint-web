import { Loader } from "@googlemaps/js-api-loader";
import { ACCESS_TOKEN } from "config/mapbox_config";
import { firebaseConfig } from "config/setup_firebase";
import mapboxgl, { GeolocateControl } from 'mapbox-gl';

export const MapLoader = new Loader({
  apiKey: firebaseConfig.apiKey,
  version: 'weekly',
})

export const initMapBoxWithHandler = (
  mapId: string,
  handler: Function
) => {
  mapboxgl.accessToken = ACCESS_TOKEN
  const map = new mapboxgl.Map({
    container: mapId,
    style: 'mapbox://styles/nraff/cl17db9sb003t15un9s3npd3o',
    center: [-122.4194, 37.7749],
    zoom: 9,
    keyboard: true,
    optimizeForTerrain: true,
    touchZoomRotate: true,
  })
  const control: GeolocateControl = new GeolocateControl({
    trackUserLocation: false,
    showAccuracyCircle: true,
    showUserLocation: true,
    fitBoundsOptions: {
      maxZoom: 15,
      maxDuration: 1
    },
    positionOptions: {
      enableHighAccuracy: true
    },
  })
  map.addControl(control)
  map.on('click', (ev) => handler(ev))
  return map
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