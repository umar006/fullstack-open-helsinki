const WEATHER = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

type Weather = (typeof WEATHER)[keyof typeof WEATHER];

const VISIBILITY = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

type Visibility = (typeof VISIBILITY)[keyof typeof VISIBILITY];

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;
