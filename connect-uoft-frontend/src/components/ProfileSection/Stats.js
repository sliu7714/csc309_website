import "./styles.css";
import { users } from "../../data/data";

const Stats = (props) => {

    const user = users[props.user]
    
    function getNumCourses(){
        return user.courses.length;
    }
    function getNumGroupsMade(){
        return user.postings.length;
    }
    function getMembershipGroups(){
        return user.groups.length;
    }
    return (
        <div className="profile-container">
            <div className="contents-container">
                <h1 className="contents-container__h1">Statistics</h1>
                <ul className="contents-container__ul">
                    <li className="contents-container__li">Number of Courses: {getNumCourses()}</li>
                    <li className="contents-container__li">Number of Groups Made: {getNumGroupsMade()}</li>
                    <li className="contents-container__li">Number of Groups A Member Of: {getMembershipGroups()}</li>
                </ul>
            </div>

        </div>
    );
};

export default Stats;