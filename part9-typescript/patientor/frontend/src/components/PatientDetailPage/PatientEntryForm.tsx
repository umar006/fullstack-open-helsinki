import { Box, Button, Input, InputLabel } from "@mui/material";

const PatientEntryForm = () => {
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
      <form>
        <InputLabel htmlFor="description">description</InputLabel>
        <Input id="description" />
        <InputLabel htmlFor="date">date</InputLabel>
        <Input id="date" type="date" />
        <InputLabel htmlFor="specialist">specialist</InputLabel>
        <Input id="specialist" />
        <InputLabel htmlFor="diagnosisCodes">diagnosis codes</InputLabel>
        <Input id="diagnosisCodes" />
        <InputLabel htmlFor="type">type</InputLabel>
        <Input id="type" />
        <InputLabel htmlFor="healthCheckRating">health check rating</InputLabel>
        <Input id="healthCheckRating" type="number" />
        <br />
        <Button variant="contained" sx={{ marginTop: 3 }}>
          add
        </Button>
      </form>
    </Box>
  );
};

export default PatientEntryForm;
