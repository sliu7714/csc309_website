import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useState, useEffect} from "react";
import Login from "./views/Login/Login";
import Home from "./views/Home";
import Profile from "./views/Profile/Profile";
import Manage from "./views/Manage/Manage";
import Signup from "./views/Signup/Signup";
import Header from "./components/Header/Header";
import Logout from "./views/Logout/Logout";
import {postings} from "./data/data";
import PostingDetailed from "./views/PostingDetailed/PostingDetailed";
import User from "./views/User/User";

function App() {
    // user id of the user currently logged in, null if no one is logged in
    // be careful of userID = 0 since 0 is false in javascript
    // null is true as well so be careful of that
    const [userID, setUserID] = useState(localStorage.getItem('userID_connectUofT'))

    const checkUserLoggedIn = () => {
        return userID >= 0
    }

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(checkUserLoggedIn(userID))

    // executes every time the dependencies change
    useEffect(() =>{
        setIsUserLoggedIn(checkUserLoggedIn(userID))
        // eslint-disable-next-line
    }, [userID, checkUserLoggedIn])

    const logout = () =>{
        localStorage.setItem('userID_connectUofT', null)
        setUserID(undefined)
    }

    // TEMP
    const [posts, setPosts] = useState(postings)

    useEffect(() => {
        setPosts(postings)
    }, [postings])


  return (
    <div className="App">
        {/* routes to different pages based on url */}
        <Header isUserLoggedIn={isUserLoggedIn} userID={userID}/>
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
                    {isUserLoggedIn ? <Home posts={posts} userID={userID}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/profile" >
                    {isUserLoggedIn ? <Profile userID={userID} logout={logout}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/manage" >
                    {isUserLoggedIn ? <Manage userID={userID}/> : <Redirect to="/login" />}
                </Route>

                <Route path="/logout">
                    <Logout logout={logout} isUserLoggedIn={isUserLoggedIn}/>
                </Route>

                <Route path="/posting/:id">
                    <PostingDetailed userID={userID} isUserLoggedIn={isUserLoggedIn}/>
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
        <button onClick={logout}>logout (temporary - need additional refresh) userid: {userID}</button>
    </div>
  );
}

export default App;
