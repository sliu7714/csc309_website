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
    const [isAdmin, setIsAdmin] = useState(false)

    // check if user is logged in on every refresh
    useEffect(() =>{
        checkSession(setIsUserLoggedIn, setIsAdmin)
    }, [])


    // function to call the logout function
    const callLogout = ()=>{
        logout(setIsUserLoggedIn, setIsAdmin)
    }


  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <Header isUserLoggedIn={isUserLoggedIn} />
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
                    {isUserLoggedIn ? <Home isAdmin={isAdmin}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/profile" >
                    {isUserLoggedIn ? <Profile callLogout={callLogout} isAdmin={isAdmin}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/manage" >
                    {isUserLoggedIn ? <Manage isAdmin={isAdmin}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/logout">
                    <Logout logout={callLogout} isUserLoggedIn={isUserLoggedIn}/>
                </Route>

                <Route path="/posting/:id">
                    <PostingDetailed isAdmin={isAdmin}/>
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
        {/*<button onClick={() => callLogout()}>logout (temporary - need additional refresh) isAdmin: {isAdmin}</button>*/}
        {/*<button >isUserLoggedIn {isUserLoggedIn.toString()} </button>*/}
    </div>
  );
}

export default App;
