import DropdownArrow from "../DropdownArrow/DropdownArrow";
import {useState} from "react";
import ApplicantListItem from "./ApplicantListItem";
import {PENDING_APPLICATION} from "../../data/constants";
import { rejectApplicantPost, acceptApplicantPost } from "../../actions/postings";


const ApplicantSection = ({posting, updatePostings}) => {

    const [showApplicants, setShowApplicants] = useState(false)

    const acceptApplicant =(applicantID) =>{
        // TODO connect to backend
        console.log('accept', applicantID)
        acceptApplicantPost(applicantID, posting._id)
        updatePostings()
    }

    const denyApplicant = (applicantID) =>{
        // TODO connect to backend
        console.log('deny', applicantID)
        rejectApplicantPost(applicantID, posting._id)
        updatePostings()
    }


    return(
        <div >
            <hr />
            <span className="posting-text light-bold" >Applicants</span>
            <DropdownArrow show={showApplicants} setShow={setShowApplicants}/>
            { showApplicants ?
                posting.applicantsInfo  ?
                    posting.applicantsInfo.map((applicant) =>
                        applicant.applicationStatus === PENDING_APPLICATION ?
                        <ApplicantListItem applicant={applicant}
                                           acceptApplicant={acceptApplicant}
                                           denyApplicant={denyApplicant}
                                           key={applicant.id}
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