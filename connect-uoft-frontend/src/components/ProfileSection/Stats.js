import "./styles.css";
import { useState } from "react";
import { users } from "../../data/data";
import { getUserCreatedPostings, getUserMemberPostings } from "../../actions/postings";

const Stats = (props) => {
    const [createdPostings, setCreatedPostings] = useState([])
    const [joinedPostings, setJoinedPostings] = useState([])

    const user = props.user
    
    function getNumCourses(){
        return user.courses.length;
    }
    function getNumGroupsMade(){
        getUserCreatedPostings(setCreatedPostings);
        return createdPostings.length
    }
    function getMembershipGroups(){
        getUserMemberPostings(setJoinedPostings)
        return joinedPostings.length
    }
    return (
        <div className="profile-container profile-card-background">
            <div className="profile-contents-container">
                <h1 className="profile-contents-container__h1">Statistics</h1>
                <ul className="profile-contents-container__ul">
                    <li className="profile-contents-container__li">Number of Courses: {getNumCourses()}</li>
                    <li className="profile-contents-container__li">Number of Groups Made: {getNumGroupsMade()}</li>
                    <li className="profile-contents-container__li">Number of Groups A Member Of: {getMembershipGroups()}</li>
                </ul>
            </div>

        </div>
    );
};

export default Stats;