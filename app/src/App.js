import Main from "./MainComponent";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { muiThemeOptions } from "./utils.js";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

const theme = createMuiTheme(muiThemeOptions);

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
