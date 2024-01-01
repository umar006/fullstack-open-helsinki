import { NewPatient } from "./types";

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
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    ssn: data.ssn,
    occupation: data.occupation,
  };

  return newPatient;
};
