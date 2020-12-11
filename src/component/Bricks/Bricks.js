import { Component } from 'react';
import Brick from './Brick/Brick'
import classes from './Bricks.module.css'
import CollusionDetector from './CollusionDetector';

class Bricks extends Component {

    state = {
        bricksData: [],
        template: []
    }

    componentDidMount() {
        let brickTypes = ['normal', 'bomb']; //Magical brick uska bhi types or
        let bricksData = []
        let template = []
        for(let i = 0; i < 40; i++) {
            bricksData.push({type: brickTypes[Math.floor(Math.random() * brickTypes.length)]});  
        }
        for(let i = 0; i < 4; i++) {
            let tempArray = []
            for(let j = 0; j < 10; j++) {
                tempArray.push(`a${i}${j}`)
            }
            template.push(tempArray);
        }

        this.setState({bricksData, template});

    }

    removeBrickHandler = (index) => {
        let row = index.toString()[0];
        let col = index.toString()[1];
        if(col === undefined) { // if index isn't two digit number
        col = row;
        row = 0;
    }
    let template = [...this.state.template];
        if(template[row][col] !== '.') {
            template[row][col] = '.'    // because this in direcly mutating state due to it's copying 2d array which is pointing to state        
            return true
        }
        else return false;
    }
    getBricks = (x, y, width, height, index) => {
        let bricksData = [...this.state.bricksData];

        bricksData[index].x = x + (width / 2);
        bricksData[index].y = y + (height / 2);
        bricksData[index].width = width;
        bricksData[index].height = height;

        this.setState({bricksData});
    }

    componentDidUpdate() {
       CollusionDetector(this.state.bricksData, this.props.ballPos, index => {
            if(this.removeBrickHandler(index)) {
                this.props.collusion();
            }
       });

    }



    render() {
        let template = [].concat(...this.state.template);
        let gridTemplateAreas = this.state.template.map(item => `'${item.join(' ')}'`).join(' ');

        return (
            <div className={classes.bricks} style={{gridTemplateAreas}}> 
                {
                    this.state.bricksData.map((data, index) => template[index] !== '.' ? <Brick
                        getBricks={(x, y, width, height) => this.getBricks(x, y, width, height, index)}
                        key={index} 
                        
                        data={data} 
                        template={template[index]}
                    /> : null)
                }
                
            </div>
        );
    }
}

export default Bricks;