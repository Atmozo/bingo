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

const HumanVsAI = () => {
  const [humanNumbers] = useState(
    Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
  );
  const [aiNumbers] = useState(
    Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
  );
  const [markedNumbers, setMarkedNumbers] = useState<{ number: number; player: string }[]>([]);
  const [scores, setScores] = useState({ human: 0, ai: 0 });
  const [turn, setTurn] = useState<"Human" | "AI" | null>("Human");
  const [winner, setWinner] = useState<string | null>(null);
  const [completedLines, setCompletedLines] = useState(new Set<number>());

  const lines = generateLines();

  const calculateBingos = (player: string) => {
    const playerMarked = markedNumbers.filter((entry) => entry.player === player).map((entry) => entry.number);

    return lines.filter((line, index) => {
      if (completedLines.has(index)) return false;

      const isCompleted = line.every((num) => playerMarked.includes(num));
      if (isCompleted) setCompletedLines((prev) => new Set(prev).add(index));

      return isCompleted;
    }).length;
  };

  const checkGameOver = () => {
    const allMarked = new Set(markedNumbers.map((entry) => entry.number));
    const totalBingos = completedLines.size;

    return allMarked.size === 25 || totalBingos === lines.length;
  };

  const aiMove = () => {
    const aiMarked = markedNumbers.filter((entry) => entry.player === "AI").map((entry) => entry.number);
    const allMarked = new Set(markedNumbers.map((entry) => entry.number));

    for (const line of lines) {
      const unmarkedInLine = line.filter((num) => !allMarked.has(num));
      const aiInLine = line.filter((num) => aiMarked.includes(num));

      if (aiInLine.length === 4 && unmarkedInLine.length === 1) {
        return unmarkedInLine[0];
      }
    }

    const humanMarked = markedNumbers.filter((entry) => entry.player === "Human").map((entry) => entry.number);
    for (const line of lines) {
      const unmarkedInLine = line.filter((num) => !allMarked.has(num));
      const humanInLine = line.filter((num) => humanMarked.includes(num));

      if (humanInLine.length === 4 && unmarkedInLine.length === 1) {
        return unmarkedInLine[0];
      }
    }

    const priority = new Map<number, number>();
    for (const line of lines) {
      line.forEach((num) => {
        if (!allMarked.has(num)) {
          priority.set(num, (priority.get(num) || 0) + 1);
        }
      });
    }

    return Array.from(priority.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
  };

  useEffect(() => {
    const humanBingos = calculateBingos("Human");
    const aiBingos = calculateBingos("AI");

    setScores({ human: humanBingos, ai: aiBingos });

    if (checkGameOver()) {
      setWinner(
        humanBingos > aiBingos ? "Human" : aiBingos > humanBingos ? "AI" : "Draw"
      );
      setTurn(null);
    } else if (turn === "AI" && !winner) {
      const aiChoice = aiMove();
      if (aiChoice !== undefined) {
        setTimeout(() => {
          setMarkedNumbers((prev) => [...prev, { number: aiChoice, player: "AI" }]);
          setTurn("Human");
        }, 1000);
      }
    }
  }, [markedNumbers, turn]);

  const handleNumberClick = (number: number) => {
    if (turn !== "Human" || winner) return;

    setMarkedNumbers((prev) => [...prev, { number, player: "Human" }]);
    setTurn("AI");
  };

  const handleRestart = () => {
    setMarkedNumbers([]);
    setScores({ human: 0, ai: 0 });
    setTurn("Human");
    setWinner(null);
    setCompletedLines(new Set());
  };

  return (
    <div className="p-10 shadow-lg bg-black bg-opacity-70 border-4 animate-border-blink">
      <h1 className="text-2xl font-bold mb-4">Human vs AI (many funcs still under production )</h1>
      
      <div className="text-lg text-white mb-6">
        {winner
          ? winner === "Draw"
            ? "It's a Draw! 🤝"
            : `🎉 ${winner} Wins! 🎉`
          : turn === "Human"
          ? "Your Turn"
          : "AI is Thinking..."}
      </div>
       <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleRestart}
        >
          Restart Game
        </button>
       </div>
    
      <div className="flex flex-col md:flex-row items-center gap-8">
        <BingoBoard
          player="Human"
          color="#ff6384"
          numbers={humanNumbers}
          markedNumbers={markedNumbers}
          onClickNumber={handleNumberClick}
          disabled={turn !== "Human" || !!winner}
        />
        <BingoBoard
          player="AI"
          color="#36a2eb"
          numbers={aiNumbers}
          markedNumbers={markedNumbers}
          onClickNumber={() => {}}
          disabled={true}
        />
      </div>
      <ScoreBoard scores={{ player1: scores.human, player2: scores.ai }} />
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default HumanVsAI;
