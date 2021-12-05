
import "./styles.css"
import { useState } from "react"
import TagRemovable from "../SearchTag/TagRemovable";
const courses = []

const Courses = (props) => {


    // BEGIN TAG SECTION

    const [currentSearchText, setCurrentSearchText] = useState("")
    // a list of the text in the currently displayed tags
    const [currentTags, setCurrentTags] = useState(props.courses)

    // add text from the search bar and clear the search bar
    const addTag = () => {
        if (currentTags.includes(currentSearchText)){
            console.log(`already added tag: ${currentSearchText}`)
        }else{
            setCurrentTags([...currentTags, currentSearchText])
            setCurrentSearchText("")
        }
    }

    const removeTag = (tagText) => {
        setCurrentTags(currentTags.filter(tag => tag !== tagText))
    }

    // return(
    //     <div className="profile-container">
    //         <h1 className="section_title">My Courses</h1>
    //         <br/>
    //         <br/>
    //         <br/>
    //         <input id="search_bar"
    //                type="text"
    //                value={currentSearchText}
    //                onChange={e => setCurrentSearchText(e.target.value)}
    //         />
    //         <button id="add_tag_btn" onClick={() => addTag()}>
    //             Add tag
    //         </button>
    //         <div id='tags_container'>
    //             {currentTags.map(tagText => <TagRemovable  text={tagText} removeTag={removeTag}/>)}
    //         </div>
    //     </div>
    // )

    return(
        <div className="profile-container">
            <div className="courses profile-contents-container">
                <h1 className="profile-contents-container__h1">My Courses</h1>
            
                <br/>
                <br/>
                <br/>
                <input id="search_bar"
                    type="text"
                    value={currentSearchText}
                    onChange={e => setCurrentSearchText(e.target.value)}
                />
                <button className="profile-contents-container__button" id="add_tag_btn" onClick={() => addTag()}>
                    Add tag
                </button>
                <div id='tags_container'>
                    {currentTags.map(tagText => <TagRemovable  text={tagText} removeTag={removeTag}/>)}
                </div>
            </div>
        </div>
    )
    
            

    // END TAG SECTION











    // const [isAddable, setAddable] = useState(true)
    // const preCourses = props.courses
    // const preCourseList = preCourses.map((course) =>{
    //    return <tr className="course">
    //                     <td className="courseName">{course}</td>
    //                     {/* <td className="courseWhen">{course[1]}</td> */}
    //             </tr>
    // })
    // // const numberOfCourses = preCourseList.length
    //
    //
    // const courseHandler = () => {
    //     if(courses.length + preCourseList.length !== 6){
    //         addCourse()
    //     }
    //     else{
    //         setAddable(!isAddable)
    //     }
    // }
    // const addCourse = () => {
    //     const courseName = document.getElementById('add_course_input').value
    //     // const when = document.getElementById("dates").value
    //     if(courseName !== ""){
    //         courses.push(new Course(courseName))
    //
    //     const courseTable = document.getElementById('courses')
    //     const courseTableBody = courseTable.firstElementChild
    //
    //     const newCourse = document.createElement('tr')
    //
    //     const newCourseName = document.createTextNode(courseName)
    //     const newCourseNameContainer = document.createElement('td')
    //     newCourseNameContainer.appendChild(newCourseName)
    //
    //     // const newCourseDay = document.createTextNode(when)
    //     // const newCourseDayContainer = document.createElement('td')
    //     // newCourseDayContainer.appendChild(newCourseDay)
    //
    //
    //     newCourse.appendChild(newCourseNameContainer)
    //     // newCourse.appendChild(newCourseDayContainer)
    //     courseTableBody.appendChild(newCourse)
    //     }
    //
    // }
    // // const preLoadedCourses = preCourseList.map((course, when)=>
    // //     <tr className='course'><td>{course}</td></tr>
    // // )
    //
    //
    // return(
    //     <div className="pcontainer">
    //         <h1 className="section_title">My Courses</h1>
    //         {/* <label for="name">Name:</label> */}
    //         <table id="courses">
    //             <tbody>
    //                 <tr id="add_course_container">
    //                     <td >
    //                         <input placeholder="Add A Course" id="add_course_input"/>
    //                     </td>
    //                     {/* <td>
    //                         <select id="dates">
    //                             <option value="">---Select A Value---</option>
    //                             <option value="Monday">Monday</option>
    //                             <option value="Tuesday">Tuesday</option>
    //                             <option value="Wednesday">Wednesday</option>
    //                             <option value="Thursday">Thursday</option>
    //                             <option value="Friday">Friday</option>
    //                         </select>
    //                     </td> */}
    //                     <td>
    //                         <button className="_button" disabled={!isAddable} onClick={courseHandler}>Add Course</button>
    //                     </td>
    //                 </tr>
    //                 {/* <tr className="course">
    //                     <td className="courseName">CSC309</td>
    //                     <td className="courseWhen">Monday</td>
    //
    //                 </tr> */}
    //                 {preCourseList}
    //             </tbody>
    //         </table>
    //     </div>
    // )
}

export default Courses

