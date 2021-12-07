import "./styles.css"
import {useHistory} from 'react-router-dom'

const ApplicantListItem = ({application, acceptApplicant, denyApplicant}) =>{
    const history = useHistory()

    const goToProfile = () =>{
        history.push(`/user/${application.applicantID}`)
    }

    return(
        <div className="applicant list-item">
            <hr className="hr-dotted"/>
            <div className="row1">
                <div className="applicant-profile" onClick={goToProfile}>
                    <img className="profile-icon" src="/images/user_icon_green.svg" alt="profile icon"/>
                    <p className="applicant-name">{application.applicantInfo.name}</p>
                </div>

                <button className="applicant-btn accept" onClick={() => acceptApplicant(application.applicantID, application._id)}>Accept</button>
                <button className="applicant-btn deny" onClick={() => denyApplicant(application.applicantID, application._id)}>Reject</button>
            </div>
            <div className="application-msg ">
                {application.applyMsg}
            </div>
        </div>
    )
}

export default ApplicantListItem