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
            sx={{  width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#e8fc03",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)", 
              animation: "shake 0.4s ease-in-out",
              "&:hover": {
                animation: "bounce 0.3s ease-in-out",
              },}}
          />
        ))}
      </Stack>
      <Button variant="contained" color="secondary" onClick={handleSave}>
        Zapisz zestaw
      </Button>
    </Paper>
  );
}