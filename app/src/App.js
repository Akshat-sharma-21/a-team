import Main from "./MainComponent";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { muiThemeOptions } from './utils.js';
import "./App.css";

const theme = createMuiTheme(muiThemeOptions);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Main />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
