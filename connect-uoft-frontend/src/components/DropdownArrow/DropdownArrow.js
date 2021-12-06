import "./styles.css"

const DropdownArrow = ({show, setShow}) =>{
    return(
        <img className="dropdown-arrow"
             src ={ show ? '/images/up_arrow_icon.svg': '/images/down_arrow_icon.svg'}
             alt ={show ? 'close icon': 'open icon'}
             onClick={() => setShow(!show)}/>
    )
}


export default DropdownArrow