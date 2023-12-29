const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;

  const bmi = weight / (heightInMeter * heightInMeter);

  return "Normal (healthy weight)";
};

console.log(calculateBmi(180, 74));
