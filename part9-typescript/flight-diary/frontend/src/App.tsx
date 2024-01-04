import { ElementRef, useEffect, useRef, useState } from "react";
import Diary from "./components/Diary";
import diaryServices from "./services/diaryServices";
import { VISIBILITY, Visibility, WEATHER, Weather } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const dateRef = useRef<ElementRef<"input">>(null);
  const visibilityRef = useRef<ElementRef<"select">>(null);
  const weatherRef = useRef<ElementRef<"select">>(null);
  const commentRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaryList = await diaryServices.getAll();

      setDiaries(diaryList);
    };

    fetchDiaries().catch((e) => console.error(e));
  }, []);

  const diaryList = diaries.map((diary) => (
    <Diary key={diary.id} diary={diary} />
  ));

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const date = dateRef.current?.value;
    const visibility = visibilityRef.current?.value;
    const weather = weatherRef.current?.value;
    const comment = commentRef.current?.value;
    if (!date || !visibility || !weather || !comment) {
      return;
    }

    const isVisiblity = (visibility: string): visibility is Visibility => {
      return Object.values(VISIBILITY)
        .map((visibility) => visibility.toString())
        .includes(visibility);
    };
    const isWeather = (weather: string): weather is Weather => {
      return Object.values(WEATHER)
        .map((weather) => weather.toString())
        .includes(weather);
    };
    if (!isVisiblity(visibility) || !isWeather(weather)) {
      return;
    }

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };
    const addedDiary = await diaryServices.create(newDiary);

    setDiaries((currVal) => currVal.concat(addedDiary));
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <label htmlFor="date">date </label>
        <input ref={dateRef} name="date" type="date" />
        <br />
        <label htmlFor="visibility">visibility </label>
        <select ref={visibilityRef} name="visibility">
          <option value="">Choose a visibility</option>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">Ok</option>
          <option value="poor">Poor</option>
        </select>
        <br />
        <label htmlFor="weather">weather </label>
        <select ref={weatherRef} name="weather">
          <option value="">Choose a weather</option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
        <br />
        <label htmlFor="comment">comment </label>
        <input ref={commentRef} name="comment" />
        <br />
        <button>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaryList}
    </div>
  );
}

export default App;
