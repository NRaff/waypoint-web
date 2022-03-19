import { Loader } from "@googlemaps/js-api-loader";
import { firebaseConfig } from "firebaseUtil/setup_firebase";

export const MapLoader = new Loader({
  apiKey: firebaseConfig.apiKey,
  version: 'weekly',
})

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