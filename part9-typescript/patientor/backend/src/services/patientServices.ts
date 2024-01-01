import patientsData from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientsData;

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation } ) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const create = (data: NewPatient): Patient => {
  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...data,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getAllNonSensitivePatients, create };
