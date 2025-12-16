import type {Command} from '../types'

/**
 * Command Registry - Manages command registration and retrieval
 * Provides a scalable pattern for managing commands in the terminal
 */
class CommandRegistry {
  private commands: Map<string, Command> = new Map()
  private aliases: Map<string, string> = new Map()

  /**
   * Register a new command
   * @param command - The command to register
   * @param aliases - Optional array of aliases for this command
   * @throws Error if command name already exists
   */
  register(command: Command, aliases?: string[]): void {
    const name = command.name.toLowerCase()

    if (this.commands.has(name)) {
      throw new Error(`Command "${name}" is already registered`)
    }

    this.commands.set(name, command)

    // Register aliases
    if (aliases) {
      for (const alias of aliases) {
        const aliasLower = alias.toLowerCase()
        if (this.aliases.has(aliasLower)) {
          throw new Error(`Alias "${alias}" is already registered`)
        }
        this.aliases.set(aliasLower, name)
      }
    }
  }

  /**
   * Register multiple commands at once
   * @param commands - Array of commands to register
   */
  registerBulk(commands: Command[]): void {
    for (const command of commands) {
      this.register(command)
    }
  }

  /**
   * Get a command by name or alias
   * @param name - The command name or alias
   * @returns The command if found, undefined otherwise
   */
  get(name: string): Command | undefined {
    const nameLower = name.toLowerCase()

    // Check if it's a direct command
    const command = this.commands.get(nameLower)
    if (command) {
      return command
    }

    // Check if it's an alias
    const actualName = this.aliases.get(nameLower)
    if (actualName) {
      return this.commands.get(actualName)
    }

    return undefined
  }

  /**
   * Check if a command exists
   * @param name - The command name or alias
   * @returns true if command exists, false otherwise
   */
  has(name: string): boolean {
    const nameLower = name.toLowerCase()
    return this.commands.has(nameLower) || this.aliases.has(nameLower)
  }

  /**
   * Get all registered commands
   * @returns Array of all commands
   */
  getAll(): Command[] {
    return Array.from(this.commands.values())
  }

  /**
   * Get all command names
   * @returns Array of command names
   */
  getNames(): string[] {
    return Array.from(this.commands.keys())
  }

  /**
   * Get command count
   * @returns Number of registered commands
   */
  count(): number {
    return this.commands.size
  }

  /**
   * Unregister a command
   * @param name - The command name to unregister
   * @returns true if command was unregistered, false if not found
   */
  unregister(name: string): boolean {
    const nameLower = name.toLowerCase()

    // Remove aliases pointing to this command
    for (const [alias, commandName] of this.aliases.entries()) {
      if (commandName === nameLower) {
        this.aliases.delete(alias)
      }
    }

    return this.commands.delete(nameLower)
  }

  /**
   * Clear all registered commands
   */
  clear(): void {
    this.commands.clear()
    this.aliases.clear()
  }

  /**
   * Get commands as object (for backward compatibility)
   * @returns Object with command names as keys
   */
  toObject(): {[key: string]: Command} {
    const obj: {[key: string]: Command} = {}
    for (const [name, command] of this.commands.entries()) {
      obj[name] = command
    }
    return obj
  }
}

// Export singleton instance
export const commandRegistry = new CommandRegistry()
