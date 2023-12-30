import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let { height: rawHeight, weight: rawWeight } = req.query;

  const height = Number(rawHeight);
  const weight = Number(rawWeight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const bmiResult = calculateBmi(Number(height), Number(weight));

  res.send({
    height,
    weight,
    bmi: bmiResult,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
