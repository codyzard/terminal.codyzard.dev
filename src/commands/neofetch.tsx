import type {Command} from '../types'
import {userData} from '../config/user-data'

const ASCII_ART = `
   ██████╗ ██████╗ ██████╗ ██╗   ██╗███████╗ █████╗ ██████╗ ██████╗
  ██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝╚══███╔╝██╔══██╗██╔══██╗██╔══██╗
  ██║     ██║   ██║██║  ██║ ╚████╔╝   ███╔╝ ███████║██████╔╝██║  ██║
  ██║     ██║   ██║██║  ██║  ╚██╔╝   ███╔╝  ██╔══██║██╔══██╗██║  ██║
  ╚██████╗╚██████╔╝██████╔╝   ██║   ███████╗██║  ██║██║  ██║██████╔╝
   ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
`

export const neofetchCommand: Command = {
  name: 'neofetch',
  description: 'Display system information in neofetch style.',
  execute: () => {
    // Color classes for labels
    const labelClass = 'text-cyan-400 font-bold'
    const valueClass = 'text-white'

    // Info sections
    const infoLines = [
      {label: 'Name', value: userData.name},
      {label: 'Title', value: userData.title},
      {label: 'Location', value: 'Tokyo, Japan'},
      {label: 'Email', value: userData.email},
      {label: 'GitHub', value: userData.github.split('/').pop()},
      {label: 'Programming Languages', value: 'TypeScript, JavaScript, Python'},
      {label: 'Frontend', value: 'React, Next.js, Tailwind CSS, etc...'},
      {label: 'Backend', value: 'PHP, Go, Hono, Node.js, Express'},
      {label: 'Database', value: 'PostgreSQL, MySQL, DynamoDB'},
      {label: 'Tools', value: 'Git, Docker, VS Code, aerospace'},
      {label: 'Terminal', value: 'Codyzard Terminal v1.0, Warp, WezTerm'},
    ]

    return {
      content: (
        <div className="font-mono">
          {/* ASCII Art */}
          <pre className="mb-4 text-yellow-400 text-xs leading-tight">{ASCII_ART}</pre>

          {/* Info Grid */}
          <div className="gap-1 grid grid-cols-1">
            {infoLines.map((line, index) => (
              <div key={index} className="flex">
                {line.label && (
                  <>
                    <span className={`${labelClass} w-64`}>{line.label}</span>
                    <span className="mr-2 text-gray-500">:</span>
                    <span className={valueClass}>{line.value}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Color Palette */}
          <div className="flex gap-2 mt-4">
            <div className="bg-black border border-gray-600 w-8 h-4"></div>
            <div className="bg-red-500 w-8 h-4"></div>
            <div className="bg-green-500 w-8 h-4"></div>
            <div className="bg-yellow-500 w-8 h-4"></div>
            <div className="bg-blue-500 w-8 h-4"></div>
            <div className="bg-purple-500 w-8 h-4"></div>
            <div className="bg-cyan-500 w-8 h-4"></div>
            <div className="bg-white border border-gray-600 w-8 h-4"></div>
          </div>
        </div>
      ),
    }
  },
}
