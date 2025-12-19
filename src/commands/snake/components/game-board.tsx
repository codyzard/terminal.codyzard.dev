import {BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE} from '../types'

export const GameBoard = ({board}: {board: string[][]}) => {
  const cellSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : CELL_SIZE

  return (
    <div
      className="inline-block max-w-full overflow-x-auto border-2 border-green-400 bg-black p-1 sm:p-2"
      style={{width: 'fit-content'}}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${cellSize}px)`,
          gap: '0',
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: cellSize < 20 ? '10px' : '14px',
              }}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
