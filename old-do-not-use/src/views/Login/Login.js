import Header from "../../components/Header/Header";
import LoginBox from "../../components/LoginBox/LoginBox";
import './styles.css';

const Login = ({updateUserID}) => {

    return(
        <div className="login">
            <Header/>
            <LoginBox updateUserID={updateUserID}/>
        </div>
    )


}

export default Login