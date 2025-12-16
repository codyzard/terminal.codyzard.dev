import {codyzardUser} from '@/src/utils/users'
import type {KeyboardEvent} from 'react'
import {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'

type Props = {
  onCommand: (command: string) => void
}

export type CommandInputRef = {
  focusInput: () => void
}

const CommandInput = forwardRef<CommandInputRef, Props>(({onCommand}, ref) => {
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Expose hàm focusInput ra bên ngoài thông qua ref
  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus()
    },
  }))

  // Auto focus khi component được load lần đầu
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(command)
      setCommand('')
    }
  }

  return (
    <div className="flex items-center">
      <span className="mr-2 prompt">{codyzardUser}</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="(var(--text-color)) grow border-none bg-transparent outline-none"
        spellCheck="false"
        autoComplete="off"
      />
    </div>
  )
})

CommandInput.displayName = 'CommandInput'
export default CommandInput
