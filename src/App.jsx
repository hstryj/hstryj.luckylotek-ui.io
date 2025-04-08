import React, { useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import CodeGate from "./components/CodeGate";
import StrategyForm from "./components/StrategyForm";
import ResultView from "./components/ResultView";
import SavedList from "./components/SavedList";
import HeatmapWithPairs from "./components/HeatmapWithPairs";
import draws from "./data/draws.json";
import { loadAccess } from "./services/storage";

export default function App() {
  const [hasAccess, setHasAccess] = useState(loadAccess());
  const [tabIndex, setTabIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [strategy, setStrategy] = useState("Najczęściej losowane");
  const [favoritesUpdated, setFavoritesUpdated] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (!hasAccess) {
    return <CodeGate onAccessGranted={() => setHasAccess(true)} />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dobry Lotek
          </Typography>
        </Toolbar>
      </AppBar>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        centered
      >
        <Tab label="Generator" />
        <Tab label="Zapisane" />
        <Tab label="Analiza" />
      </Tabs>

      <Container sx={{ mt: 4 }}>
        {tabIndex === 0 && (
          <>
            <StrategyForm setResult={setResult} setStrategy={setStrategy} />
            <ResultView
              numbers={result}
              onSave={() => setFavoritesUpdated((prev) => prev + 1)}
              strategy={strategy}
            />
          </>
        )}
        {tabIndex === 1 && <SavedList reload={favoritesUpdated} />}
        {tabIndex === 2 && <HeatmapWithPairs draws={draws} />}
      </Container>
    </Box>
  );
}