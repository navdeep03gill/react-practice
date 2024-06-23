import React from "react";
import "./App.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      /> // each value prop will either be X, O, or null
    );
  }

  restart() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      status: "New Game",
    });
  }

  tie() {
    if (calculateWinner(this.state.squares) !== null) {
      return false;
    }
    for (let i = 0; i < 9; ++i) {
      console.log(this.state.squares[i]);
      if (!this.state.squares[i]) {
        return false;
      }
    }
    return true;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let ties = this.tie();
    if (ties === true) {
      status = "Tie Game!";
    } else if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="btn-wrapper">
          <button className="restart-button" onClick={() => this.restart()}>
            Restart Game
          </button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log(squares);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
      showContent: true,
      buttonText: "Hide Clock",
    };
  }
  componentDidMount() {
    this.TimerID = setInterval(() => {
      const newT = new Date().toLocaleTimeString();
      this.setState({ currentTime: newT });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClockClick = () => {
    this.setState({
      showContent: !this.state.showContent,
      buttonText: this.state.showContent ? "Show Clock" : "Hide Clock",
    });
  };

  render() {
    return (
      <div className="clock">
        <div className="time-container">
          {this.state.showContent && (
            <h2 className="clock-header">It is {this.state.currentTime}</h2>
          )}
        </div>
        <div className="btn-wrapper">
          <button className="clock-button" onClick={this.handleClockClick}>
            {this.state.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board></Board>
        <Clock></Clock>
      </header>
    </div>
  );
}

export default App;

/*<button onClick={this._showContent(!(this.state.showContent))}></button>*/
