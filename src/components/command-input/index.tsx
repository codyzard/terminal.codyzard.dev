import {codyzardUser} from '@/src/utils/users'
import {forwardRef, useImperativeHandle} from 'react'
import {useCommandInput} from './use-command-input'
import {CommandSuggestions} from './command-suggestions'

type Props = {
  onCommand: (command: string) => void
  onNavigatePrevious?: (currentCommand: string) => string
  onNavigateNext?: (currentCommand: string) => string
  availableCommands?: string[]
}

export type CommandInputRef = {
  focusInput: () => void
}

const CommandInput = forwardRef<CommandInputRef, Props>(
  ({onCommand, onNavigatePrevious, onNavigateNext, availableCommands = []}, ref) => {
    // Use custom hook for all input logic
    const {command, inputRef, focusInput, handleKeyDown, handleChange, suggestions, showSuggestions} =
      useCommandInput({
        onCommand,
        onNavigatePrevious,
        onNavigateNext,
        availableCommands,
        enableAutocomplete: true,
        autoFocus: true,
      })

    // Expose focusInput to parent via ref
    useImperativeHandle(ref, () => ({
      focusInput,
    }))

    return (
      <div className="relative">
        <div className="flex items-center">
          <span className="mr-2 prompt">{codyzardUser}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="(var(--text-color)) grow border-none bg-transparent outline-none"
            spellCheck="false"
            autoComplete="off"
          />
        </div>

        {/* Show autocomplete suggestions */}
        {showSuggestions && <CommandSuggestions suggestions={suggestions} />}
      </div>
    )
  },
)

CommandInput.displayName = 'CommandInput'
export default CommandInput
