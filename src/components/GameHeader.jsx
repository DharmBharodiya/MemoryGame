const GameHeader = ({ score, moves, handleReset }) => {
  return (
    <div className="bg-gray-900 px-6 py-4 rounded-xl border border-gray-700 w-100 xs:w-80 flex flex-col justify-center items-center mb-5">
      <h1 className="font-bold text-2xl mb-2">👾Memory Card Game</h1>
      <div className="flex gap-10 scale-110">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xs text-gray-400 font-bold">SCORE:</h1>
          <p className="text-xl font-bold text-blue-400">{score}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xs text-gray-400 font-bold">MOVES:</h1>
          <p className="text-xl font-bold text-blue-400">{moves}</p>
        </div>
      </div>
      <button
        className="bg-gray-950 px-5 cursor-pointer py-1 rounded-xl mt-4"
        onClick={handleReset}
      >
        RESET
      </button>
    </div>
  );
};

export default GameHeader;
