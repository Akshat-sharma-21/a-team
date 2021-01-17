import "./App.css";
import Onboarding from "./components/Onboarding/Onboarding";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2B56FF",
    },
    secondary: {
      main: "#21DAF1",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    success: {
      main: "#01AE4B",
    },
    error: {
      main: "#EB0000",
    },
    warning: {
      main: "#F6AC00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Onboarding />
      </div>
    </ThemeProvider>
  );
}

export default App;
