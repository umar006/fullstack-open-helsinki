export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis["code"][];
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
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

const HEALTH_CHECK_RATING = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  (typeof HEALTH_CHECK_RATING)[keyof typeof HEALTH_CHECK_RATING];

interface EntryHealthCheck extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | EntryHospital
  | EntryOccupationalHealthCare
  | EntryHealthCheck;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
