import GameHeader from "./components/GameHeader";
import { useState, useEffect } from "react";

const App = () => {
  const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);

  const [fruits, setFruits] = useState(() =>
    shuffleCards([
      { id: 1, name: "apple", emoji: "🍎", isFlipped: false, isMatched: false },
      { id: 2, name: "apple", emoji: "🍎", isFlipped: false, isMatched: false },
      {
        id: 3,
        name: "banana",
        emoji: "🍌",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 4,
        name: "banana",
        emoji: "🍌",
        isFlipped: false,
        isMatched: false,
      },
      { id: 5, name: "grape", emoji: "🍇", isFlipped: false, isMatched: false },
      { id: 6, name: "grape", emoji: "🍇", isFlipped: false, isMatched: false },
      {
        id: 7,
        name: "orange",
        emoji: "🍊",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 8,
        name: "orange",
        emoji: "🍊",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 9,
        name: "strawberry",
        emoji: "🍓",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 10,
        name: "strawberry",
        emoji: "🍓",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 11,
        name: "blueberry",
        emoji: "🫐",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 12,
        name: "blueberry",
        emoji: "🫐",
        isFlipped: false,
        isMatched: false,
      },
      { id: 13, name: "kiwi", emoji: "🥝", isFlipped: false, isMatched: false },
      { id: 14, name: "kiwi", emoji: "🥝", isFlipped: false, isMatched: false },
      {
        id: 15,
        name: "watermelon",
        emoji: "🍉",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 16,
        name: "watermelon",
        emoji: "🍉",
        isFlipped: false,
        isMatched: false,
      },
    ]),
  );

  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchTracker, setMatchTracker] = useState([]);
  const [winDialog, setWinDialog] = useState(false);
  const [shuffleCardBtn, setShuffleCardBtn] = useState(false);

  const handleClick = (fruit) => {
    if (flippedCards.length == 2 || fruit.isFlipped || fruit.isMatched) return;

    const newFruits = fruits.map((f) =>
      f.id === fruit.id ? { ...f, isFlipped: true } : f,
    );
    setMatchTracker([...matchTracker, fruit]);
    setFruits(newFruits);
    setFlippedCards([...flippedCards, fruit]);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(fruits.map((fruit) => fruit.name + " " + fruit.id));
  }, []);

  useEffect(() => {
    const filteredCards = fruits.filter((fruit) => fruit.isFlipped === true);

    if (filteredCards.length === 16) {
      setWinDialog((prev) => !prev);
    }
  }, [score]);

  const handleReset = () => {
    setFruits((prev) =>
      prev.map((f) => ({ ...f, isFlipped: false, isMatched: false })),
    );
    setScore(0);
    setMoves(0);
  };

  const handleContinue = () => {
    setFruits((prev) =>
      prev.map((f) => ({ ...f, isFlipped: false, isMatched: false })),
    );
    const shuffledFruits = shuffleCards(fruits);
    if (shuffleCardBtn) {
      setFruits(shuffledFruits);
    }
    setShuffleCardBtn((prev) => !prev);
    setMoves(0);
    setWinDialog((prev) => !prev);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.name === second.name) {
        // Match: Update state to matched
        setFruits((prev) =>
          prev.map((f) =>
            f.id === first.id || f.id === second.id
              ? { ...f, isMatched: true }
              : f,
          ),
        );
        setScore((s) => s + 1);
        setFlippedCards([]); // Clear selection so user can pick again
      } else {
        // No Match: Wait 1s then flip both back
        const timer = setTimeout(() => {
          setFruits((prev) =>
            prev.map((f) =>
              f.id === first.id || f.id === second.id
                ? { ...f, isFlipped: false, isMatched: false }
                : f,
            ),
          );
          setFlippedCards([]);
        }, 1000);

        return () => clearTimeout(timer); // Critical cleanup
      }
    }
  }, [flippedCards]);

  return (
    <>
      <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center text-white relative">
        {/* the main game header */}
        <GameHeader score={score} moves={moves} handleReset={handleReset} />

        {/* the actual gaming area */}
        <div className="grid grid-cols-4 w-100 gap-2">
          {fruits.map((fruit) => (
            <div
              key={fruit.id}
              className={`w-23 h-23 flex justify-center items-center border border-gray-700 rounded-lg hover:bg-blue-900/70 hover:shadow-xs hover: shadow-blue-800 transition-all duration-100 bg-gray-900 ${fruit.isMatched === true ? "bg-green-500/30 border border-green-500" : "bg-gray-900"}`}
              onClick={() => handleClick(fruit)}
            >
              <h1 className="text-3xl">
                {fruit.isFlipped || fruit.isMatched ? fruit.emoji : "?"}
              </h1>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {winDialog ? (
            <div className="bg-red-600/70 border border-red-600 px-6 py-4 rounded-xl w-130 h-50 flex justify-center items-center flex-col">
              <h1 className="font-bold text-2xl">
                {score === 8
                  ? "WOOHOOO! Well Played"
                  : score === 16
                    ? "YOU'RE GETTING GOOD AT THIS"
                    : score > 32
                      ? "GOD TIER! TAKE A BOW"
                      : "GREAT PLAY!"}
              </h1>
              <button
                onClick={() => handleContinue()}
                className="bg-white text-black mt-2 cursor-pointer px-4 py-1 rounded-md"
              >
                Continue Playing
              </button>
            </div>
          ) : null}
        </div>
        <div>
          <h1 className="mt-3 text-xs">
            crafted@<span className="text-pink-500">dharm</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default App;
