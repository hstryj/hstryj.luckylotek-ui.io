// StrategyForm.jsx – wersja z MUI
import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Paper, Typography } from "@mui/material";
import { generateNumbers } from "../services/generator";

const strategies = [
  "Najczęściej losowane",
  "Najrzadziej losowane",
  "Pomiń ostatnie losowania",
  "Rozkład parzyste/nieparzyste",
  "Popularne pary/trójki"
];

export default function StrategyForm({ setResult, setStrategy }) {
  const [strategy, setLocalStrategy] = useState(strategies[0]);

  const handleGenerate = () => {
    const result = generateNumbers(strategy);
    setResult(result);
    setStrategy(strategy);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Wybierz strategię
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="strategy-label">Strategia</InputLabel>
          <Select
            labelId="strategy-label"
            value={strategy}
            label="Strategia"
            onChange={(e) => setLocalStrategy(e.target.value)}
          >
            {strategies.map((strat, index) => (
              <MenuItem key={index} value={strat}>
                {strat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generuj liczby
        </Button>
      </Box>
    </Paper>
  );
}
