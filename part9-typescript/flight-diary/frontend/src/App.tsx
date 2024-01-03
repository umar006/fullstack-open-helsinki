import axios from "axios";
import { useEffect, useState } from "react";
import { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await axios.get<Diary[]>(
        "http://localhost:3000/api/diaries",
      );
      const diariesList = response.data;
      setDiaries(diariesList);
    };

    fetchDiaries().catch((e) => console.error(e));
  }, []);

  console.log(diaries);

  return <h1>Hello bro</h1>;
}

export default App;
