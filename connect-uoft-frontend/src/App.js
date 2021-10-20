import './App.css';
import Login from "./views/Login";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Manage from "./views/Manage";

function App() {
  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/manage" component={Manage} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
