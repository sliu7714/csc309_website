import './styles.css'
import {useState} from 'react'
import {users} from '../../Data/data'


const LoginBox = ({updateUserID}) => {

    const[username, updateUsername] = useState("")
    const[password, updatePassword] = useState("")
    const[isIncorrectCredentials, updateIsIncorrectCredentials] = useState(false)

    const incorrectCredentialsMsg = <div className="msg">Incorrect login, please check your username and password</div>

    const login = () =>{
        // TODO (after phase 1) authenticate using backend
        console.log(`username: ${username} \n password: ${password}`) // make sure to delete later - security flaw
        const matchingUsername = users.filter((user) => user.username === username )
        if (matchingUsername.length === 1 && matchingUsername[0].password === password){
            updatePassword("") // clear password from state
            updateUserID(matchingUsername[0].id) // this updates the state in App.js
            localStorage.setItem('userID', matchingUsername[0].id) // this updates the local storage
            console.log(`user id: ${matchingUsername[0].id}`)
        }
        else{
            updateIsIncorrectCredentials(true)
        }
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