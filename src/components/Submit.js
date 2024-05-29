import '../css/Submit.css';

function Submit(props) {
    return (
        <button type="submit" className="submit-btn">
            {props.message}
        </button>
    )
}

export default Submit;