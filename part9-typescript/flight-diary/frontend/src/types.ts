export const WEATHER = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof WEATHER)[keyof typeof WEATHER];

export const VISIBILITY = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof VISIBILITY)[keyof typeof VISIBILITY];

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;
