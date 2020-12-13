import classes from './Bat.module.css';
const TouchController = props => {
    return (
        <div className={classes.controller}>
            <div onMouseDown={() => props.onMove({key: 'ArrowLeft'})}/>
            <div onMouseDown={() => props.onMove({key: 'ArrowRight'})}/>
        </div>
    );
}

export default TouchController;