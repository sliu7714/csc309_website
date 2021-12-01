import DropdownArrow from "../DropdownArrow/DropdownArrow";
import {useState} from "react";
import ApplicantListItem from "./ApplicantListItem";


const ApplicantSection = ({posting, updatePostings}) => {

    const [showApplicants, setShowApplicants] = useState(false)

    const acceptApplicant =(applicantID) =>{
        // TODO connect to backend
        console.log('accept', applicantID)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }

    const denyApplicant = (applicantID) =>{
        // TODO connect to backend
        console.log('deny', applicantID)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }


    return(
        <div >
            <b className="posting-text" >Applicants</b>
            <DropdownArrow show={showApplicants} setShow={setShowApplicants}/>
            { posting.applicantsInfo  && showApplicants ?
                posting.applicantsInfo.map((applicant) =>
                    <ApplicantListItem applicant={applicant}
                                       acceptApplicant={acceptApplicant}
                                       denyApplicant={denyApplicant}
                                       key={applicant.id}
                    />)
                : null
            }
            <hr/>
        </div>
    )
}

export default ApplicantSection