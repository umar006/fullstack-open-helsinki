interface ResultExercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): ResultExercise => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((eh) => eh).length;
  const average =
    exerciseHours.reduce((result, currVal) => {
      return result + currVal;
    }, 0) / 7;
  const success = average > target;
  const rating = Math.ceil(average);
  let ratingDescription: string;
  if (rating <= 1) ratingDescription = "bad";
  else if (rating === 2) ratingDescription = "not bad";
  else if (rating > 2) ratingDescription = "good";

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target,
  };
};

const exerciseHours = process.argv[2].split(",").map(Number);
const target = Number(process.argv[3]);

console.log(calculateExercises(exerciseHours, target));
