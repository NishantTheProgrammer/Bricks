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
        let item = [].concat(...this.state.template)[index];
        
        let row = item[1];
        let col = item[2];
        
        
        let template = [...this.state.template]
        // console.log(`template: ${template[row][col]} row: ${row} col: ${col}`);

        let old = template[row][col];
        
        // console.log(template);
        
        if(old !== '.') {
            template[row][col] = '.';
            this.setState({template})
        }
        
    }
    getBricks = (x, y, width, height, index) => {

        let bricksData = [...this.state.bricksData];

        bricksData[index].x = x;
        bricksData[index].y = y;
        bricksData[index].width = width;
        bricksData[index].height = height;

        this.setState({bricksData});

        // this.setState(prev => ({
        //     brickCordinates: [
        //         ...prev.brickCordinates, {
        //             x: x + (width / 2),
        //             y: y + (height / 2),
        //         }
        //     ]
        // }))
    }

    componentDidUpdate() {
       CollusionDetector(this.state.bricksData, this.props.ballPos, item => {
           this.removeBrickHandler(item);
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
                        remove={() => this.removeBrickHandler(index)}
                    /> : null)
                }
                
            </div>
        );
    }
}

export default Bricks;