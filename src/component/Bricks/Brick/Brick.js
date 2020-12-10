import React, { Component } from "react";
import classes from './Brick.module.css'

class Brick extends Component {
   constructor(props){
       super(props)
       this.webRef= React.createRef();
        
    }


    componentDidMount() {
        let {x, y, width, height} = this.webRef.current.getBoundingClientRect();

        this.props.getBricks(x, y, width, height);

        // console.log(x);
    }

    render() {

        return (
            <div
                 ref={this.webRef}
        
            
            
            style={{gridArea: this.props.template}}
                className={classes.[this.props.data.type]}
                onClick={this.props.remove}
            >{this.props.template}</div>
        );
    }
    

};

export default Brick;