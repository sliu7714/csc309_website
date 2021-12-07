import "./styles.css";

const Stats = ({numCourses, numGroupsMade, numMemberships}) => {
    return (
        <div className="profile-container profile-card-background">
            <div className="profile-contents-container">
                <h1 className="profile-contents-container__h1">Statistics</h1>
                <ul className="profile-contents-container__ul">
                    <li className="profile-contents-container__li">Number of Courses: {numCourses ? numCourses : 0}</li>
                    <li className="profile-contents-container__li">Number of Groups Made: {numGroupsMade ? numGroupsMade : 0}</li>
                    <li className="profile-contents-container__li">Number of Groups a Member of: {numMemberships ? numMemberships : 0}</li>
                </ul>
            </div>

        </div>
    );
};

export default Stats;