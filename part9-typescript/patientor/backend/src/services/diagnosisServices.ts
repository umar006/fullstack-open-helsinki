import diagnosesData from "../../data/diagnoses";
import { DiagnosisData } from "../types";

const diagnoses: DiagnosisData[] = diagnosesData;

const getAll = (): DiagnosisData[] => {
  return diagnoses;
};

export default { getAll };
