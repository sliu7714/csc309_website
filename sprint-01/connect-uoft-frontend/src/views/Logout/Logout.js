import {useHistory} from "react-router-dom";


const Logout = ({logout, isUserLoggedIn}) =>{

    const history = useHistory()
    const redirectLogin = () =>{
        history.push("/login")
    }

    return (
        <div>
            {isUserLoggedIn ?
                <button onClick={logout}>logout </button>
                :
                <button onClick={redirectLogin}>Go to login page</button>
            }

        </div>
    )
}

export default Logout
