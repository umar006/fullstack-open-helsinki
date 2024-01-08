import express from "express";
import patientServices from "../services/patientServices";
import { NewEntry } from "../types";
import { toNewEntry, toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

patientRouter.get("/:id", (req, res) => {
  const patientId = req.params.id;
  const patient = patientServices.getOne(patientId);
  if (!patient) {
    res.status(422).send("Patient not found");
  }

  res.send(patient);
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

patientRouter.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;
  const newEntry = toNewEntry(req.body);

  const addedEntry = patientServices.createEntry(patientId, newEntry);

  res.send(addedEntry);
});

export default patientRouter;
