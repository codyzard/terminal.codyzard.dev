export const GameOverScreen = ({score}: {score: number}) => (
  <div className="mt-4 text-center">
    <div className="text-2xl font-bold text-red-500">GAME OVER!</div>
    <div className="mt-2 text-yellow-400">Final Score: {score}</div>
    <div className="mt-2 text-gray-400">Press SPACE or ENTER to restart</div>
  </div>
)
