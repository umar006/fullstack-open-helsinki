import patientsData from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientsData;

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation } ) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getOne = (patientId: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === patientId );
  if (patient && !patient.entries) {
    patient.entries = [];
  }

  return patient;
};

const create = (data: NewPatient): Patient => {
  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...data,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getAllNonSensitivePatients, getOne, create };
