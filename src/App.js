import './App.css';
import Bat from './component/Bat/Bat';
import Ball from './component/Ball/Ball';
import Bricks from './component/Bricks/Bricks';
import { Component, createRef } from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.ballColusionRef = createRef()
  }
  state = {
    ballPos: {x: 300, y: window.innerHeight}
  }

  setBallPos = ballPos => this.setState({ballPos});

  collusionHandler = () => {
    this.ballColusionRef.current.collusionAngleUpdate()
  }


  render() {
    return (
      <div className="app">
        <Bat />
        <Ball setBallPos={this.setBallPos} ref={this.ballColusionRef} />
        <Bricks ballPos={this.state.ballPos}  collusion={this.collusionHandler}/>
      </div>
    );
  }

}

export default App;
