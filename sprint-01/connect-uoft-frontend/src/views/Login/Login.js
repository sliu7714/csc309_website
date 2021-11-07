import LoginBox from "../../components/LoginBox/LoginBox";
import './styles.css';

const Login = ({setUserID}) => {

    return(
        <div className="login">
            <LoginBox setUserID={setUserID}/>
        </div>
    )


}

export default Login