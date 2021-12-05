import './styles.css' // use same styles as LoginBox
import {useState} from 'react'
import {useHistory} from "react-router-dom"
import ENV from '../../config'
const BASE_API_URL = ENV.apiBaseUrl


const LoginBox = () => {
    const history = useHistory()
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

    const validateEmail = () =>{
        // RFC 5322 standard email regex from http://emailregex.com/
        return email.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
    }


    const signup = () =>{
        setMessage(null)

        if (password.length < 4){
            setMessage(passwordLengthMessage)
            return;
        }
        if (!validateEmail()){
            setMessage(invalidEmailMessage)
            return;
        }

        fetch(`${BASE_API_URL}/api/user/create`,{
            method: "post",
            body: JSON.stringify({username, password, email}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
            .then((res) =>{
                if(!res.ok){
                    console.log("invalid signup, response code: ", res.status)
                    setMessage(nonUniqueUsernameMsg)
                    return;
                }
                return res.json()
            })
            .then((responseInfo) =>{
                if (responseInfo){
                    console.log(responseInfo)
                    setMessage(successSignupMessage(username))
                    setPassword("")
                }
            })
            .catch((err) =>{
                console.log("error with signing up in: ", err)
                setMessage(signupErrorMsg)
            })
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
                onClick={() => signup()}>Create Account</button>

            {message}

        </div>

    )


}

export default LoginBox