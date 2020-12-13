import { Component, createRef, Fragment } from 'react';
import {bat} from './Bat.module.css';
import TouchController from './TouchController';

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
                let sound = new Audio(`./sounds/ballBat.mp3`);
                sound.volume= 0.5;
                this.props.onBallHit(ballData.x - batCenter);
                sound.play();
            }
        }
        if(ballData.y - (ballData.width / 2) > window.innerHeight ) {
            window.location.reload();
            alert('You loss');
        }
    }

    componentDidUpdate() { this.throwBallBack() }

    componentDidMount() {
        document.addEventListener("keydown", this.moveHandler);
    }

    moveHandler = event => {
        let updateAmount = 30;
        if(event.key === 'ArrowLeft' && this.state.position > 0 ){
            this.props.onStartGame();
            this.setState(prev => ({position: prev.position - updateAmount}));
        }
        else if(event.key === 'ArrowRight' && this.state.position + (batWidth * 10) < window.innerWidth) {
            this.props.onStartGame();
            this.setState(prev => ({position: prev.position + updateAmount}));
        }
    }

    render() {
        return (
            <Fragment>
                <TouchController onMove={this.moveHandler}/>
                <div 
                    className={bat} 
                    ref={this.webRef}
                    style={{
                        left: `${this.state.position}px`
                    }}
                ></div>
            </Fragment>
        );
    };
}

export default Bat;