import "./styles.css"
import "./Popup"
import { useState } from "react";


const Header = () => {

    const [buttonPopup, setButtonPopup] = useState(false);

    return(

        <div className='header'>
            <a className='title' href="/">ConnectUofT</a>

            {/*because of float: right, these appear in the reverse order*/}
            <a className='profile_btn' href='/profile'>
                <img src="/images/user_icon.svg" alt="profile icon"/>
            </a>
            <a className='create_btn' onClick={() => setButtonPopup(true)}>Create+</a>
            <a className='manage_btn' href='/manage'>Manage</a>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            </Popup>
        </div>

    
    )


}

export default Header