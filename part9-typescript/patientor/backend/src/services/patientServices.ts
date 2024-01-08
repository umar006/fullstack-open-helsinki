import patientsData from "../../data/patients";
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";

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

const createEntry = (patientId: string, data: NewEntry): Entry => {
  const newEntry: Entry = {
    id: crypto.randomUUID(),
    ...data,
  };

  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) throw new Error("Patient Not Found");

  if (!patient.entries) {
    patient.entries = [];
  }
  patient.entries.push(newEntry);

  return newEntry;
};

export default { getAllNonSensitivePatients, getOne, create, createEntry };
