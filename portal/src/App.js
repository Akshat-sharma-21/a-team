import Main from "./MainComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="App">
            <Main />
          </div>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
