import {
  Box,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ElementRef, useRef } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import {
  ENTRY_TYPE,
  EntryFormValues,
  EntryType,
  HEALTH_CHECK_RATING,
  Patient,
} from "../../types";

interface Props {
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const PatientEntryForm = ({ setPatient }: Props) => {
  const { patientId } = useParams();

  const descriptionRef = useRef<ElementRef<"input">>(null);
  const dateRef = useRef<ElementRef<"input">>(null);
  const specialistRef = useRef<ElementRef<"input">>(null);
  const diagnosisCodesRef = useRef<ElementRef<"input">>(null);
  const typeRef = useRef<ElementRef<"input">>(null);
  const healthCheckRatingRef = useRef<ElementRef<"input">>(null);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const description = descriptionRef.current?.value;
    const date = dateRef.current?.value;
    const specialist = specialistRef.current?.value;
    const diagnosisCodes = diagnosisCodesRef.current?.value;
    const type = typeRef.current?.value;
    const healthCheckRating = healthCheckRatingRef.current?.value;

    const newEntry: EntryFormValues = {
      description,
      date,
      specialist,
      type,
      diagnosisCodes,
      healthCheckRating,
    };

    patients
      .createEntry(patientId!, newEntry)
      .then((res) => {
        setPatient((currVal) => {
          if (!currVal) return currVal;

          const newEntries = currVal.entries.concat(res);
          if (!newEntries) return currVal;

          currVal.entries = newEntries;
          return { ...currVal };
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 2,
        marginY: 1,
        padding: 1,
        "& .MuiTextField-root": { marginY: 5 },
      }}
    >
      <h3>new health check entry</h3>
      <Stack component="form" spacing={1.5} onSubmit={addEntry}>
        <InputLabel htmlFor="description">description</InputLabel>
        <Input id="description" inputRef={descriptionRef} />

        <InputLabel htmlFor="date">date</InputLabel>
        <Input id="date" type="date" inputRef={dateRef} />

        <InputLabel htmlFor="specialist">specialist</InputLabel>
        <Input id="specialist" inputRef={specialistRef} />

        <InputLabel htmlFor="diagnosisCodes">diagnosis codes</InputLabel>
        <Input id="diagnosisCodes" inputRef={diagnosisCodesRef} />

        <InputLabel>type</InputLabel>
        <Select inputRef={typeRef} defaultValue={""}>
          {Object.values(ENTRY_TYPE).map((type, idx) => (
            <MenuItem key={idx} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        <InputLabel htmlFor="healthCheckRating">health check rating</InputLabel>
        <Select inputRef={healthCheckRatingRef} defaultValue={""}>
          {Object.entries(HEALTH_CHECK_RATING).map((hcr) => (
            <MenuItem key={hcr[1]} value={hcr[1]}>
              {hcr[0]}
            </MenuItem>
          ))}
        </Select>

      </Stack>
    </Box>
  );
};

export default PatientEntryForm;
