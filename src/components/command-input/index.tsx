import React, {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'

interface Props {
  onCommand: (command: string) => void
}

export interface CommandInputRef {
  focusInput: () => void
}

// Sử dụng forwardRef để component này có thể nhận ref từ component cha
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(command)
      setCommand('')
    }
  }

  return (
    <div className="flex items-center">
      <span className="mr-2 text-yellow-500">user@codyzard:~ $</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="grow border-none bg-transparent text-green-400 outline-none"
        spellCheck="false"
        autoComplete="off"
      />
    </div>
  )
})

CommandInput.displayName = 'CommandInput' // Nên thêm display name khi dùng forwardRef
export default CommandInput
