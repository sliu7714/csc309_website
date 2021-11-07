import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useState, useEffect} from "react";
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

    const checkUserLoggedIn = () => {
        return userID >= 0
    }

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(checkUserLoggedIn(userID))

    // executes every time the dependencies change
    useEffect(() =>{
        setIsUserLoggedIn(checkUserLoggedIn(userID))
        // eslint-disable-next-line
    }, [userID])

    const logout = () =>{
        localStorage.setItem('userID', null)
        setUserID(undefined)
    }


  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <Header isUserLoggedIn={isUserLoggedIn}/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    {isUserLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login">
                    {isUserLoggedIn ? <Redirect to="/home" /> :<Login setUserID={setUserID} />}
                </Route>
                <Route path="/signup" >
                    <Signup/>
                </Route>
                <Route path="/home" component={Home} >
                    {isUserLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>
                <Route path="/profile" >
                    {isUserLoggedIn ? <Profile /> : <Redirect to="/login" />}
                </Route>
                <Route path="/manage" >
                    {isUserLoggedIn ? <Manage /> : <Redirect to="/login" />}
                </Route>
                <Route path="/logout">


                </Route>

                <Route>
                    <h1>404 page not found</h1>
                </Route>
            </Switch>
        </BrowserRouter>

        {/*TEMPORARY*/}
        <button onClick={logout}>logout (temporary - need additional refresh) userid: {userID}</button>
    </div>
  );
}

export default App;
