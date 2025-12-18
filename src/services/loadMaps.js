import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export const loadMaps = async () => {
  setOptions({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "beta",               // needed for new Places API
    libraries: ["places", "geometry"],
    language: "en",
  });

  await importLibrary("places");
  await importLibrary("maps");
  await importLibrary("geometry");
};