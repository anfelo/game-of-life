import React, { Component } from 'react';
import './App.css';

const getRandCells = () => {
  const bool = [true,false];
  let cells = [];
  for(let i = 0; i < 30; i++) {
    let row = [];
    for(let j = 0; j < 50; j++) {
      let randBool = Math.floor(Math.random() * 2);
      row.push({alive:bool[randBool]});
    }
    cells.push(row);
  }
  return cells;
};

class Cell extends Component {

  toggleAlive = () => {
    this.props.toggleAlive(this.props.index);
  };
  
  render() {
    let stateClass;
    (this.props.alive)
    ? stateClass = "cell alive"
    : stateClass = "cell death"
    return (
      <div className={stateClass} onClick={this.toggleAlive}></div>
    );
  }
  
}

const GameGrid = props => {

  const arrCells = props.cells.reduce((acc, curr, index) => {
    return acc.concat(curr);
  },[]);

  const mapCells = arrCells.map((cell,index) => {
    return <Cell alive={cell.alive} key={index} index={index} toggleAlive={props.toggleAlive}/>
  });

  return (
		<div className="game-grid">
			{mapCells}
		</div>
	);
}

const Counter = props => {
  return (
		<div className="counter-wrapper">
			<h2>{props.count}</h2>
		</div>
	);
}

class ActionBar extends Component {

  onClear = (e) => {
    this.props.onClear();
  };

  onPlay = (e) => {
    this.props.onPlay();
  };

  onPause = (e) => {
    this.props.onPause();
  };

  onRand = (e) => {
    this.props.onRand();
  };

  render() {
    return (
      <div className="actions-wrapper">
        <button type="button" className="button play-button" onClick={this.onPlay}>Play</button>
        <button type="button" className="button pause-button" onClick={this.onPause}>Pause</button>
        <button type="button" className="button clear-button" onClick={this.onClear}>Clear</button>
        <button type="button" className="button reflex-button" onClick={this.onRand}>↺</button>
      </div>
    );
  }
}

class FigureBar extends Component {

  onFigureChange = (e) => {
    this.props.onFigureChange(e.target.getAttribute("data-figure"));
  };
  
  render() {
    return (
      <div className="figures-wrapper">
        <div className="figure blinker" onClick={this.onFigureChange} data-figure="blinker" title="Blinker"></div>
        <div className="figure beacon" onClick={this.onFigureChange} data-figure="beacon" title="Beacon"></div>
        <div className="figure toad" onClick={this.onFigureChange} data-figure="toad" title="Toad"></div>
        <div className="figure pulsar" onClick={this.onFigureChange} data-figure="pulsar" title="Pulsar"></div>
      </div>
    );
  }
}

const Header = () => {
  return (
    <div className="header-wrapper">
      <h1>Game of Life (ReactJS)</h1>
      <p>Feel free to click on the board to add more cells to the simulation</p>
    </div>
  );
}

class Gameboard extends Component {
  
  constructor() {
    super();
    this.state = {
      cells: getRandCells(),
      running: true,
      count: 0,
    };
    setInterval(this.nextGeneration, 300);
  } 

  nextGeneration = () => {
    if(this.state.running) {
      const newState = this.state.cells.map((row,rowIndex,cellsArr) => {
        return row.map((cell,colIndex,rowArr) => {
          if(rowIndex === 0) {
            if(colIndex === 0) {
              let aliveCounter = 0;
              if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][ rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][ rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][colIndex + 1].alive) aliveCounter++;
              
              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            } else if(colIndex === rowArr.length - 1) {
                let aliveCounter = 0;
                if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
                if(cellsArr[rowIndex + 1][colIndex - 1].alive) aliveCounter++;
                if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
                if(cellsArr[rowIndex][0].alive) aliveCounter++;
                if(cellsArr[rowIndex + 1][0].alive) aliveCounter++;
                if(cellsArr[cellsArr.length - 1][0].alive) aliveCounter++;
                if(cellsArr[cellsArr.length - 1][colIndex].alive) aliveCounter++;
                if(cellsArr[cellsArr.length - 1][colIndex - 1].alive) aliveCounter++;

                if(cell.alive){
                  if(aliveCounter < 2) return { alive:false }
                  if(aliveCounter > 3) return { alive:false }
                  return { alive:true }
                } else {
                  if(aliveCounter === 3) return { alive:true }
                  return { alive:false }
                }
            } else {
              let aliveCounter = 0;
              if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[cellsArr.length - 1][colIndex - 1].alive) aliveCounter++;

              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            }
          } else if(rowIndex === cellsArr.length - 1) {
            if(colIndex === 0) {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][ rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][ rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[0][rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[0][colIndex].alive) aliveCounter++;
              if(cellsArr[0][colIndex + 1].alive) aliveCounter++;
              
              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            } else if(colIndex === rowArr.length - 1) {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][0].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][0].alive) aliveCounter++;
              if(cellsArr[0][0].alive) aliveCounter++;
              if(cellsArr[0][colIndex].alive) aliveCounter++;
              if(cellsArr[0][colIndex - 1].alive) aliveCounter++;

              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            } else {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[0][colIndex].alive) aliveCounter++;
              if(cellsArr[0][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[0][colIndex - 1].alive) aliveCounter++;

              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            }
          } else {
            if(colIndex === 0) {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][rowArr.length - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][rowArr.length - 1].alive) aliveCounter++;
              
              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            } else if(colIndex === rowArr.length - 1) {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][0].alive) aliveCounter++;
              if(cellsArr[rowIndex][0].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][0].alive) aliveCounter++;
              
              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            } else {
              let aliveCounter = 0;
              if(cellsArr[rowIndex - 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex - 1][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex][colIndex + 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex - 1].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex].alive) aliveCounter++;
              if(cellsArr[rowIndex + 1][colIndex + 1].alive) aliveCounter++;
              
              if(cell.alive){
                if(aliveCounter < 2) return { alive:false }
                if(aliveCounter > 3) return { alive:false }
                return { alive:true }
              } else {
                if(aliveCounter === 3) return { alive:true }
                return { alive:false }
              }
            }
          }
        });
      });
      let count = this.state.count + 1;
      this.setState({ 
        cells: newState,
        count: count,
      });
    }
  };

  toggleAlive = (index) => {
    const rowNum = Math.floor(index/(this.state.cells[0].length));
    const colNum = index - rowNum * this.state.cells[0].length;
    const newState = this.state.cells.map((row,rowIndex) => {
      if(rowIndex === rowNum){
        return row.map((cell,colIndex) => {
          if(colIndex === colNum) {
            if(this.state.cells[rowNum][colNum].alive) return { alive:false };
            return { alive:true };
          } else {
            return cell;
          }
        });
      }
      return row;
    });
    this.setState({ cells:newState });
  };

  onFigureChange = (figure) => {
    let newState;
    switch (figure) {
      case "blinker":
      newState = this.state.cells.map((row,rowIndex) => {
        return row.map((cell,colIndex) => {
          if(rowIndex === 14 && (colIndex === 24 || colIndex === 25 || colIndex === 26)) return { alive:true };
          return {alive:false};
        });
      });
      break;
      case "beacon":
      newState = this.state.cells.map((row,rowIndex) => {
        return row.map((cell,colIndex) => {
          if((rowIndex === 12 || rowIndex === 13) && (colIndex === 23 || colIndex === 24)) {
            return { alive:true };
          } else if((rowIndex === 14 || rowIndex === 15) && (colIndex === 25 || colIndex === 26)) {
            return { alive:true };
          } 
          return {alive:false};
        });
      });
      break;
      case "toad":
      newState = this.state.cells.map((row,rowIndex) => {
        return row.map((cell,colIndex) => {
          if(rowIndex === 13 && (colIndex === 24 || colIndex === 25 || colIndex === 26)) {
            return { alive:true };
          } else if(rowIndex === 14 && (colIndex === 25 || colIndex === 26 || colIndex === 27)) {
            return { alive:true };
          }
          return {alive:false};
        });
      });
      break;
      case "pulsar":
      let xOrigin = 8;
      let yOrigin = 19;
      newState = this.state.cells.map((row,rowIndex) => {
        return row.map((cell,colIndex) => {
          if((rowIndex === xOrigin || rowIndex === xOrigin + 5 || rowIndex === xOrigin + 7 || rowIndex === xOrigin + 12) && (colIndex === yOrigin + 2 || colIndex === yOrigin + 3 || colIndex === yOrigin + 4 || colIndex === yOrigin + 8 || colIndex === yOrigin + 9 || colIndex === yOrigin + 10)) {
            return { alive:true };
          } else if((rowIndex === xOrigin + 2 || rowIndex === xOrigin + 3 || rowIndex === xOrigin + 4 || rowIndex === xOrigin + 8 || rowIndex === xOrigin + 9 || rowIndex === xOrigin + 10) && (colIndex === yOrigin || colIndex === yOrigin + 5 || colIndex === yOrigin + 7 || colIndex === yOrigin + 12)) {
            return { alive:true };
          }
          return {alive:false};
        });
      });
      break;
      default:
      break;
    }
    this.setState({
      cells: newState,
      running: true,
      count: 0,
    });
  }

  onClear = () => {
    const clearState = this.state.cells.map((row) => {
      return row.map((cell) => {
        return {alive:false};
      });
    });
    this.setState({
      cells:clearState,
      running:false,
      count: 0,
    });
  };

  onPlay = () => {
    this.setState({running:true});
  };

  onPause = () => {
    this.setState({running:false});
  };

  onRand = () => {
    const cells = getRandCells();
    this.setState({
      cells: cells,
      running: true,
      count:0,
    });
  };

  render() {
    return (
      <div className="gameboard-wrapper">
        <Header />
        <Counter count={this.state.count}/>
        <FigureBar onFigureChange={this.onFigureChange}/>
        <GameGrid cells={this.state.cells} toggleAlive={this.toggleAlive}/>
        <ActionBar onClear={this.onClear} onPlay={this.onPlay} onPause={this.onPause} onRand={this.onRand}/>
      </div>
    );
  }
}

export default Gameboard;
