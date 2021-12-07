import {useState} from "react";
import DropdownArrow from "../DropdownArrow/DropdownArrow";
import {PENDING_APPLICATION} from "../../data/constants";
import ApplicantListItem from "./ApplicantListItem";
import MemberListItem from "./MemberListItem";


const MemberListSection = ({showMemberSection, posting}) =>{

    const [showMembers, setShowMembers]  = useState(false) // for dropdown

    // console.log("member section ", posting)

    return(
        <div>

            <hr />
            <span className="posting-text" > Spaces Filled: {posting.members.length + 1} / {posting.capacity}</span>

            {showMemberSection ?
                <DropdownArrow show={showMembers} setShow={setShowMembers}/> : null
            }
            { showMembers ?
                posting.memberInfo && posting.memberInfo.length && posting.memberInfo.length > 0?
                    posting.memberInfo.map((member) =>
                            <MemberListItem member={member}
                                               key={member.id}
                            />
                    )
                    :
                    <div className="grey-text posting-text">
                        no other members
                    </div>
                :
                null
            }

        </div>

    )

}

export default MemberListSection