import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);

  const addedPatient = patientServices.create(newPatient);

  res.send(addedPatient);
});

export default patientRouter;
