
import "./styles.css"
import { useState } from "react"
const courses = []
class Course {
    constructor(course){
        this.course = course
    }
}
const Courses = (props) => {
    const [isAddable, setAddable] = useState(true)
    const preCourses = props.courses
    const preCourseList = preCourses.map((course) =>{
       return <tr className="course">
                        <td className="courseName">{course}</td>
                        {/* <td className="courseWhen">{course[1]}</td> */}
                </tr>
    })
    // const numberOfCourses = preCourseList.length
    

    const courseHandler = () => {
        if(courses.length + preCourseList.length !== 6){
            addCourse()
        }
        else{
            setAddable(!isAddable)
        }
    }
    const addCourse = () => {
        const courseName = document.getElementById('add_course_input').value
        const when = document.getElementById("dates").value
        if(courseName !== ""){
            courses.push(new Course(courseName))
        
        const courseTable = document.getElementById('courses')
        const courseTableBody = courseTable.firstElementChild
        
        const newCourse = document.createElement('tr')

        const newCourseName = document.createTextNode(courseName)
        const newCourseNameContainer = document.createElement('td')
        newCourseNameContainer.appendChild(newCourseName)

        const newCourseDay = document.createTextNode(when)
        const newCourseDayContainer = document.createElement('td')
        newCourseDayContainer.appendChild(newCourseDay)

        
        newCourse.appendChild(newCourseNameContainer)
        newCourse.appendChild(newCourseDayContainer)
        courseTableBody.appendChild(newCourse)
        }
    
    }
    // const preLoadedCourses = preCourseList.map((course, when)=>
    //     <tr className='course'><td>{course}</td></tr>
    // )
    

    return(
        <div className="pcontainer">
            <h1 className="section_title">My Courses</h1>
            {/* <label for="name">Name:</label> */}
            <table id="courses">
                <tbody>
                    <tr id="add_course_container">
                        <td >
                            <input placeholder="Add A Course" id="add_course_input"/>
                        </td>
                        {/* <td>
                            <select id="dates">
                                <option value="">---Select A Value---</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </td> */}
                        <td>
                            <button className="_button" disabled={!isAddable} onClick={courseHandler}>Add Course</button>
                        </td>
                    </tr>
                    {/* <tr className="course">
                        <td className="courseName">CSC309</td>
                        <td className="courseWhen">Monday</td>

                    </tr> */}
                    {preCourseList}
                </tbody>
            </table>
        </div>
    )
}

export default Courses

