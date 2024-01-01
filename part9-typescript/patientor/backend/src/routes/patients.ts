import express from "express";
import patientServices from "../services/patientServices";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
  const body = req.body;

  const addedPatient = patientServices.create(body);

  res.send(addedPatient);
});

export default patientRouter;
