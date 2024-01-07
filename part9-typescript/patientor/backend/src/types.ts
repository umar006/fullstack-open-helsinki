export interface DiagnosisData {
  code: string;
  name: string;
  latin?: string;
}

export const GENDER = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

type GenderKey = keyof typeof GENDER;

export type Gender = (typeof GENDER)[GenderKey];

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnosisData["code"][];
}

interface Discharge {
  date: string;
  criteria: string;
}

interface EntryHospital extends EntryBase {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface EntryOccupationalHealthCare extends EntryBase {
  type: "OccupationalHealthcare",
  employerName: string;
  sickLeave?: SickLeave;
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}
