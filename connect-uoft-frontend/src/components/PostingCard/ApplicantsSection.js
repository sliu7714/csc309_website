import DropdownArrow from "../DropdownArrow/DropdownArrow";
import {useState, useEffect} from "react";
import ApplicantListItem from "./ApplicantListItem";
import {PENDING_APPLICATION} from "../../data/constants";
import { rejectApplicantPost, acceptApplicantPost } from "../../actions/postings";


const ApplicantSection = ({posting, updatePostings}) => {

    const [showApplicants, setShowApplicants] = useState(false)

    const [pendingApplications, setPendingApplications] = useState([])

    useEffect(()=>{
        if(posting.applicantsInfo){
            setPendingApplications(posting.applicantsInfo.filter(app => app.applicationStatus === PENDING_APPLICATION))
        }

    }, [posting])

    const acceptApplicant =(applicantID) =>{
        // console.log('accept', applicantID, posting._id)
        acceptApplicantPost(applicantID, posting._id)
        updatePostings()
    }

    const denyApplicant = (applicantID) =>{
        // console.log('deny', applicantID)
        rejectApplicantPost(applicantID, posting._id)
        updatePostings()
    }


    return(
        <div >
            <hr />
            <span className="posting-text light-bold" >
                Applicants {pendingApplications.length >0 ? `(${pendingApplications.length})`:null}
            </span>
            <DropdownArrow show={showApplicants} setShow={setShowApplicants}/>
            { showApplicants ?
                pendingApplications  && pendingApplications.length && pendingApplications.length > 0?
                    pendingApplications.map((application) =>
                        <ApplicantListItem application={application}
                                           acceptApplicant={acceptApplicant}
                                           denyApplicant={denyApplicant}
                                           posting={posting}
                                           key={application._id}
                        />
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