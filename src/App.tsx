import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { CssBaseline } from "@mui/material";
import { createCustomTheme } from "./styles/Themes";

function App() {
  const mode = "light";
  const theme = createCustomTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
