import ReactDOM from "react-dom"
import classes from './Brick.module.css'

const Brick = props => {

    console.log(ReactDOM.findDOMNode(this))
    return (
        <div
             ref={el => {
            // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
                if (!el) return;
    
                console.log(el.getBoundingClientRect()); // prints 200px
            }}
    
        
        
        style={{gridArea: props.template}}
            className={classes.[props.data.type]}
            onClick={props.remove}
        >{props.template}</div>
    );
};

export default Brick;