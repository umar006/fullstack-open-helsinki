import { GENDER, Gender, NewEntry, NewPatient } from "./types";

export const toNewPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const nameExist = "name" in data;
  const dateOfBirthExist = "dateOfBirth" in data;
  const genderExist = "gender" in data;
  const ssnExist = "ssn" in data;
  const occupationExist = "occupation" in data;
  if (!nameExist || !dateOfBirthExist || !genderExist || !ssnExist || !occupationExist) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newPatient: NewPatient = {
    name: parsePatientName(data.name),
    dateOfBirth: parseDate(data.dateOfBirth),
    gender: parsePatientGender(data.gender),
    ssn: parsePatientSsn(data.ssn),
    occupation: parsePatientOccupation(data.occupation),
  };

  return newPatient;
};

export const toNewEntry = (data: unknown): NewEntry => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const descExist = "description" in data;
  const dateExist = "date" in data;
  const specialistExist = "specialist" in data;
  const diagnosisCodesExist = "diagnosisCodes" in data;
  const typeExist = "type" in data;
  if (!descExist || !dateExist || !specialistExist || !diagnosisCodesExist || !typeExist) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newEntry: NewEntry = {
    description: data.description,
    date: parseDate(data.date),
    specialist: data.specialist,
    diagnosisCodes: data.diagnosisCodes,
    type: data.type,
  };

  return newEntry;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isEmptyString = (text: string): boolean => {
  return text.length === 0;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parsePatientName = (name: unknown): string => {
  if (!isString(name) || isEmptyString(name)) {
    throw new Error("Incorrect patient name");
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || isEmptyString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }

  return date;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(GENDER).map((gender) => gender.toString()).includes(gender);
};

const parsePatientGender = (gender: unknown): Gender => {
  if (!isString(gender) || isEmptyString(gender) || !isGender(gender)) {
    throw new Error("Incorrect patient gender");
  }

  return gender;
};

const parsePatientSsn = (ssn: unknown): string => {
  if (!isString(ssn) || isEmptyString(ssn)) {
    throw new Error("Incorrect patient ssn");
  }

  return ssn;
};

const parsePatientOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || isEmptyString(occupation)) {
    throw new Error("Incorrect patient occupation");
  }

  return occupation;
};
