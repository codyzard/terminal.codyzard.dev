import type {TerminalOutput} from '@/src/types'

type Props = {
  history: TerminalOutput[]
}

const CommandHistory = ({history}: Props) => {
  return (
    <div>
      {history.map((item, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {item.type === 'input' ? (
            <div className="flex">
              <span className="mr-2 text-yellow-500">user@codyzard:~ $</span>
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
