'use client'
import {executeCommand} from '@/src/utils/command-executor'
import {useState, useRef, useEffect} from 'react'
import CommandHistory from '../command-history'
import CommandInput from '../command-input'
import type {ExecutionResult, TerminalOutput} from '@/src/types'

export const Terminal = () => {
  const [history, setHistory] = useState<TerminalOutput[]>([])
  const historyEndRef = useRef<HTMLDivElement>(null)

  // Focus vào input mỗi khi terminal được render
  const focusInput = () => {
    // Logic focus input sẽ nằm trong CommandInput component
  }

  // Tự động cuộn xuống cuối khi có output mới
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [history])

  const handleCommand = (command: string) => {
    if (!command.trim()) return

    // 1. Xử lý và nhận output
    const output: ExecutionResult = executeCommand(command) // Sử dụng kiểu ExecutionResult

    // KIỂM TRA HÀNH ĐỘNG ĐẶC BIỆT
    if (output.specialAction === 'clear') {
      setHistory([]) // Reset history thành mảng rỗng
      return // Dừng việc thêm input và output vào history
    }

    // 2. Thêm lệnh input vào history (Chỉ thực hiện nếu không phải lệnh 'clear')
    setHistory((prev) => [...prev, {type: 'input', content: command}])

    // 3. Thêm output vào history (Chỉ thực hiện nếu không phải lệnh 'clear')
    setHistory((prev) => [
      ...prev,
      {type: 'output', content: output.content, isError: output.isError},
    ])
  }

  // Lệnh đầu tiên: Hiển thị Welcome Message
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleCommand('welcome')
  }, [])

  return (
    <div
      className="bg-gray-900 p-4 h-screen overflow-y-auto font-mono text-green-400"
      onClick={focusInput}
    >
      <CommandHistory history={history} />
      <CommandInput onCommand={handleCommand} />
      <div ref={historyEndRef} />
    </div>
  )
}
