
import { Component, createRef } from 'react';
import {bat} from './Bat.module.css';

let batWidth = getComputedStyle(document.body).getPropertyValue('--bat-width');
batWidth = +batWidth.slice(0, batWidth.length - 2);


class Bat extends Component {

    webRef= createRef();

    state = {
        position: 0
    }

    throwBallBack = () => {

        let batData = this.webRef.current.getBoundingClientRect()
        let ballData = this.props.ballPos;

        let batCenter = this.state.position + (batData.width / 2);

        if(ballData.y + (ballData.width / 2) > batData.y){ // ballWidth == ballHeight

            if(Math.abs(ballData.x - batCenter) < batData.width / 2) {
                this.props.onBallHit(ballData.x - batCenter);
            }
        }

        if(ballData.y - (ballData.width / 2) > window.innerHeight ) {
            alert('YOu loss');
        }
        


    }

    componentDidUpdate() {
        this.throwBallBack();
    }

    componentDidMount() {
        document.addEventListener("keydown", event => {    
            if(event.key === 'ArrowLeft' && this.state.position > 0 ){
                this.setState(prev => ({position: prev.position - 50}));
            }
            else if(event.key === 'ArrowRight' && this.state.position + (batWidth * 10) < window.innerWidth) {
                this.setState(prev => ({position: prev.position + 50}));
            }
        });
    }



    render() {
        return (
            <div 
                className={bat} 
                ref={this.webRef}
                style={{
                    left: `${this.state.position}px`
                }}
            ></div>
        );
    };
    



}

export default Bat;