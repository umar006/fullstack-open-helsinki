import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientServices.create(newPatient);

    res.send(addedPatient);
  } catch(error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
