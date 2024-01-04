import { VISIBILITY, Visibility, WEATHER, Weather } from "./types";

export const isVisiblity = (visibility: string): visibility is Visibility => {
  return Object.values(VISIBILITY)
    .map((visibility) => visibility.toString())
    .includes(visibility);
};
export const isWeather = (weather: string): weather is Weather => {
  return Object.values(WEATHER)
    .map((weather) => weather.toString())
    .includes(weather);
};
