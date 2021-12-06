import './styles.css'
import {useState} from 'react'
import {login} from "../../actions/user";

const LoginBox = ({setIsUserLoggedIn, setIsAdmin}) => {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[isIncorrectCredentials, setIsIncorrectCredentials] = useState(false)

    const incorrectCredentialsMsg = <div className="msg">Incorrect login, please check your username and password</div>

    return(
        <div className="login_box">
            Login
            <br/>

            <input
                className="username_input"
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}/>
                <br/>

            <input
                className="password_input"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <br/>

            <button
                className="login_btn"
                onClick={() => login(username, password, setIsIncorrectCredentials,setIsUserLoggedIn, setIsAdmin, setPassword)}>Login</button>

            {/* render msg only if user has entered wrong credentials */}
            {isIncorrectCredentials ? incorrectCredentialsMsg : null}

            <div className="signup">
                <a href="/signup" className="signup_link">
                    <div className="arrow"/>
                    <div>create account</div>
                </a>

            </div>
        </div>

    )


}

export default LoginBox