import { type Diary } from "../types";

interface DiaryProps {
  diary: Diary;
}

const Diary = ({ diary }: DiaryProps): JSX.Element => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

export default Diary;
