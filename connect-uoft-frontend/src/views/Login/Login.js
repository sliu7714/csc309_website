import LoginBox from "../../components/LoginBox/LoginBox";
import './styles.css';

const Login = ({setIsUserLoggedIn, setIsAdmin}) => {

    return(
        <div className="login">
            <LoginBox setIsUserLoggedIn={setIsUserLoggedIn} setIsAdmin={setIsAdmin}/>
        </div>
    )


}

export default Login