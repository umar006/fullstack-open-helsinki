import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import PatientEntryList from "./PatientEntryList";

const PatientDetailPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const patient = await patientService.getOne(patientId);
      setPatient(patient);
    };

    fetchPatient(patientId!).catch((error) => console.error(error));
  }, [patientId]);

  if (!patient) {
    return <h2>Patient Not Found</h2>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>entries</h3>
      <PatientEntryList patient={patient} />
    </div>
  );
};

export default PatientDetailPage;
