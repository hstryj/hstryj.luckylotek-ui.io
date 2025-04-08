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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #175F36, #0F3C26)", // głęboka, żelowa zieleń
        paddingBottom: 4,
        maxWidth: "700px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}
    >
  
      <Toolbar>
          <Typography variant="h2" align="center" sx={{ flexGrow: 1 }}>
            Dobry Lotek
          </Typography>
          </Toolbar>
       
    
      <Typography variant="h1">
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
      </Typography>

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
