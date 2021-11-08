
import "./styles.css"
import { users } from "../../data/data"

const Stats = (props) => {

    const user = users[props.user]
    return (
        <div className="pcontainer">
            <h1 className="section_title">Stats</h1>
            <ul id="stats">
                <li>Number of Courses: {user.courses.length}</li>
                <li>Number of Groups Made: {user.groups.length}</li>
                <li>Number of Groups A Member Of: {user.groups.length}</li>
            </ul>
        </div>
    )
}

export default Stats