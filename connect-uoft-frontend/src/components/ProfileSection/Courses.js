
import "./styles.css"
const Courses = (props) => {
    const user = props.user
    const getCourses = () => {
        console.log(user.courses)
        return user.courses;
    }
    return(
        <div className="profile-container profile-card-background">
            <div className="courses profile-contents-container">
                <h1 className="profile-contents-container__h1">My Courses</h1>
                {(getCourses().length === 0)?<div className="profile-contents-container__p">You do not have any courses</div>: getCourses().map(c => <p className="courses__p">{c}</p>)}
                </div>
        </div>
    )
}

export default Courses

