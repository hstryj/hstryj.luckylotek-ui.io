import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tooltip,
} from "@mui/material";
import { getHeatColor } from "../utils/colors";
import { getFavoritePairs } from "../utils/drawsAnalyzer";

export default function HeatmapWithPairs({ draws }) {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const countMap = {};
  const numbers = Array.from({ length: 49 }, (_, i) => i + 1);

  draws.forEach((draw) => {
    draw.numbers.forEach((n) => {
      countMap[n] = (countMap[n] || 0) + 1;
    });
  });

  const max = Math.max(...Object.values(countMap));
  const favoritePairs = selectedNumber
    ? getFavoritePairs(draws, selectedNumber)
    : [];

  return (
    <Box mt={6}>
      <Typography variant="h6" mb={3} textAlign="center">
        Mapa Ciepła Liczb + Najczęstsze Pary
      </Typography>

      <Grid
        container
        spacing={1}
        columns={7}
        justifyContent="center"
        sx={{ maxWidth: "fit-content", mx: "auto" }}
      >
        {numbers.map((n) => (
          <Grid item xs={1} key={n}>
            <Tooltip title={`Liczba ${n} wystąpiła ${countMap[n] || 0} razy`} arrow>
              <Paper
                elevation={selectedNumber === n ? 4 : 1}
                onClick={() => setSelectedNumber(n)}
                sx={{
                  backgroundColor: getHeatColor(countMap[n] || 0, max),
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  color: "#000",
                  border: selectedNumber === n ? "2px solid black" : "none",
                }}
              >
                <Box fontWeight={600}>{n}</Box>
                <Box fontSize={10}>{countMap[n] || 0}</Box>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mt={2}
        textAlign="center"
      >
        Liczba pod numerem to częstotliwość jej występowania w losowaniach.
        Najedź na dowolną liczbę, aby zobaczyć szczegóły.
      </Typography>

      {selectedNumber && favoritePairs.length > 0 && (
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Najczęstsze pary z liczbą {selectedNumber}:
          </Typography>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {favoritePairs.slice(0, 5).map(([num, count], i) => (
              <li key={i}>
                {selectedNumber} + {num} → {count} razy
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}