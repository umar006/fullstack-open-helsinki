import express from "express";
import patientServices from "../services/patientServices";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

export default patientRouter;
