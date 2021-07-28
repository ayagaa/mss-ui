import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { red, green, lightBlue, blue, blueGrey } from '@material-ui/core/colors';
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <BaseRouter />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
