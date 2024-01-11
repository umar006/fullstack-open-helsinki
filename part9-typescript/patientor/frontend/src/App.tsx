import { Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import PatientDetailPage from "./components/PatientDetailPage";
import PatientListPage from "./components/PatientListPage";
import patientService from "./services/patients";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route path="patients">
            <Route
              index
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path=":patientId" element={<PatientDetailPage />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
