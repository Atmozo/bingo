
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScoreBoard = ({ scores }: { scores: { player1: number; player2: number } }) => {
  const data = {
    labels: ["Player 1", "Player 2"],
    datasets: [
      {
        label: "Scores",
        data: [scores.player1, scores.player2],
        backgroundColor: ["#ff6384", "#36a2eb"],
        borderColor: ["#388E3C", "#D84315"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-3 rounded-lg shadow-lg bg-black bg-opacity-70 border-2 border animate-border-blink">
      <h3 className="text-lg font-bold text-center text-white mb-4">Score Board</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ScoreBoard;
