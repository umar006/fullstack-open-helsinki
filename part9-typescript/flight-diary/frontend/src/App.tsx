import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryServices from "./services/diaryServices";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesList = await diaryServices.getAll();

      setDiaries(diariesList);
    };

    fetchDiaries().catch((e) => console.error(e));
  }, []);

  console.log(diaries);

  return <h1>Hello bro</h1>;
}

export default App;
