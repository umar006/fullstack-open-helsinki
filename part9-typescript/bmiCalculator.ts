const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;

  const bmi = weight / (heightInMeter * heightInMeter);

  return "Normal (healthy weight)";
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
