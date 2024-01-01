import express from "express";
import diagnosisServices from "../services/diagnosisServices";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.send(diagnosisServices.getAll());
});

export default diagnosisRouter;
