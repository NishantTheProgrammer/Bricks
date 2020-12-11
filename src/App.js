import './App.css';
import Bat from './component/Bat/Bat';
import Ball from './component/Ball/Ball';
import Bricks from './component/Bricks/Bricks';
import { Component, createRef } from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.ballRef = createRef()
  }
  state = {
    ballPos: {x: 300, y: window.innerHeight}
  }

  setBallPos = ballPos => this.setState({ballPos});

  collusionHandler = () => {
    this.ballRef.current.collusionAngleUpdate()
  }

  throwBallBackHandler = diffrence => {
    this.ballRef.current.throwBallBack(diffrence)
  }

  render() {
    return (
      <div className="app">
        <Bat ballPos={this.state.ballPos} onBallHit={this.throwBallBackHandler}/>
        <Ball setBallPos={this.setBallPos} ref={this.ballRef} />
        <Bricks ballPos={this.state.ballPos}  collusion={this.collusionHandler}/>
      </div>
    );
  }

}

export default App;
