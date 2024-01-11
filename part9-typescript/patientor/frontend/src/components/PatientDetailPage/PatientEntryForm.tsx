import {
  Box,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ElementRef, useRef, useState } from "react";
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
  const [type, setType] = useState<EntryType>("HealthCheck");

  const descriptionRef = useRef<ElementRef<"input">>(null);
  const dateRef = useRef<ElementRef<"input">>(null);
  const specialistRef = useRef<ElementRef<"input">>(null);
  const diagnosisCodesRef = useRef<ElementRef<"input">>(null);
  // HealthCheck entry type
  const healthCheckRatingRef = useRef<ElementRef<"input">>(null);
  // Hospital entry type
  const dischargeDateRef = useRef<ElementRef<"input">>(null);
  const dischargeCriteriaRef = useRef<ElementRef<"input">>(null);
  // EntryOccupationalHealthCare entry type
  const sickLeaveStartDateRef = useRef<ElementRef<"input">>(null);
  const sickLeaveEndDateRef = useRef<ElementRef<"input">>(null);
  const employerNameRef = useRef<ElementRef<"input">>(null);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const description = descriptionRef.current?.value;
    const date = dateRef.current?.value;
    const specialist = specialistRef.current?.value;
    const diagnosisCodes = diagnosisCodesRef.current?.value;
    const healthCheckRating = healthCheckRatingRef.current?.value;
    const discharge = {
      date: dischargeDateRef.current?.value,
      criteria: dischargeCriteriaRef.current?.value,
    };
    const sickLeave = {
      startDate: sickLeaveStartDateRef.current?.value,
      endDate: sickLeaveEndDateRef.current?.value,
    };
    const employerName = employerNameRef.current?.value;

    const entryBase =
      !description || !date || !specialist || !diagnosisCodes || !type;
    const entryHealthCheck = !healthCheckRating;
    const entryHospital = !discharge?.date || !discharge.criteria;
    const entryOccupationalHealthCare =
      !sickLeave?.startDate || !sickLeave.endDate || !employerName;
    if (
      entryBase ||
      entryHealthCheck ||
      entryHospital ||
      entryOccupationalHealthCare
    ) {
      return;
    }

    const isDiagnosisCodesArray = Array.isArray(diagnosisCodes);
    if (!isDiagnosisCodesArray) return;

    const newEntry: Record<EntryType, EntryFormValues> = {
      Hospital: {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "Hospital",
        discharge,
      },
      HealthCheck: {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating,
      },
      OccupationalHealthcare: {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "OccupationalHealthcare",
        sickLeave,
        employerName,
      },
    };

    patients
      .createEntry(patientId!, newEntry[type as EntryType])
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
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as EntryType)}
        >
          {Object.values(ENTRY_TYPE).map((type, idx) => (
            <MenuItem key={idx} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {type === "HealthCheck" && (
          <>
            <InputLabel htmlFor="healthCheckRating">
              health check rating
            </InputLabel>
            <Select inputRef={healthCheckRatingRef} defaultValue={0}>
              {Object.entries(HEALTH_CHECK_RATING).map((hcr) => (
                <MenuItem key={hcr[1]} value={hcr[1]}>
                  {hcr[0]}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {type === "Hospital" && (
          <>
            <p>discharge</p>
            <InputLabel>date</InputLabel>
            <Input type="date" inputRef={dischargeDateRef} />
            <InputLabel>criteria</InputLabel>
            <Input inputRef={dischargeCriteriaRef} />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <p>sick leave</p>
            <InputLabel>employer name</InputLabel>
            <Input inputRef={employerNameRef} />
            <InputLabel>start date</InputLabel>
            <Input type="date" inputRef={sickLeaveStartDateRef} />
            <InputLabel>end date</InputLabel>
            <Input type="date" inputRef={sickLeaveEndDateRef} />
          </>
        )}

        <div>
          <Button variant="contained" sx={{}} type="submit">
            add
          </Button>
          <Button variant="contained" color="error" sx={{ marginLeft: 2 }}>
            cancel
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default PatientEntryForm;
