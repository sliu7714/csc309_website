import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {useState} from "react";
import Login from "./views/Login/Login";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Manage from "./views/Manage";
import Signup from "./views/Signup/Signup";
import Header from "./components/Header/Header";

function App() {
    // user id of the user currently logged in, null if no one is logged in
    // be careful of userID = 0 since 0 is false in javascript
    // null is true as well so be careful of that
    const [userID, setUserID] = useState(localStorage.getItem('userID'))

  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    {userID >= 0 ? <Home/> : <Login setUserID={setUserID}/>}
                </Route>
                <Route path="/signup" >
                    <Signup/>
                </Route>
                <Route path="/home" component={Home} >
                    <Home/>
                </Route>
                <Route path="/profile" >
                    <Profile/>
                </Route>
                <Route path="/manage" >
                    <Manage/>
                </Route>

                <Route>
                    <Header/>
                    <h1>404 page not found</h1>
                </Route>
            </Switch>
        </BrowserRouter>

        {/*TEMPORARY*/}
        <button onClick={()=>{localStorage.setItem('userID', null);
                            setUserID(undefined);}}>logout (temporary - need additional refresh)</button>
    </div>
  );
}

export default App;
