// profile card for another user's profile info
import {_profilePicturesWhite} from "../../data/constants";
import {reportUser} from "../../actions/user";

const OtherUserInfo = ({user}) => {
    const _profilePicture = _profilePicturesWhite[user.profileImageIndex];
    console.log('otherprofile', user, user.isReported)

    return (

        <div className="profile-user-handle-container">
            <div className="profile-picture-container" title={(user.name).concat("'s ","profile icon")}>
                <img src={_profilePicture}
                     alt={(user.name).concat("'s ","profile icon")}
                     className="profile-picture-container__image"
                />
            </div>
            <div className="profile-user-handle-infotmation-container">
                <h1 className="profile-user-handle-container__h1" title="Name">{user.name}</h1>
                <h2 className="profile-user-handle-container__h2" title="Username">{user.username}</h2>
                {/*<h3 className="profile-user-handle-container__h3" title="Email">{user1.email}</h3>*/}
            </div>
            <div className="report-user-container">
                {
                    user.isReported ?
                        <button className="report-user-btn red"
                                title="This user is reported"
                                onClick={() => alert("this user has already been reported by someone")} >
                            Reported
                        </button>
                        :
                        <button className="report-user-btn"
                                title="Report user button"
                                onClick={() => reportUser(user._id)} >
                            Report User
                        </button>

                }

            </div>


        </div>
    )
}

export default OtherUserInfo;