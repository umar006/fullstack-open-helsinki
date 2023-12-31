const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;

  const bmi = weight / (heightInMeter * heightInMeter);

  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
  if (bmi >= 25 && bmi < 30) return "Overweight";

  return "Obese";
};

export default calculateBmi;
