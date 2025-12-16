# Command Registry Pattern

## Overview

The Command Registry provides a scalable, plugin-like architecture for managing terminal commands with support for aliases, dynamic registration, and easy extensibility.

## Architecture

```
src/
├── commands/               # All command implementations
│   ├── index.ts           # Command registration
│   ├── help.tsx
│   ├── theme.tsx
│   └── ...
├── utils/
│   ├── command-registry.ts   # Registry implementation
│   └── command-executor.tsx  # Command execution
└── config/
    └── user-data.ts          # User configuration
```

## Features

✅ **Dynamic Registration**: Register/unregister commands at runtime
✅ **Aliases Support**: Multiple aliases per command
✅ **Type-Safe**: Full TypeScript support
✅ **Backward Compatible**: Works with existing code
✅ **Plugin Architecture**: Easy to add new commands
✅ **Centralized Management**: Single source of truth

## Usage

### Creating a New Command

1. **Create command file** in `src/commands/`:

```typescript
// src/commands/my-command.tsx
import type {Command} from '../types'

export const myCommand: Command = {
  name: 'mycommand',
  description: 'Does something awesome',
  execute: (args) => {
    return {
      content: 'Hello from my command!'
    }
  }
}
```

2. **Register command** in `src/commands/index.ts`:

```typescript
import {myCommand} from './my-command'

// Register with optional aliases
commandRegistry.register(myCommand, ['mc', 'my'])
```

That's it! Your command is now available and can be called with:
- `mycommand`
- `mc` (alias)
- `my` (alias)

### Built-in Aliases

The following aliases are pre-configured:

| Command | Aliases | Description |
|---------|---------|-------------|
| `clear` | `cls` | Clear terminal |
| `resume` | `cv` | Open resume |
| `github` | `gh` | Open GitHub profile |
| `linkedin` | `li` | Open LinkedIn profile |

### Command Registry API

```typescript
import {commandRegistry} from '../commands'

// Register a command
commandRegistry.register(myCommand, ['alias1', 'alias2'])

// Register multiple commands
commandRegistry.registerBulk([cmd1, cmd2, cmd3])

// Get a command (supports aliases)
const cmd = commandRegistry.get('mycommand')
const cmdByAlias = commandRegistry.get('mc') // Same as above

// Check if command exists
if (commandRegistry.has('mycommand')) {
  // ...
}

// Get all commands
const allCommands = commandRegistry.getAll()

// Get command names
const names = commandRegistry.getNames()

// Count commands
const count = commandRegistry.count()

// Unregister a command
commandRegistry.unregister('mycommand')

// Clear all commands
commandRegistry.clear()

// Get as object (backward compatibility)
const commandsObj = commandRegistry.toObject()
```

## Advanced Usage

### Dynamic Command Loading

```typescript
// Load commands dynamically based on user permissions
const adminCommands = [
  adminCommand,
  configCommand,
]

if (user.isAdmin) {
  commandRegistry.registerBulk(adminCommands)
}
```

### Command Plugins

```typescript
// Create a plugin system
interface CommandPlugin {
  name: string
  commands: Command[]
}

const installPlugin = (plugin: CommandPlugin) => {
  console.log(`Installing plugin: ${plugin.name}`)
  commandRegistry.registerBulk(plugin.commands)
}

// Use it
installPlugin({
  name: 'git-plugin',
  commands: [gitStatusCommand, gitLogCommand]
})
```

### Testing Commands

```typescript
import {CommandRegistry} from '../utils/command-registry'

describe('My Command', () => {
  let registry: CommandRegistry

  beforeEach(() => {
    registry = new CommandRegistry()
    registry.register(myCommand)
  })

  it('should execute correctly', () => {
    const cmd = registry.get('mycommand')
    const result = cmd?.execute([])
    expect(result.content).toBe('Hello from my command!')
  })
})
```

## Best Practices

1. **Command Names**: Use lowercase, kebab-case
2. **Aliases**: Keep them short (2-3 chars)
3. **Descriptions**: Clear, concise, action-oriented
4. **Error Handling**: Return `isError: true` for errors
5. **Type Safety**: Always use TypeScript types

## Migration Guide

### From Object to Registry

**Before:**
```typescript
export const commands = {
  help: helpCommand,
  theme: themeCommand,
}
```

**After:**
```typescript
commandRegistry.register(helpCommand)
commandRegistry.register(themeCommand)

export const commands = commandRegistry.toObject()
```

## Benefits

### 🚀 Scalability
- Add commands without modifying core code
- Plugin architecture for extensions

### 🛡️ Type Safety
- Full TypeScript support
- Compile-time error checking

### 🔍 Discoverability
- List all commands programmatically
- Introspection capabilities

### 🧪 Testability
- Easy to test individual commands
- Mock registry for testing

### 📦 Maintainability
- Clear separation of concerns
- Single responsibility principle
