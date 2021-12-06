import './styles.css' // use same styles as LoginBox
import {useState} from 'react'
import {signup} from "../../actions/user";


const LoginBox = () => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[email, setEmail] = useState("")

    const redirectLoginMessage =
        <div className="msg">
            Already have an account?
            <u><i><a href='/login' >Login</a></i></u>
        </div>

    const [message, setMessage] = useState(redirectLoginMessage)



    const passwordLengthMessage =
        <div className="msg">
            Please input a password 4 characters or longer
        </div>

    const invalidEmailMessage =
        <div className="msg">
            Please input a valid email
        </div>

    const nonUniqueUsernameMsg =
        <div className="msg">
            Sorry, someone else already has that username. <br/>
            Please pick another one
        </div>

    const signupErrorMsg =
        <div className="msg">
            Sorry, there was a problem signing up for an account
        </div>

    const successSignupMessage = (name) =>{
        return(
            <div className="msg">
                Successfully registered for an account. <br/>
                Welcome {name}!
                <u><a href='/login' >Login?</a></u>
            </div>
        )
    }

    return(
        <div className="login_box">
            Sign Up
            <br/>

            <input
                id="username_input"
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}/>
            <br/>

            <input
                id="email_input"
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <br/>

            <input
                id="password_input"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <br/>

            <button
                className="login_btn"
                onClick={() => signup(username, password, email, setMessage, setPassword, passwordLengthMessage,
                    invalidEmailMessage, nonUniqueUsernameMsg, successSignupMessage, signupErrorMsg)}>
                Create Account
            </button>

            {message}

        </div>

    )


}

export default LoginBox