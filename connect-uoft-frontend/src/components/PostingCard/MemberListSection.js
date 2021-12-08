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

            {showMemberSection ? <DropdownArrow show={showMembers} setShow={setShowMembers}/>: null}

            { showMembers ?
                <div>
                    <MemberListItem member={posting.creatorInfo} key={posting.creatorID}/>
                    {posting.memberInfo ?
                        posting.memberInfo.map((member) =>
                            <MemberListItem member={member}
                                            key={member.id}
                            />
                        )
                        :
                        null
                    }
                </div>
                :
                null
            }

        </div>

    )

}

export default MemberListSection