import { useState, useEffect } from "react";

function TicTacToe() {

  const maxPlays = 9;
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [xWin, setXWin] = useState(false);
  const [circolWin, setCircolWin] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [playsAmount, setPlaysAmount] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const handleCellClick = (index) => {

    if (board[index] === "") {
      setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setPlaysAmount(playsAmount + 1);

      if (playsAmount >= maxPlays) setIsGameOver(true);
    }
  }

  const checkGameWin = () => {

    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[7]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[5], board[6]]
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setCircolWin(true);
      if (cells.every(cell => cell === "X")) setXWin(true);
    });

    return null;
  }

  const endGameMessage = () => {

    var message = "";

    if (isGameOver) message = "Fim de jogo";
    if (circolWin) message = "Circulo ganhou";
    if (xWin) message = "X ganhou";

    return message;
  }

  useEffect(checkGameWin, [board]);

  var winnerMessage = endGameMessage();

  const gameScreen = () => {

    return (
      <main>
        <h1 className="title">TIC TAC TOE</h1>
        <div className="board">
          {board.map((item, index) => (
            <div
              key={index}
              className={`cell ${item}`}
              onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </main>
    );
  }

  const endGameScreen = () => {

    return (
      <main>
        <h2 className="endGame">{winnerMessage}</h2 >
      </main >
    );
  }

  if (isGameOver || circolWin || xWin) {

    setTimeout(() => {

      setShowGameOver(true);

    }, 1000);
  }

  return !showGameOver ? gameScreen() : endGameScreen();

}

export default TicTacToe;
