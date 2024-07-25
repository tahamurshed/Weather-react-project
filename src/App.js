import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import { ToastProvider } from "./contexts/ToastContext";
import Loader from "./components/Loader";
import { LoaderProvider } from "./contexts/LoaderContext";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["ElMessiri"],
    },
    snackbar: {
      backgroundColor: "#4caf50", // Custom background color
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="App">
          <LoaderProvider>
            <WeatherCard />
            <Loader />
          </LoaderProvider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
