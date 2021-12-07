import "./styles.css"
import Tag from "../SearchTag/Tag";

const Courses = (props) => {
    const user = props.user
    return(
        <div className="profile-container profile-card-background">
            <div className="courses profile-contents-container">
                <h1 className="profile-contents-container__h1">
                    { props.isNotCurrentUser ?
                        `${user.name}'s Courses` : "Your Courses"
                    }
                </h1>
                {!user.courses || user.courses.length === 0 ?
                    <div className="profile-contents-container__p">
                        { props.isNotCurrentUser ?
                            <i className="grey-text">no courses</i>
                            :
                            "You do not have any courses"
                        }
                    </div>
                    : user.courses.map(c => <Tag key={c} text={c}/>)
                }
                </div>
        </div>
    )
}

export default Courses

