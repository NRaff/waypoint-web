import { Loader } from "@googlemaps/js-api-loader";
import { firebaseConfig } from "firebaseUtil/setup_firebase";

export const MapLoader = new Loader({
  apiKey: firebaseConfig.apiKey,
  version: 'weekly',
})
