import {useState, useEffect} from "react";
import "./styles.css"
import {NOT_APPLIED, ACCEPTED_APPLICATION, CANCELED_APPLICATION, PENDING_APPLICATION, REJECTED_APPLICATION} from "../../data/constants";
import { applyPost } from "../../actions/postings";

const ApplySection = ({posting, updatePostings}) =>{

    const [applyMsg, setApplyMsg] = useState("")

    // true if user has applied to this post
    const [hasApplied, setHasApplied] = useState(posting.hasApplied ? posting.hasApplied : false)

    const [applicationStatus, setApplicationStatus] = useState(NOT_APPLIED)

    // update applicationStatus every time posting is changed
    useEffect(() =>{
            // look through posting in applicants list for status
            if (posting.application){
                setApplicationStatus(posting.application.applicationStatus)
            }
        }, [])

    const apply = () =>{
        applyPost(posting._id, applyMsg)
        setHasApplied(true) // not needed?
        setApplicationStatus(PENDING_APPLICATION)
        updatePostings()
    }

    return(
        <div>
            <hr />
            {
                !hasApplied ?
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