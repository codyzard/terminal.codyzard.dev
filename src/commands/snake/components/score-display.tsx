export const ScoreDisplay = ({score}: {score: number}) => (
  <div className='mb-2 text-center'>
    <span className='text-cyan-400'>Score: </span>
    <span className='font-bold text-yellow-400'>{score}</span>
  </div>
)
