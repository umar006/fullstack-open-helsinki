import { ElementRef, useEffect, useRef, useState } from "react";
import diaryServices from "./services/diaryServices";
import Diary from "./components/Diary";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
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

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleVisibility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibility(event.target.value);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form>
        <label htmlFor="date">date </label>
        <input value={date} onChange={handleDate} name="date" type="date" />
        <br />
        <label htmlFor="visibility">visibility </label>
        <select onChange={handleVisibility} name="visibility">
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
