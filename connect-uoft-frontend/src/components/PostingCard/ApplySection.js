import {useState, useEffect} from "react";
import "./styles.css"
import {NOT_APPLIED, ACCEPTED_APPLICATION, CANCELED_APPLICATION, PENDING_APPLICATION, REJECTED_APPLICATION} from "../../data/constants";

const ApplySection = ({posting, updatePostings}) =>{

    const [applyMsg, setApplyMsg] = useState("")

    const [applicationStatus, setApplicationStatus] = useState(NOT_APPLIED)

    // update applicationStatus every time posting is changed
    useEffect(() =>{
            // look through posting in applicants list for status
            if (posting.applicantsInfo){
                //TODO: make endpoint to check application status for a post?
                const userID = 1; // temp
                const matchingApplicants = posting.applicantsInfo.filter(app => app.id == 1)
                console.log(posting.applicantsInfo, matchingApplicants)
                if (matchingApplicants.length > 0 && matchingApplicants[0].applicationStatus){
                    setApplicationStatus(matchingApplicants[0].applicationStatus)
                    return
                }
            }
            setApplicationStatus(NOT_APPLIED)
        }, [posting])

    // true if user has applied to this post
    const [hasApplied, setHasApplied] = useState(false)

    const apply = () =>{
        // TODO add to backend
        console.log("apply",posting._id )
        // now need to call function in parent to update postings data for frontend to reflect changes
        updatePostings()
    }

    return(
        <div>

            {
                applicationStatus == NOT_APPLIED ?
                    <div>
                        <p className="apply-title">Apply to this group</p>
                        <input className="apply-msg-box"
                               type="text"
                               value={applyMsg}
                               placeholder={"Add a message..."}
                               onChange={(e) => setApplyMsg(e.target.value)}
                        />
                        <button className="apply-msg-button" onClick={apply}>Apply</button>
                    </div>
                    :
                    <div>
                        <div className="posting-text">
                            {/*temporary*/}
                            Application status: {applicationStatus}
                        </div>
                    </div>


            }

        </div>
    )
}

export default ApplySection