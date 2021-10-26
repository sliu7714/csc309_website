import "./styles.css"


const Header = () => {

    return(
        <div className='header'>
            <h1 className='title'>ConnectUofT</h1>
            <a className='search_btn' href='/search'>Search</a>

            {/*because of float: right, these appear in the reverse order*/}
            <a className='profile_btn' href='/profile'>
                <img src="/images/user_icon.svg" alt="profile icon"/>
            </a>
            <a className='create_btn' href='/create'>Create +</a>
            <a className='manage_btn' href='/manage'>Manage</a>
        </div>
    )


}

export default Header