import {Component} from 'react';
import classes from './Ball.module.css';

const N = 5  // how much it will go up on each frame
const FPS = 60
let ballWidth = getComputedStyle(document.body).getPropertyValue('--ball-size');            
ballWidth = +ballWidth.slice(0, ballWidth.length - 2);

class Ball extends Component {
    state = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        running: false,
        angle: 230,
        interval: null
    }

    updatePosition = () => {
        if(this.state.running) {
            this.setState(prev => {
                let updatedAnlge = prev.angle;
                if((prev.x < 0 + (ballWidth * 10 / 2)) || prev.x > window.innerWidth - (ballWidth * 10 / 2)) {
                    updatedAnlge = 180 - prev.angle; // if ball going outside the screen change angle into mirror angle
                }
                else if(prev.y < (ballWidth * 10 / 2)) {
                    updatedAnlge = 360 - prev.angle;
                }
                return {
                    angle: updatedAnlge,
                    y: prev.y - (Math.sin(updatedAnlge * (Math.PI / 180)) * N),
                    x: prev.x + (Math.cos(updatedAnlge * (Math.PI / 180)) * N)
                }
            })
            this.props.setBallPos({x: this.state.x, y: this.state.y, width: ballWidth * 10})
        }
    }

    componentDidMount() {
        let interval = setInterval(() => {
            this.setState({running: this.props.isGameRunning});
            this.updatePosition();
        }, 1000 / FPS);
        this.setState({interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    collusionAngleUpdate = () => {
        this.setState(prev => {
            let updatedAnlge = 180 + prev.angle;
            return {
                angle: updatedAnlge,
                y: prev.y - (Math.sin(updatedAnlge * (Math.PI / 180)) * N),
                x: prev.x + (Math.cos(updatedAnlge * (Math.PI / 180)) * N)
            }
        })
        this.props.setBallPos({x: this.state.x, y: this.state.y, width: ballWidth * 10})
    }

    throwBallBack = diffrence => {
        this.setState(prev => {
            let updatedAnlge = 360 - prev.angle - (diffrence / 2) % 360;  // difference is for adjuct reaction of slope
            return {
                angle: updatedAnlge,
                y: prev.y - (Math.sin(updatedAnlge * (Math.PI / 180)) * N),
                x: prev.x + (Math.cos(updatedAnlge * (Math.PI / 180)) * N)
            }
        })
    }

    render() {
        return (
            <div 
                className={classes.ball} 
                style={{
                    left: `${this.state.x}px`, 
                    top: `${this.state.y}px`
            }} />
        )
    }
}

export default Ball;