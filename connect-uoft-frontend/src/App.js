import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useState, useEffect} from "react";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import Manage from "./views/Manage/Manage";
import Signup from "./views/Signup/Signup";
import Header from "./components/Header/Header";
import Logout from "./views/Logout/Logout";
import PostingDetailed from "./views/PostingDetailed/PostingDetailed";
import User from "./views/User/User";
import {checkSession, logout} from "./actions/user";

function App() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false) // TODO: update components to use this boolean

    // check if user is logged in on every refresh
    useEffect(() =>{
        checkSession(setIsUserLoggedIn, setIsAdmin)
    }, [])


  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <Header isUserLoggedIn={isUserLoggedIn} userID={1}/>  {/*TODO change to remove userID*/}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    {isUserLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login"/>}
                </Route>

                <Route path="/login">
                    {isUserLoggedIn ? <Redirect to="/home" /> :<Login setIsUserLoggedIn={setIsUserLoggedIn} setIsAdmin={setIsAdmin} />}
                </Route>

                <Route path="/signup" >
                    <Signup/>
                </Route>

                <Route path="/home"  >
                    {isUserLoggedIn ? <Home isAdmin={isAdmin}/> : <Redirect to="/login" />} {/*TODO change to remove userID*/}
                </Route>

                <Route path="/profile" >
                    {isUserLoggedIn ? <Profile userID={1} isAdmin={isAdmin}/> : <Redirect to="/login" />} {/*TODO change to remove userID*/}
                </Route>

                <Route path="/manage" >
                    {isUserLoggedIn ? <Manage userID={1}/> : <Redirect to="/login" />} {/*TODO change to remove userID*/}
                </Route>

                <Route path="/logout">
                    <Logout logout={() => logout(setIsUserLoggedIn, setIsAdmin)} isUserLoggedIn={isUserLoggedIn}/>
                </Route>

                <Route path="/posting/:id">
                    <PostingDetailed userID={1} isUserLoggedIn={isUserLoggedIn}/> {/*TODO change to remove userID*/}
                </Route>

                <Route path="/user/:id">
                    <User/>
                </Route>

                <Route>
                    <h1>404 page not found</h1>
                </Route>
            </Switch>
        </BrowserRouter>

        {/*TEMPORARY*/}
        {/*<button onClick={() => logout(isUserLoggedIn, isAdmin)}>logout (temporary - need additional refresh) isAdmin: {isAdmin}</button>*/}
        {/*<button >isUserLoggedIn {isUserLoggedIn.toString()} </button>*/}
    </div>
  );
}

export default App;
