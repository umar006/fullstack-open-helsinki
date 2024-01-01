export interface DiagnosisData {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = "male" | "female" | "other";

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
