import type {Command} from '../types'
import {userData} from '../config/user-data'

const WELCOME_ASCII = `
  ╔═══════════════════════════════════════════════════════════════════╗
  ║                                                                   ║
  ║  ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗ ║
  ║  ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝ ║
  ║  ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗   ║
  ║  ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝   ║
  ║  ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗ ║
  ║   ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ║
  ║                                                                   ║
  ║               Welcome to Codyzard Terminal v1.0                  ║
  ╚═══════════════════════════════════════════════════════════════════╝
`

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message.',
  execute: () => {
    const labelClass = 'text-cyan-400 font-bold'
    const valueClass = 'text-green-400'
    const commandClass = 'text-yellow-400 font-bold'

    return {
      content: (
        <div className='max-w-full font-mono'>
          {/* ASCII Art Header */}
          <pre className='mb-4 overflow-x-auto text-xs leading-tight text-cyan-400'>
            {WELCOME_ASCII}
          </pre>

          {/* Authentication Status */}
          <div className='mb-4 text-green-500'>
            <p>✓ Authentication successful</p>
            <p className='text-xs break-all text-gray-400 sm:text-sm'>
              session_id: guest-terminal | user: guest
            </p>
          </div>

          {/* Quick Info */}
          <div className='mb-4 space-y-1'>
            <div className='flex flex-col sm:flex-row'>
              <span className={`${labelClass} sm:w-36`}>Developer</span>
              <span className='mr-2 hidden text-gray-500 sm:inline'>:</span>
              <span className={valueClass}>{userData.name}</span>
            </div>
            <div className='flex flex-col sm:flex-row'>
              <span className={`${labelClass} sm:w-36`}>Role</span>
              <span className='mr-2 hidden text-gray-500 sm:inline'>:</span>
              <span className={valueClass}>{userData.title}</span>
            </div>
          </div>

          {/* Quick Start Commands */}
          <div className='mb-4 border-t border-gray-700 pt-3'>
            <p className='mb-2 text-white'>🚀 Quick Start:</p>
            <div className='ml-4 space-y-1 text-sm'>
              <p>
                <span className={commandClass}>help</span>
                <span className='text-gray-400'> - View all available commands</span>
              </p>
              <p>
                <span className={commandClass}>summary</span>
                <span className='text-gray-400'> - Learn more about me</span>
              </p>
              <p>
                <span className={commandClass}>snake</span>
                <span className='text-gray-400'> - Play the snake game</span>
              </p>
              <p>
                <span className={commandClass}>neofetch</span>
                <span className='text-gray-400'> - Display system information</span>
              </p>
              <p>
                <span className={commandClass}>skills</span>
                <span className='text-gray-400'> - View technical skills</span>
              </p>
              <p>
                <span className={commandClass}>contact</span>
                <span className='text-gray-400'> - Get in touch</span>
              </p>
            </div>
          </div>

          {/* Tip */}
          <div className='border-t border-gray-700 pt-2 text-xs text-gray-500'>
            <span className='hidden sm:inline'>
              💡 Tip: Press <kbd className='rounded bg-gray-800 px-1'>Tab</kbd> for command
              autocomplete, <kbd className='rounded bg-gray-800 px-1'>↑↓</kbd> for history
            </span>
            <span className='sm:hidden'>
              💡 Tip: Type <span className='text-yellow-400'>help</span> to see all commands
            </span>
          </div>
        </div>
      ),
    }
  },
}
