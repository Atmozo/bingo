

const BingoBoard = ({
  player,
  color,
  numbers,
  markedNumbers,
  onClickNumber,
  disabled,
}: {
  player: string;
  color: string;
  numbers: number[];
  markedNumbers: { number: number; player: string }[];
  onClickNumber: (number: number) => void;
  disabled: boolean;
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg bg-black bg-opacity-70 border-4 animate-border-blink ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-white">{player}</h2>
      <div className="grid grid-cols-5 gap-3 ">
        {numbers.map((number) => {
          const markedBy = markedNumbers.find((entry) => entry.number === number)?.player;
          const isMarkedByCurrentPlayer = markedBy === player;

          return (
            <button
              key={number}
              data-number={number}
              className={`w-16 h-16 flex items-center justify-center border rounded transition duration-200 boarder-1 animate-border-blink ${
                markedBy
                  ? isMarkedByCurrentPlayer
                    ? "bg-opacity-70 text-white"
                    : "bg-gray-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              style={{
                backgroundColor: isMarkedByCurrentPlayer ? color : undefined,
              }}
              onClick={() => onClickNumber(number)}
              disabled={!!markedBy}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BingoBoard;
