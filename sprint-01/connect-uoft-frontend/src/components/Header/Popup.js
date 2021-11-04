import React from 'react';
import './Popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="createButton">
            <div className="innerCreate">
                <h3 className="createHeader"> Create Posting </h3>
                <form>
                    <form className="tagForm" on onSubmit={addTagFunction()}> 
                        
                        <ul className="tagList">
                            <li>
                            <label>
                            <input className="smallInput" type="text" name="tag" placeholder="Tags" maxlength="6" />
                            </label>
                            </li>
                            <li>
                            <input className="smallInput" type="submit" value="Add" />
                            </li>
                        </ul>
                    </form>
                    <ul className="inputList">
                        <li>
                            <label>
                            <input className="standardInput" type="text" name="postingTitle" placeholder="Title" />
                            </label>
                        </li>
                        <li>
                            <label>
                            <textarea className="descriptionInput" type="text" name="postingDescription" placeholder="Description"/>
                            </label>
                        </li>
                        <li>
                            <label>
                            <input className="standardInput"
                                name="numberOfGuests"
                                type="number"
                                placeholder="Group Capacity"
                                />
                            </label>
                        </li>
                        <input type="submit" value="Submit" />
                    </ul>
                </form>
                <button className="closeButton" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)


function addTagFunction (e) {

	console.log('Adding a tag')

    const tagName = document.querySelector('smallInputTag')
    const tagList = document.getElementsByClassName("tagList");

    const listElement = document.createElement('li')
    listElement.className = 'tagList'
    listElement.appendChild(document.createTextNode(tagName))

	try {
			tagList.appendChild(listElement)
	} catch (e) {
		console.log('Failed to add tag')
	}

}

export default Popup