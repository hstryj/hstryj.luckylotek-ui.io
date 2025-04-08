import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { validateCode, saveAccess } from "../services/storage.jsx";

export default function CodeGate({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCode(code)) {
      saveAccess();
      onAccessGranted();
    } else {
      setError("Niepoprawny kod dostępu.");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{ p: 4, mt: 6, maxWidth: 400, mx: "auto", textAlign: "center" }}
    >
      <Typography variant="h6" gutterBottom>
        Wprowadź kod dostępu
      </Typography>
      <TextField
        label="Kod dostępu"
        variant="outlined"
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!error}
        helperText={error || " "}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Odblokuj dostęp
      </Button>
    </Paper>
  );
}
