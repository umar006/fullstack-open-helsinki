import { NewPatient } from "./types";

export const toNewPatient = (data: unknown): NewPatient => {
  const newPatient: NewPatient = {
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    ssn: data.ssn,
    occupation: data.occupation,
  };

  return newPatient;
};
