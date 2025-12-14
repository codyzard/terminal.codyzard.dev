import React, {useState, useRef, useEffect} from 'react'

type Props = {
  onCommand: (command: string) => void
}

const CommandInput = ({onCommand}: Props) => {
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus vào input khi component được load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Focus vào input khi click vào bất kỳ đâu trên Terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(command)
      setCommand('') // Xóa input sau khi gửi lệnh
    }
    // TODO: Thêm logic history lệnh (mũi tên lên/xuống)
  }

  return (
    <div className="flex items-center" onClick={handleTerminalClick}>
      <span className="mr-2 text-yellow-500">user@portfolio:~ $</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-transparent border-none outline-none text-green-400"
        autoFocus
        spellCheck="false"
        autoComplete="off"
      />
    </div>
  )
}

export default CommandInput
