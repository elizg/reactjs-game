import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// functional components are a simpler way to write components that only contain a render method and do not have their own state. Do not define a class that extends React.Component, but write a function that takes props as input and returns what should be rendered. Easier to write and many components are able to be expressed this way. 
// Review this tomorrow and practice writing conversions. 
// class Square extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null,
//         };
//     }

function Square(props) {
    return (
      <button className="square" onClick = { props.onClick }>
        { props.value }
      </button>
    );
  }

//     render() {
//       return (
//         // onClick = { function() {alert('click'); }} > use faf
//         // onClick = {() => this.setState('click')} > 
//         <button className="square" 
//         // re-renders the square when button is clicked to display value
//         onClick = {() => this.props.onClick()} > 

//         { this.props.value }

//         </button>
//       );
//     }
//   }
  
  // to have two child components communicate with each other, declare the shared state in their parent component, which can pass state back down to children via props
  // Lifting state into a parent component is common when React components are refactored
  class Board extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              squares: Array(9).fill(null),
              // first move set to X with boolean
              xIsNext: true,
          };
      }

      handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState( { 
            squares: squares,
            xIsNext: !this.state.xIsNext,
         } );
      }

    renderSquare(i) {
      // return <Square value = {i} />;
      // modified to give each Square a different prop value
      return (
        <Square 
        value = { this.state.squares[i] }
      // add onClick for Square to update state
      // state is private to component that defines it, so can't update Board's state directly from Square...
      // sooo must pass down fx from Board to Square, which will get called when Square is clicked
        onClick = { () => this.handleClick(i) }
            />
        );     
    }
  
    // will display which player is next
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            { this.renderSquare(0) }
            { this.renderSquare(1) }
            { this.renderSquare(2) }
          </div>
          <div className="board-row">
            { this.renderSquare(3) }
            { this.renderSquare(4) }
            { this.renderSquare(5) }
          </div>
          <div className="board-row">
            { this.renderSquare(6) }
            { this.renderSquare(7) }
            { this.renderSquare(8) }
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // Declare winner by adding helper fx
  // return tomorrow to add this!!


  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  