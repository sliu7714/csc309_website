import Header from "../../components/Header/Header";
import LoginBox from "../../components/LoginBox/LoginBox";
import './styles.css';

const Login = ({setUserID}) => {

    return(
        <div className="login">
            <Header/>
            <LoginBox setUserID={setUserID}/>
        </div>
    )


}

export default Login