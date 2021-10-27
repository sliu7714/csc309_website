import './styles.css' // use same styles as LoginBox
import {useState} from 'react'
import {users} from '../../Data/data'
import {useHistory} from "react-router-dom"


const LoginBox = () => {
    const history = useHistory()
    const[username, updateUsername] = useState("")
    const[password, updatePassword] = useState("")
    const[isUniqueUsername, updateIsUniqueUsername] = useState(true)

    const nonUniqueUsernameMsg =
        <div className="msg">
            Sorry, someone else already has that username. <br/>
            Please pick another one
        </div>

    const signup = () =>{
        // TODO (after phase 1) send user info to backend to create new user
        // - first check for unique username then send info to create new user
        //      dont forget to clear password from state

        console.log(`username:${username} password:${password}`) // make sure to delete later - security flaw
        const matchingUsername = users.filter((user) => user.username == username )
        if (matchingUsername.length === 0){
            // no other user with same username
            // code to create new user here
            const new_user = {
                id: users.length,
                username: username,
                password: password,
                name: username,
                bio: "",
                isAdmin: false,
                postings: [],
                groups: [],
                applying: [],
            }
            users.push(new_user) // new user only persists until next refresh (since this isn't writing to a file or data base or anything) 
            updatePassword("") // clear password from state

            // redirect to login page:
            history.push("/")
        }
        else{
            // incorrect username
            updateIsUniqueUsername(false)
        }


    }

    return(
        <div className="login_box">
            Sign Up
            <br/>

            <input
                className="username_input"
                type="text"
                placeholder="username"
                value={username}
                onChange={e => updateUsername(e.target.value)}/>
            <br/>

            <input
                className="password_input"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => updatePassword(e.target.value)}/>
            <br/>

            <button
                className="login_btn"
                onClick={() => signup()}>Create Account</button>

            {/* render msg only if user has entered non unique username */}
            {isUniqueUsername ? null : nonUniqueUsernameMsg}


        </div>

    )


}

export default LoginBox