import "./styles.css"

const Bio = (props) =>{
    const user = props.user

    function getBio(){
        if(props.isNotCurrentUser && !user.bio){
            return <i className="grey-text">no bio</i>
        }
        return user.bio
        // Pulls the users bio from the Profile Page
    }
    return (

        <div className="profile-container profile-card-background">
            <div className="profile-contents-container">
                <h1 className="profile-contents-container__h1">{props.isNotCurrentUser ? `About ${user.name}`: `About me`}</h1>
                <p className="profile-contents-container__p">{getBio() ? getBio(): "Tell Us About Yourself"}</p>
            </div>        
        </div>
    );

};

export default Bio;
