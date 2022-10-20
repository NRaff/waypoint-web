import { ACCESS_TOKEN } from "config/mapbox_config";
import mapboxgl, { GeolocateControl } from 'mapbox-gl';

export const initMapBoxWithHandler = (
  mapId: string,
  handler: Function
) => {
  mapboxgl.accessToken = ACCESS_TOKEN
  const map = new mapboxgl.Map({
    container: mapId,
    style: 'mapbox://styles/nraff/cl17db9sb003t15un9s3npd3o',
    // TODO: add a users set location to their user defaults
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
      maxDuration: 2
    },
    positionOptions: {
      enableHighAccuracy: true
    },
  })
  map.addControl(control)
  map.on('click', (ev) => handler(ev))
  return map
}