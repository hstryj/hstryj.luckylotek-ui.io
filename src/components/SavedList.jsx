import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadFavorites, deleteFavorite } from "../services/favorites";

export default function SavedList({ reload }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const sorted = [...loadFavorites()].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSaved(sorted);
  }, [reload]);

  const handleDelete = (index) => {
    deleteFavorite(index);
    const sorted = [...loadFavorites()].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSaved(sorted);
  };

  const handleClearAll = () => {
    localStorage.removeItem("savedNumbers");
    setSaved([]);
  };

  return (
    <Box mt={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Zapisane zestawy</Typography>
        {saved.length > 0 && (
          <Button size="small" color="error" onClick={handleClearAll}>
            Wyczyść wszystkie
          </Button>
        )}
      </Box>

      {saved.length === 0 ? (
        <Typography>Brak zapisanych zestawów.</Typography>
      ) : (
        <Stack spacing={2}>
          {saved.map((item, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mb={1}>
                <Typography fontWeight={600} color="text.secondary">
                  {index + 1}.
                </Typography>
                {item.set.map((n, i) => (
                  <Chip
                    key={i}
                    label={n}
                    sx={{ backgroundColor: "#FEF08A", fontWeight: 600 }}
                  />
                ))}
              </Box>
              {item.strategy && (
                <Typography variant="body2" color="primary" fontStyle="italic" mb={0.5}>
                  Strategia: {item.strategy}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                {new Date(item.date).toLocaleString("pl-PL")}
              </Typography>
              <Box>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(index)}
                  startIcon={<DeleteIcon />}
                >
                  Usuń
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}