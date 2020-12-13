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
        let bricksData = []
        let template = []
        let col = 10;
        let row = 4;
        for(let i = 0; i < col * row; i++) {
            let randomValue = Math.floor(Math.random() * 100);
            let type = null;
            if(randomValue < 80) { type = 'normal'; }
            else if( randomValue < 85) {type = 'bomb'}
            else if( randomValue < 90) {type = 'row'}
            else if( randomValue < 95) {type = 'plus'}
            else {type = 'random'}

            bricksData.push({type});  
        }
        for(let i = 0; i < row; i++) {
            let tempArray = []
            for(let j = 0; j < col; j++) {
                tempArray.push(`a${i}${j}`)
            }
            template.push(tempArray);
        }
        this.setState({bricksData, template});
    }

    removeBrickHandler = (index, type) => {
        let sound = new Audio(`./sounds/${type}.mp3`);
        let row = index.toString()[0];
        let col = index.toString()[1];
        if(col === undefined) { // if index isn't two digit number
            col = row;
            row = 0;
        }
        let template = [...this.state.template];
        if(template[row][col] !== '.') {
            if(type === 'normal') {
                template[row][col] = '.'
            }
            else if(type === 'bomb') {
                template[row][col] = '.' 

                let colUpperLimit = template[0].length;
                let rowUpperLimit = template.length;               
                for(let r = Number(row) - 1; r <= Number(row) + 1; r++) {  // run 3 * 3 times
                    for(let c = Number(col) -1; c <= Number(col) + 1; c++) { // c++ ko salam, run 3 times
                        if((r < rowUpperLimit && c < colUpperLimit) && (r >= 0 && c >= 0)) {
                            template[r][c] = '.';
                        }
                    }
                }
            }
            else if(type === 'row') {
                for(let i = 0; i < template[0].length; i++) {
                    template[row][i] = '.' 
                }
            }
            else if(type === 'plus') {
                for(let i = 0; i < template[0].length; i++) {   //to remove horizontal element of plus
                    template[row][i] = '.' 
                }
                for(let i = 0; i < template.length; i++) {      // to remove vertical element of plus (template.lenght == 4)
                    template[i][col] = '.' 
                }
            }
            else if(type === 'random') {
                let rationOfVanishableElements = 10;            // it should remove 10% of the template

                for(let i = 0; i < template[0].length; i++) {   //to remove horizontal element of plus
                    for(let j = 0; j < template.length; j++) {      // to remove vertical element of plus (template.lenght == 4)
                        if(Math.floor(Math.random() * 100) < rationOfVanishableElements) {
                            template[j][i] = '.';
                        }
                    } 
                }
                template[row][col] = '.';
            }
            sound.play();
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
        let template = [].concat(...this.state.template);
        let remaining = this.state.bricksData.reduce((sum, _, index) => sum + (template[index] === '.' ? 0 : 1), 0);
        
        if(remaining === 0) {
            window.location.reload();
            alert('You WON, wanna play again?');
        }
        CollusionDetector(this.state.bricksData, this.props.ballPos, (index, angle) => {
            if(this.removeBrickHandler(index, this.state.bricksData[index].type)) {
                this.props.collusion(angle);
            }
        });

    }

    render() {
        let template = [].concat(...this.state.template);
        let gridTemplateAreas = this.state.template.map(item => `'${item.join(' ')}'`).join(' ');
        return (
            <div className={classes.bricks} style={{gridTemplateAreas, gridTemplateRows: `repeat(${this.state.template.length}, var(--brick-size))`}}> 
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