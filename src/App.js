import './App.css';
import Bat from './component/Bat/Bat';
import Ball from './component/Ball/Ball';
import Bricks from './component/Bricks/Bricks';
import { Component, createRef } from 'react';

class App extends Component {
  ballRef = createRef()

  state = {
    ballPos: {x: 300, y: window.innerHeight},
    isGameRunning: false
  }

  setBallPos = ballPos => this.setState({ballPos});

  collusionHandler = () => {
    this.ballRef.current.collusionAngleUpdate()
  }

  throwBallBackHandler = diffrence => {
    this.ballRef.current.throwBallBack(diffrence)
  }

  componentDidMount() {
      window.addEventListener("resize", () => { 
        window.location.reload();
        alert("Sorry currently we don't support resizing, Have to reload");
      });
  }

  startGameHandler = () => { this.state.isGameRunning || this.setState({isGameRunning: true}) }

  render() {
    return (
      <div className="app">
        <Bat ballPos={this.state.ballPos} onStartGame={this.startGameHandler} onBallHit={this.throwBallBackHandler}/>
        <Ball setBallPos={this.setBallPos} isGameRunning={this.state.isGameRunning} ref={this.ballRef} />
        <Bricks ballPos={this.state.ballPos}  collusion={this.collusionHandler}/>
      </div>
    );
  }
}

export default App;
