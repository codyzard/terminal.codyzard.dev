type Props = {
  suggestions: string[]
}

/**
 * Command suggestions list component
 * Displays autocomplete suggestions below the input (terminal-style)
 */
export const CommandSuggestions = ({suggestions}: Props) => {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex flex-wrap gap-3 px-1">
      {suggestions.map((suggestion) => (
        <span key={suggestion} className="font-mono text-sm text-gray-300">
          {suggestion}
        </span>
      ))}
    </div>
  )
}
