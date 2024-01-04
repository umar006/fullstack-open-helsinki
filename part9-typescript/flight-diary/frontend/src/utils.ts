import { NewDiary, VISIBILITY, Visibility, WEATHER, Weather } from "./types";

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

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }

  return date;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisiblity(visibility)) {
    throw new Error("Incorrect visibility");
  }

  return visibility;
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect weather");
  }

  return weather;
};

export const toNewDiary = (diary: unknown): NewDiary => {
  if (!diary || typeof diary !== "object") throw new Error("Missing diary");

  const checkDate = "date" in diary;
  const checkVisibility = "visibility" in diary;
  const checkWeather = "weather" in diary;
  const checkComment = "comment" in diary;
  if (!checkDate || !checkVisibility || !checkWeather || !checkComment) {
    throw new Error("Missing some diary");
  }

  const newDiary: NewDiary = {
    date: parseDate(diary.date),
    visibility: parseVisibility(diary.visibility),
    weather: parseWeather(diary.weather),
    comment: diary.comment,
  };

  return newDiary;
};
