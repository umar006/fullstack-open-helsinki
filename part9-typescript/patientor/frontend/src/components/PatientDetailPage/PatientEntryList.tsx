import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";

interface Props {
  patient: Patient;
}

const PatientEntryList = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses().catch((error) => console.error(error));
  }, []);

  if (!diagnoses.length) {
    return <div>No Diagnoses</div>;
  }

  const getDiagnosisByCode = (code: string[]) => {
    const filteredDiagnoses = diagnoses.filter((diagnosis) =>
      code.includes(diagnosis.code),
    );

    return filteredDiagnoses.map((diagnosis) => (
      <li key={diagnosis.code}>
        {diagnosis.code} -&gt; {diagnosis.name}
      </li>
    ));
  };

  const entryList = patient.entries.map((entry) => (
    <div key={entry.id}>
      <p>
        {entry.date} | {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes && getDiagnosisByCode(entry.diagnosisCodes)}
      </ul>
    </div>
  ));

  return entryList;
};

export default PatientEntryList;
