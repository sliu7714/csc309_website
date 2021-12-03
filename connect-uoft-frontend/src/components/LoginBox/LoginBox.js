import './styles.css'
import {useState} from 'react'
import ENV from '../../config'
const BASE_API_URL = ENV.apiBaseUrl


const LoginBox = ({setIsUserLoggedIn, setIsAdmin}) => {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[isIncorrectCredentials, setIsIncorrectCredentials] = useState(false)

    const incorrectCredentialsMsg = <div className="msg">Incorrect login, please check your username and password</div>

    const login = () =>{

        fetch(`${BASE_API_URL}/api/user/login`,{
            method: "post",
            body: JSON.stringify({username, password}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
            .then((res) =>{
                if(!res.ok){
                    console.log("invalid login: response code ", res.status)
                    setIsIncorrectCredentials(true)
                    return;
                }
                return res.json()
            })
            .then((responseInfo) =>{
                if (responseInfo){
                    // console.log(responseInfo)
                    setIsUserLoggedIn(true)
                    setIsAdmin(responseInfo.isAdmin ? responseInfo.isAdmin : false)
                    setPassword("")
                }
            })
            .catch((err) =>{
                console.log("error with logging in: ", err)
            })
    }

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
                onClick={() => login()}>Login</button>

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