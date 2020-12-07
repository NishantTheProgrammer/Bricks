import {Component} from 'react';

import classes from './Ball.module.css';


const N = 10  // how much it will go up on each 2s

class Ball extends Component {
    state = {
        x: 300,
        y: window.innerHeight,
        running: false,
        angle: 95
    }

    // root(sqr(Y) - sqr(N) )
    updatePosition = () => {
        this.setState(prev => {
            
            return{
                y: prev.y - (Math.sin(prev.angle * (Math.PI / 180)) * N),
                x: prev.x + (Math.cos(prev.angle * (Math.PI / 180)) * N)
            }
        })
    }


    componentDidMount() {
        setTimeout(this.updatePosition, 100) //every 2 second
    }
    componentDidUpdate() {
        setTimeout(this.updatePosition, 100) //every 2 second
    }




    render() {
        return (
            <div className={classes.ball} style={{left: `${this.state.x}px`, top: `${this.state.y}px`}}></div>
        )
    }
}

export default Ball;