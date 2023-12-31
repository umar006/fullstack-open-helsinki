import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height: rawHeight, weight: rawWeight } = req.query;

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

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  const isDailyExerArray = Array.isArray(daily_exercises);
  const isTargetStr = typeof target === "string";
  if (!isDailyExerArray || isTargetStr) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const exercisesResult = calculateExercises(daily_exercises, target);

  res.send(exercisesResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
