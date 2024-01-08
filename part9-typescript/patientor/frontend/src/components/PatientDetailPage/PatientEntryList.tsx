import FavoriteIcon from "@mui/icons-material/Favorite";
import { green, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, HealthCheckRating, Patient } from "../../types";
import { Box } from "@mui/material";

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

  const healthCheckRatingIcon: Record<HealthCheckRating, JSX.Element> = {
    "0": <FavoriteIcon sx={{ color: green[500] }} />,
    "1": <FavoriteIcon sx={{ color: yellow[500] }} />,
    "2": <FavoriteIcon sx={{ color: red[500] }} />,
    "3": <FavoriteIcon />,
  };

  const entryList = patient.entries.map((entry) => (
    <Box
      key={entry.id}
      sx={{ border: 1, borderRadius: 2, marginY: 1, paddingX: 1 }}
    >
      <p>{entry.date}</p>
      <em>{entry.description}</em>
      <p>
        {entry.type === "HealthCheck" &&
          healthCheckRatingIcon[entry.healthCheckRating]}
      </p>
      <ul>
        {entry.diagnosisCodes && getDiagnosisByCode(entry.diagnosisCodes)}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </Box>
  ));

  return entryList;
};

export default PatientEntryList;
