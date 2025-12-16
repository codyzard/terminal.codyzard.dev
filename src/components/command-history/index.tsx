import type {TerminalOutput} from '@/src/types'
import {codyzardUser} from '@/src/utils/users'

type Props = {
  history: TerminalOutput[]
}

const CommandHistory = ({history}: Props) => {
  return (
    <div>
      {history.map((item) => (
        <div key={item.id} className="whitespace-pre-wrap">
          {item.type === 'input' ? (
            <div className="flex">
              <span className="mr-2 text-yellow-500">{codyzardUser}</span>
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
