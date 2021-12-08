import DropdownArrow from "../DropdownArrow/DropdownArrow";
import {useState} from "react";
import ApplicantListItem from "./ApplicantListItem";
import {PENDING_APPLICATION} from "../../data/constants";
import { rejectApplicantPost, acceptApplicantPost } from "../../actions/postings";


const ApplicantSection = ({posting, updatePostings}) => {

    const [showApplicants, setShowApplicants] = useState(false)

    const acceptApplicant =(applicantID, applicationID) =>{
        // TODO connect to backend
        console.log('accept', applicantID, posting._id, applicantID)
        acceptApplicantPost(applicantID, posting._id)
        updatePostings()
    }

    const denyApplicant = (applicantID, applicationID) =>{
        // TODO connect to backend
        console.log('deny', applicantID)
        rejectApplicantPost(applicantID, posting._id, applicationID)
        updatePostings()
    }


    return(
        <div >
            <hr />
            <span className="posting-text light-bold" >Applicants</span>
            <DropdownArrow show={showApplicants} setShow={setShowApplicants}/>
            { showApplicants ?
                posting.applicantsInfo  && posting.applicantsInfo.length && posting.applicantsInfo.length > 0?
                    posting.applicantsInfo.map((application) =>
                        application.applicationStatus === PENDING_APPLICATION ?
                        <ApplicantListItem application={application}
                                           acceptApplicant={acceptApplicant}
                                           denyApplicant={denyApplicant}
                                           posting={posting}
                                           key={application._id}
                        />
                        :
                            null
                    )
                    :
                    <div className="grey-text posting-text">
                        no pending applicants
                    </div>
                :
                null
            }
        </div>
    )
}

export default ApplicantSection