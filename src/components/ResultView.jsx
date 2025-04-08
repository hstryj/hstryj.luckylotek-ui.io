import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { saveFavorite } from "../services/favorites";

export default function ResultView({ numbers, onSave, strategy }) {
  if (numbers.length === 0) return null;

  const handleSave = () => {
    saveFavorite(numbers, strategy);
    alert("Zestaw zapisany!");
    if (onSave) onSave();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Wylosowane liczby:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {numbers.map((n, i) => (
          <Chip
            key={i}
            label={n}
            sx={{ backgroundColor: "#FEF08A", fontWeight: 600 }}
          />
        ))}
      </Stack>
      <Button variant="contained" color="secondary" onClick={handleSave}>
        Zapisz zestaw
      </Button>
    </Paper>
  );
}