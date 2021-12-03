import "./styles.css"
import {useHistory} from 'react-router-dom'

const ApplicantListItem = ({applicant, acceptApplicant, denyApplicant}) =>{
    const history = useHistory()

    const goToProfile = () =>{
        history.push(`/user/${applicant.id}`)
    }

    return(
        <div className="applicant list-item">
            <hr className="hr-dotted"/>
            <div className="row1">
                <div className="applicant-profile" onClick={goToProfile}>
                    <img className="profile-icon" src="/images/user_icon_green.svg" alt="profile icon"/>
                    <p className="applicant-name">{applicant.name}</p>
                </div>

                <button className="applicant-btn accept" onClick={() => acceptApplicant(applicant.id)}>Accept</button>
                <button className="applicant-btn deny" onClick={() => denyApplicant(applicant.id)}>Reject</button>
            </div>
            <div className="application-msg ">
                {applicant.applicationMsg}
            </div>
        </div>
    )
}

export default ApplicantListItem