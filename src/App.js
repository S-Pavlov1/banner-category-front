import NavBar from "./components/default/NavBar";
import RouteSwitch from "./routes/RouteSwitch";
import {BrowserRouter} from "react-router-dom";
import {useAlert} from "react-alert";

function App() {

    const alert = useAlert()

    return (
    <BrowserRouter>
        <RouteSwitch alert={alert}/>
        <NavBar/>
    </BrowserRouter>
  );
}

export default App;
