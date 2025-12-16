import type {Command} from '../types'
import type {ThemeName} from '../contexts/theme-context'

const availableThemes: ThemeName[] = ['dark', 'light', 'hacker']

export const themeCommand: Command = {
  name: 'theme',
  description: 'Change the terminal theme. Usage: theme <dark|light|hacker>',
  execute: (args?: string[]) => {
    if (!args || args.length === 0) {
      return {
        content: (
          <>
            <p>Current available themes:</p>
            <ul className="list-disc list-inside">
              {availableThemes.map((theme) => (
                <li key={theme} className="text-yellow-400">
                  {theme}
                </li>
              ))}
            </ul>
            <p className="mt-2">Usage: theme {'<theme_name>'}</p>
          </>
        ),
        isError: false,
      }
    }

    const newTheme = args[0] as ThemeName

    if (!newTheme || !availableThemes.includes(newTheme)) {
      return {
        content: (
          <>
            <p className="text-red-500">Error: Invalid theme name.</p>
            <p>Available themes: **{availableThemes.join(', ')}**</p>
            <p>Usage: theme {'<theme_name>'}</p>
          </>
        ),
        isError: true,
      }
    }

    return {
      content: `Setting theme to '${newTheme}'...`,
      specialAction: 'setTheme',
      themeName: newTheme,
    }
  },
}
