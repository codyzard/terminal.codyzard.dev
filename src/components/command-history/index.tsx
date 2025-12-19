import type {TerminalOutput} from '@/src/types'
import {codyzardUser} from '@/src/utils/users'
import {TypingAnimation} from '../typing-animation'
import {useTypingAnimation} from '@/src/contexts/typing-animation-context'
import {HighlightedCommand} from '@/src/utils/syntax-highlighter'

type Props = {
  history: TerminalOutput[]
}

const CommandHistory = ({history}: Props) => {
  const {enabled, speed} = useTypingAnimation()

  return (
    <div>
      {history.map((item, index) => {
        // Only animate the last output item
        const isLastOutput = index === history.length - 1 && item.type === 'output'

        return (
          <div key={item.id} className="whitespace-pre-wrap">
            {item.type === 'input' ? (
              <div className="flex">
                <span className="prompt mr-2">{codyzardUser}</span>
                {typeof item.content === 'string' ? (
                  <HighlightedCommand command={item.content} />
                ) : (
                  <span className="text-white">{item.content}</span>
                )}
              </div>
            ) : (
              <div className={`py-1 ${item.isError ? 'text-red-500' : 'text-green-400'}`}>
                {isLastOutput && enabled ? (
                  <TypingAnimation speed={speed} enabled={enabled}>
                    {item.content}
                  </TypingAnimation>
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CommandHistory
