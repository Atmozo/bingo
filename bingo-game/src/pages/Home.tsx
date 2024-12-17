import  { useEffect, useState } from "react";


const buttonClasses = "px-4 py-2 rounded-md mb-2 transition duration-300 hover:scale-105 bg-transparent border border-white text-white hover:bg-white hover:text-black";

const randomTexts = [
  "Let's game!",
  "Who's the mastermind?",
  "Ready to win?",
  "Think ahead.",
  "Strategy + Luck = Victory!",
  "Get your 5 points!",
  "Rows, columns, diagonals!",
  "Multiplayer fun starts here!",
  "Challenge accepted?",
];

const generateRandomPosition = () => ({
  top: `${Math.random() * 80}%`, // Random position within 80% height
  left: `${Math.random() * 80}%`, // Random position within 80% width
});

const TypingText = ({ text }: { text: string }) => {
  return (
    <span className="typing-text relative text-white text-lg font-bold animate-typing">
      {text}
    </span>
  );
};

const Home = () => {
  const [floatingTexts, setFloatingTexts] = useState<
    { id: number; text: string; position: { top: string; left: string } }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingTexts((prev) => [
        ...prev,
        {
          id: Math.random(),
          text: randomTexts[Math.floor(Math.random() * randomTexts.length)],
          position: generateRandomPosition(),
        },
      ]);

      // Remove old texts after 5 seconds
      setTimeout(() => {
        setFloatingTexts((prev) => prev.slice(1));
      }, 5000);
    }, 1500); // Add a new text every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black bg-opacity-70 flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black blur-2xl"></div>
      {/* Floating Random Texts */}
      {floatingTexts.map(({ id, text, position }) => (
        <div
          key={id}
          style={{ position: "absolute", ...position }}
          className="animate-float"
        >
          <TypingText text={text} />
        </div>
      ))}
      {/* Main Content */}
      <div className="z-10 p-6 rounded-lg shadow-md border border-white animate-pulse">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Engaging 2-Player Strategy Game
        </h2>
        <p className="text-muted-foreground mb-4 text-center">
          Compete on a 5x5 board to score points by completing rows, columns, or diagonals. Strategy meets luck!
        </p>
        <div className="flex flex-col items-center">
          <button className={buttonClasses}>
            <a href="/local">Multiplayer Local</a>
          </button>
          <button className={buttonClasses}>
            <a href="/ai">Play with AI</a>
          </button>
          <button className={buttonClasses}>
            <a href="/online">Multiplayer Online</a>
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-dashed rounded-[20%] animate-border-blink"></div>
    </div>
  );
};

export default Home;
