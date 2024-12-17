import  { useState, useEffect } from "react";
import BingoBoard from "../components/BingoBoard";
import ScoreBoard from "../components/ScoreBoard";

const generateLines = () => {
  const lines: number[][] = [];

  // Horizontal lines
  for (let i = 0; i < 25; i += 5) {
    lines.push([i, i + 1, i + 2, i + 3, i + 4]);
  }

  // Vertical lines
  for (let i = 0; i < 5; i++) {
    lines.push([i, i + 5, i + 10, i + 15, i + 20]);
  }

  // Diagonal lines
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);

  return lines;
};

const LocalMultiplayer = () => {
  const [player1Numbers, setPlayer1Numbers] = useState(
    Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
  );
  const [player2Numbers, setPlayer2Numbers] = useState(
    Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
  );
  const [markedNumbers, setMarkedNumbers] = useState<{ number: number; player: string }[]>([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerTurn, setPlayerTurn] = useState<"Player 1" | "Player 2">("Player 1");
  const [winner, setWinner] = useState<string | null>(null);

  const lines = generateLines();

  const calculateBingos = (numbers: number[], player: string) => {
    const markedSet = new Set(
      markedNumbers.filter((entry) => entry.player === player).map((entry) => entry.number)
    );

    return lines.filter((line) => line.every((index) => markedSet.has(numbers[index]))).length;
  };

  useEffect(() => {
    const player1Bingos = calculateBingos(player1Numbers, "Player 1");
    const player2Bingos = calculateBingos(player2Numbers, "Player 2");

    setScores({ player1: player1Bingos, player2: player2Bingos });

    if (player1Bingos > 4 || player2Bingos > 4) {
      setWinner(
        player1Bingos > player2Bingos
          ? "Player 1"
          : player2Bingos > player1Bingos
          ? "Player 2"
          : "Draw"
      );
    }
  }, [markedNumbers, player1Numbers, player2Numbers]);

  const handleNumberClick = (number: number) => {
    if (markedNumbers.some((entry) => entry.number === number) || winner) return;

    setMarkedNumbers((prev) => [...prev, { number, player: playerTurn }]);
    setPlayerTurn((prev) => (prev === "Player 1" ? "Player 2" : "Player 1"));
  };

  const handleRestart = () => {
    setPlayer1Numbers(
      Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
    );
    setPlayer2Numbers(
      Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
    );
    setMarkedNumbers([]);
    setScores({ player1: 0, player2: 0 });
    setPlayerTurn("Player 1");
    setWinner(null);
  };

  return (
    <div className="p-10 shadow-lg bg-black bg-opacity-70 border-4 animate-border-blink">
      <h1 className="text-2xl font-bold mb-4">LOCAL MULTIPLAYER</h1>
      <div className="text-lg text-white mb-6">
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 border-1 animate-border-blink"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `🎉 Congratulations ${winner}! You Win! 🎉`
          : `${playerTurn}'s Turn`}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <BingoBoard
          player="Player 1"
          color="#ff6384"
          numbers={player1Numbers}
          markedNumbers={markedNumbers}
          onClickNumber={handleNumberClick}
          disabled={playerTurn !== "Player 1" || !!winner}
        />
        <BingoBoard
          player="Player 2"
          color="#36a2eb"
          numbers={player2Numbers}
          markedNumbers={markedNumbers}
          onClickNumber={handleNumberClick}
          disabled={playerTurn !== "Player 2" || !!winner}
        />
      </div>
      <ScoreBoard scores={scores} />
      
    </div>
  );
};

export default LocalMultiplayer;
