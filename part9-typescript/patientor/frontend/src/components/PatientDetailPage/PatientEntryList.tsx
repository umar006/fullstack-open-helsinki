import { Patient } from "../../types";

interface Props {
  patient: Patient;
}

const PatientEntryList = ({ patient }: Props) => {
  const entryList = patient.entries.map((entry) => (
    <div key={entry.id}>
      <p>
        {entry.date} | {entry.description}
      </p>
      {entry.diagnosisCodes?.map((dc, idx) => (
        <ul key={idx}>
          <li>{dc}</li>
        </ul>
      ))}
    </div>
  ));

  return entryList;
};

export default PatientEntryList;
