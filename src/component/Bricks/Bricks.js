import { Component } from 'react';
import Brick from './Brick/Brick'
import classes from './Bricks.module.css'

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

    removeBrickHandler = (index, item) => {
        let template = [...this.state.template]
        template[item[1]][item[2]] = '.';

        
        this.setState({template})
    }



    render() {
        let template = [].concat(...this.state.template);
        let gridTemplateAreas = this.state.template.map(item => `'${item.join(' ')}'`).join(' ');

        return (
            <div className={classes.bricks} style={{gridTemplateAreas}}> 
                {
                    this.state.bricksData.map((data, index) => template[index] != '.' ? <Brick
                        key={index} 
                        data={data} 
                        template={template[index]}
                        remove={() => this.removeBrickHandler(index, template[index])}
                    /> : null)
                }
                
            </div>
        );
    }
}

export default Bricks;