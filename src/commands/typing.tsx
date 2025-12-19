import type {Command} from '../types'

export const typingCommand: Command = {
  name: 'typing',
  description: 'Toggle typing animation. Usage: typing <on|off|speed [number]>',
  execute: (args?: string[]) => {
    if (!args || args.length === 0) {
      return {
        content: (
          <>
            <p>Typing animation controls:</p>
            <ul className="ml-4 mt-2 list-disc">
              <li>
                <span className="text-yellow-400">typing on</span> - Enable typing animation
              </li>
              <li>
                <span className="text-yellow-400">typing off</span> - Disable typing animation
              </li>
              <li>
                <span className="text-yellow-400">typing speed {'<number>'}</span> - Set typing
                speed (characters per second, default: 50)
              </li>
            </ul>
            <p className="mt-2">Example: typing speed 100</p>
          </>
        ),
        isError: false,
      }
    }

    const action = args[0].toLowerCase()

    switch (action) {
      case 'on':
        return {
          content: 'Typing animation enabled ✓',
          specialAction: 'setTypingAnimation',
          enabled: true,
        }

      case 'off':
        return {
          content: 'Typing animation disabled ✓',
          specialAction: 'setTypingAnimation',
          enabled: false,
        }

      case 'speed':
        if (args.length < 2) {
          return {
            content: (
              <>
                <span className="text-red-500">Error:</span> Speed value required.
                <br />
                Usage: typing speed {'<number>'}
              </>
            ),
            isError: true,
          }
        }

        const speed = parseInt(args[1], 10)
        if (isNaN(speed) || speed <= 0 || speed > 500) {
          return {
            content: (
              <>
                <span className="text-red-500">Error:</span> Speed must be a number between 1 and
                500.
              </>
            ),
            isError: true,
          }
        }

        return {
          content: `Typing speed set to ${speed} characters per second ✓`,
          specialAction: 'setTypingSpeed',
          speed,
        }

      default:
        return {
          content: (
            <>
              <span className="text-red-500">Error:</span> Invalid action &apos;{action}&apos;.
              <br />
              Use: typing {'<on|off|speed [number]>'}
            </>
          ),
          isError: true,
        }
    }
  },
}
