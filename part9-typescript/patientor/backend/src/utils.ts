import { GENDER, Gender, NewPatient } from "./types";

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
    dateOfBirth: parsePatientDateOfBirth(data.dateOfBirth),
    gender: parsePatientGender(data.gender),
    ssn: data.ssn,
    occupation: data.occupation,
  };

  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parsePatientName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect patient name");
  }

  return name;
};

const parsePatientDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect patient date of birth");
  }

  return date;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(GENDER).map(toString).includes(gender);
};

const parsePatientGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect patient gender");
  }

  return gender;
};
