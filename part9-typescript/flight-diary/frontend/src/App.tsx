import { useEffect, useState } from "react";
import diaryServices from "./services/diaryServices";
import Diary from "./components/Diary";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

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

  return (
    <div>
      <h2>Diary entries</h2>
      {diaryList}
    </div>
  );
}

export default App;
