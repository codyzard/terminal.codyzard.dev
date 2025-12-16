'use client'
import {executeCommand} from '@/src/utils/command-executor'
import {useState, useRef, useEffect, useCallback} from 'react'
import CommandHistory from '../command-history'
import type {CommandInputRef} from '../command-input'
import CommandInput from '../command-input'
import type {TerminalOutput} from '@/src/types'
import type {ThemeName} from '@/src/contexts/theme-context'
import {useTheme} from '@/src/contexts/theme-context'

export const Terminal = () => {
  const [history, setHistory] = useState<TerminalOutput[]>(() => {
    const welcomeOutput = executeCommand('welcome')
    return [
      {type: 'input', content: 'welcome'},
      {type: 'output', content: welcomeOutput.content, isError: welcomeOutput.isError},
    ]
  })
  const historyEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<CommandInputRef>(null)
  const {setTheme} = useTheme()

  // Hàm focus input khi click vào Terminal
  const focusInput = () => {
    inputRef.current?.focusInput()
  }

  // Tự động cuộn xuống cuối khi có output mới
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [history])

  const handleCommand = useCallback(
    (command: string) => {
      if (!command.trim()) return

      // Sử dụng function form để đảm bảo cập nhật state mới nhất
      setHistory((prev) => {
        // 1. Xử lý và nhận output
        const output = executeCommand(command)

        // Xử lý Lệnh Theme
        if (output.specialAction === 'setTheme' && output.themeName) {
          setTheme(output.themeName as ThemeName) // <-- GỌI setTheme
        }

        // KIỂM TRA HÀNH ĐỘNG ĐẶC BIỆT
        if (output.specialAction === 'clear') {
          return [] // Reset history thành mảng rỗng
        }

        // 2. Thêm input và output vào history
        return [
          ...prev,
          {type: 'input', content: command},
          {type: 'output', content: output.content, isError: output.isError},
        ]
      })
    },
    [setTheme],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Điều kiện: Phím 'k' (không phân biệt chữ hoa/thường)
      // VÀ (CmdKey trên Mac HOẶC CtrlKey trên Windows/Linux)
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault() // Rất quan trọng: Ngăn trình duyệt mở Quick Find hoặc các hành động mặc định khác

        // Gọi lệnh clear
        handleCommand('clear')
      }
    }

    // Đính kèm sự kiện vào cửa sổ (toàn cục)
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup: Xóa sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCommand]) // Đảm bảo useEffect chạy lại nếu handleCommand thay đổi (nhưng vì dùng useCallback nên nó sẽ không thay đổi)

  return (
    <div className="terminal h-screen overflow-y-auto font-mono" onClick={focusInput}>
      <CommandHistory history={history} />
      <CommandInput ref={inputRef} onCommand={handleCommand} />
      <div ref={historyEndRef} />
    </div>
  )
}
