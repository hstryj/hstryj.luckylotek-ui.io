import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tooltip,
  Container,
  Card,
  CardContent,
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
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight={700}
        mb={4}
        sx={{ color: "white" }}
      >
        Mapa Ciepła Liczb
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        gap={6}
        flexWrap="wrap"
        alignItems="flex-start"
      >
        {/* Heatmap - pełna szerokość */}
        <Grid container spacing={1} columns={7} justifyContent="center" sx={{ flex: 1 }}>
          {numbers.map((n) => (
            <Grid item xs={1} key={n} display="flex" justifyContent="center">
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
                    border: selectedNumber === n ? "2px solid white" : "none",
                  }}
                >
                  <Box fontWeight={600}>{n}</Box>
                  <Box fontSize={10}>{countMap[n] || 0}</Box>
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* Lista par w ramce */}
        <Card sx={{ minWidth: 250, maxWidth: 300, backgroundColor: "#2a2a2a", color: "white" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              align="center"
            >
              {selectedNumber
                ? `Najczęstsze pary z ${selectedNumber}`
                : "Kliknij liczbę"}
            </Typography>
            {selectedNumber && favoritePairs.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {favoritePairs.slice(0, 5).map(([num, count], i) => (
                  <li
                    key={i}
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    {selectedNumber} + {num} → {count} razy
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        align="center"
        mt={4}
      >
        Liczba pod numerem to częstotliwość jej występowania w losowaniach.
        Najedź na dowolną liczbę, aby zobaczyć szczegóły.
      </Typography>
    </Container>
  );
}
