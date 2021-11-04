import "./styles.css"

const TagRemovable = ({text, removeTag}) =>{

    return(
        <div className="tag">
            {text}
            <img id="close_icon"
                 src="/images/close_icon.svg"
                 alt="close icon"
                 onClick={() => removeTag(text)}
            />
        </div>
    )
}

export default TagRemovable