import React from 'react'
import { TerminalOutput } from '../types/types'

interface Props {
  history: TerminalOutput[]
}

const CommandHistory: React.FC<Props> = ({ history }) => {
  return (
    <div>
      {history.map((item, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {item.type === 'input' ? (
            <div className="flex">
              <span className="mr-2 text-yellow-500">user@portfolio:~ $</span>
              <span className="text-white">{item.content}</span>
            </div>
          ) : (
            <div className={`py-1 ${item.isError ? 'text-red-500' : 'text-green-400'}`}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CommandHistory
