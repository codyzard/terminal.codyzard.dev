// types/types.ts

// Kiểu dữ liệu cho kết quả sau khi thực thi lệnh
export interface ExecutionResult {
  content: string | JSX.Element
  isError?: boolean
  specialAction?: 'clear' // <--- THÊM DÒNG NÀY: Dùng để báo hiệu hành động đặc biệt (như 'clear')
}

// Kiểu dữ liệu cho mỗi dòng output trong terminal
export type TerminalOutput = {
  type: 'input' | 'output'
  content: string | JSX.Element // Dùng JSX.Element cho output phức tạp
  isError?: boolean
}

// Định nghĩa cho các lệnh
export interface Command {
  name: string
  description: string
  execute: (args: string[]) => { content: string | JSX.Element; isError?: boolean }
}
