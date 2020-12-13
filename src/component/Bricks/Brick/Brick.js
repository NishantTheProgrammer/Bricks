import React, { Component } from "react";
import classes from './Brick.module.css'

class Brick extends Component {
    webRef= React.createRef();
    
    componentDidMount() {
        let {x, y, width, height} = this.webRef.current.getBoundingClientRect();
        this.props.getBricks(x, y, width, height);
    }

    render() {

        return (
            <div
                ref={this.webRef}
                style={{gridArea: this.props.template}}
                className={classes[this.props.data.type]}
            ></div>
        );
    }
    

};

export default Brick;