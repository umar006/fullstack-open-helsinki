import patientsData from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientsData;

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation } ) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default { getAllNonSensitivePatients };
