import '../css/IdInput.css';
import Submit from './Submit';

function IdInput() {
    return (
        <div className="id-section">
            <h1>Enter your FPL ID</h1>
            <div className="enter-id">
                <input type="text" className="fpl-id" placeholder="Enter your FPL id"/>
                <Submit message="Enter ID"/>
            </div>
        </div>
    )
}

export default IdInput;