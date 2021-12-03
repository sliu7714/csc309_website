import "./styles.css";
import TagRemovable from "./TagRemovable";
import {useState} from "react";

const SearchTag = (search) =>{
    const [currentSearchText, setCurrentSearchText] = useState("")
    // a list of the text in the currently displayed tags
    const [currentTags, setCurrentTags] = useState([])

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


    return(
        <div id="search_section">
            <div id="search_title">Search for Postings: </div>
            <input id="search_bar"
                type="text"
                value={currentSearchText}
                onChange={e => setCurrentSearchText(e.target.value)}
            />

            <button id="add_tag_btn" onClick={() => addTag()}>
                Add tag
            </button>

            <br/>

            {currentTags.map(tagText => <TagRemovable  text={tagText} removeTag={removeTag}/>)}

            <br/>

            <button id="search_btn" onClick={() => search()}>
                Search
            </button>

        </div>
    )
}

export default SearchTag