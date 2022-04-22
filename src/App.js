import logo from './logo.svg';
import NavBar from "./components/default/NavBar";
import RouteSwitch from "./routes/RouteSwitch";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <RouteSwitch/>
        <NavBar/>
    </BrowserRouter>
  );
}

export default App;
