
import { Component } from 'react';
import {bat} from './Bat.module.css';

class Bat extends Component {


    state = {
        position: 40
    }

    componentDidMount() {
        document.addEventListener("keydown", event => {
            let batWidth = getComputedStyle(document.body).getPropertyValue('--bat-width');
            
            batWidth = +batWidth.slice(0, batWidth.length - 2);
            // && this.state.position > (batWidth / 2)


            // console.log(this.state.position + (batWidth / 2), window.innerWidth);
         console.log(batWidth)

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
            <div className={bat} style={{
                left: `${this.state.position}px`
             }}></div>
        );
    };
    



}

export default Bat;