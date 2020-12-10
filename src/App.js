import './App.css';
import Bat from './component/Bat/Bat';
import Ball from './component/Ball/Ball';
import Bricks from './component/Bricks/Bricks';
import { Component } from 'react';

class App extends Component {


  state = {
    ballPos: {x: 300, y: window.innerHeight}
  }



  componentDidMount() {
    console.log(this.state.ballPos);
  }

  setBallPos = ballPos => this.setState({ballPos});

  render() {

    return (
      <div className="app">
        <Bat />
        <Ball setBallPos={this.setBallPos}/>
        <Bricks ballPos={this.state.ballPos}/>
      </div>
    );
  }

}

export default App;
