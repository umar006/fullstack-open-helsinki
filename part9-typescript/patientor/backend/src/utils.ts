import diagnosesData from "../data/diagnoses";
import {
  Diagnosis,
  Discharge,
  GENDER,
  Gender,
  HEALTH_CHECK_RATING,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

export const toNewPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const nameExist = "name" in data;
  const dateOfBirthExist = "dateOfBirth" in data;
  const genderExist = "gender" in data;
  const ssnExist = "ssn" in data;
  const occupationExist = "occupation" in data;
  if (
    !nameExist ||
    !dateOfBirthExist ||
    !genderExist ||
    !ssnExist ||
    !occupationExist
  ) {
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
  if (
    !descExist ||
    !dateExist ||
    !specialistExist ||
    !diagnosisCodesExist ||
    !typeExist
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  let newEntry: NewEntry;
  if (data.type === "Hospital") {
    const dischargeExist = "discharge" in data;
    if (!dischargeExist)
      throw new Error("Incorrect data: discharge is missing");

    if (typeof data.discharge !== "object") {
      throw new Error("Incorrect discharge");
    }

    newEntry = {
      description: parseDescription(data.description),
      date: parseDate(data.date),
      specialist: parseSpecialist(data.specialist),
      diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
      type: data.type,
      discharge: parseDischarge(data.discharge),
    };

    return newEntry;
  }

  if (data.type === "HealthCheck") {
    const healthCheckRatingExist = "healthCheckRating" in data;
    if (!healthCheckRatingExist)
      throw new Error("Incorrect data: health check rating is missing");

    newEntry = {
      description: parseDescription(data.description),
      date: parseDate(data.date),
      specialist: parseSpecialist(data.specialist),
      diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
      type: data.type,
      healthCheckRating: parseHealthCheckRating(data.healthCheckRating),
    };

    return newEntry;
  }

  if (data.type === "OccupationalHealthcare") {
    const sickLeaveExist = "sickLeave" in data;
    const employerNameExist = "employerName" in data;
    if (!sickLeaveExist || !employerNameExist) {
      throw new Error("Incorrect data: sick leave or employer name is missing");
    }

    newEntry = {
      description: parseDescription(data.description),
      date: parseDate(data.date),
      specialist: parseSpecialist(data.specialist),
      diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
      type: data.type,
      sickLeave: parseSickLeave(data.sickLeave),
      employerName: data.employerName,
    };

    return newEntry;
  }

  throw new Error("Incorrect data: invalid type");
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
  return Object.values(GENDER)
    .map((gender) => gender.toString())
    .includes(gender);
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

const parseDescription = (description: unknown): string => {
  if (!isString(description) || isEmptyString(description)) {
    throw new Error("Incorrect description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || isEmptyString(specialist)) {
    throw new Error("Incorrect specialist");
  }

  return specialist;
};

const isDiagnosisCodes = (dcs: unknown[]): dcs is Diagnosis["code"][] => {
  const diagnosisCodes = diagnosesData.map((diagnosis) => diagnosis.code);

  for (const dc of dcs) {
    if (typeof dc !== "string" || !diagnosisCodes.includes(dc)) {
      return false;
    }
  }

  return true;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect diagnosis codes");
  }

  return diagnosisCodes;
};

const parseString = (data: unknown): string => {
  if (!isString(data) || isEmptyString(data)) {
    throw new Error("Incorrect data type");
  }

  return data;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  const dateExist = "date" in discharge;
  const criteriaExist = "criteria" in discharge;
  if (!dateExist || !criteriaExist) {
    throw new Error("Incorrect discharge: some fields are missing");
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const isHealthCheckRating = (hcr: number): hcr is HealthCheckRating => {
  return Object.values(HEALTH_CHECK_RATING).map(Number).includes(hcr);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown,
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect health check rating");
  }

  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sick leave");
  }

  const startDateExist = "startDate" in sickLeave;
  const endDateExist = "endDate" in sickLeave;
  if (!startDateExist || !endDateExist) {
    throw new Error("Incorrect sick leave: some fields are missing");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};
