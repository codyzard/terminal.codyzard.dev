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
      {label: 'Frontend', value: 'React, Next.js, Tailwind CSS, etc...'},
      {label: 'Backend', value: 'PHP, Go, Hono, Node.js, Express'},
      {label: 'Database', value: 'PostgreSQL, MySQL, DynamoDB'},
      {label: 'Tools', value: 'Git, Docker, VS Code, aerospace'},
      {label: 'Terminal', value: 'Codyzard Terminal v1.0, Warp, WezTerm'},
    ]

    return {
      content: (
        <div className='font-mono'>
          {/* ASCII Art */}
          <pre className='mb-4 text-xs leading-tight text-yellow-400'>{ASCII_ART}</pre>

          {/* Info Grid */}
          <div className='grid grid-cols-1 gap-1'>
            {infoLines.map((line, index) => (
              <div key={index} className='flex'>
                {line.label && (
                  <>
                    <span className={`${labelClass} w-64`}>{line.label}</span>
                    <span className='mr-2 text-gray-500'>:</span>
                    <span className={valueClass}>{line.value}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Color Palette */}
          <div className='mt-4 flex gap-2'>
            <div className='h-4 w-8 border border-gray-600 bg-black'></div>
            <div className='h-4 w-8 bg-red-500'></div>
            <div className='h-4 w-8 bg-green-500'></div>
            <div className='h-4 w-8 bg-yellow-500'></div>
            <div className='h-4 w-8 bg-blue-500'></div>
            <div className='h-4 w-8 bg-purple-500'></div>
            <div className='h-4 w-8 bg-cyan-500'></div>
            <div className='h-4 w-8 border border-gray-600 bg-white'></div>
          </div>
        </div>
      ),
    }
  },
}
