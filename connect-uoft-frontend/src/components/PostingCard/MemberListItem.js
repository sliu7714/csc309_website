import "./styles.css"
import {useHistory} from 'react-router-dom'

const MemberListItem = ({member}) =>{
    const history = useHistory()

    const goToProfile = () =>{
        history.push(`/user/${member.id}`)
    }

    return(
        <div className="member list-item">
            <hr className="hr-dotted"/>
            <div className="member-item">
                <div className="applicant-profile" onClick={goToProfile}>
                    <div className="profile-icon-container member">
                        <img className="profile-icon member" src="/images/user_icon.svg" alt="profile icon"/>
                    </div>
                    <p className="applicant-name">{member.name? member.name : "no name..."}</p>
                </div>
            </div>
        </div>
    )
}

export default MemberListItem