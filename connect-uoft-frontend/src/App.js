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
import ENV from './config.js'
const BASE_API_URL = ENV.apiBaseUrl

function App() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false) // TODO: update components to use this boolean

    const [tempCheckSession, setTempCheckSession] = useState(false) // TODO: remove


    // check if user is logged in on every refresh
    useEffect(() =>{
        if(!ENV.useFrontendTestUser){
            fetch(`${BASE_API_URL}/api/user/check-session`)
                .then((res) => {
                    if(!res.ok){
                        console.log("check session response code:", res.status)
                        setIsAdmin(false)
                        setIsUserLoggedIn(false)
                        return;
                    }
                    return res.json()
                })
                .then((sessionInfo) =>{
                    // previous then only returns json if response code is 200
                    if (sessionInfo){
                        // console.log('session info', sessionInfo)
                        setIsUserLoggedIn(true)
                        setIsAdmin(sessionInfo.isAdmin ? sessionInfo.isAdmin : false)
                    }
                })
                .catch((err) => {
                    console.log("could not check session:",err)
                    setIsUserLoggedIn(false)
                })
        }
        else{
            console.log('test user')
            setIsUserLoggedIn(true)
            setIsAdmin(ENV.frontendTestUserIsAdmin)
        }

    }, [tempCheckSession])


    const logout = () =>{
        console.log('logout')
        fetch(`${BASE_API_URL}/api/user/logout`)
            .then((res) => {
                if(!res.ok){
                    console.log("could not log out:", res.status)
                    return;
                }
                return res.json()
            })
            .then((responseInfo) =>{
                // previous then only returns json if response code is 200
                if (responseInfo){
                    setIsUserLoggedIn(false)
                    setIsAdmin(false)
                }
            })
            .catch((err) => {
                console.log("could not log out:", err)
            })
    }


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
                    <Logout logout={logout} isUserLoggedIn={isUserLoggedIn}/>
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
        {/*<button onClick={logout}>logout (temporary - need additional refresh) isAdmin: {isAdmin}</button>*/}
        {/*<button onClick={() => setTempCheckSession(!tempCheckSession)}>check session </button>*/}
        {/*<button >isUserLoggedIn {isUserLoggedIn.toString()} </button>*/}
    </div>
  );
}

export default App;
