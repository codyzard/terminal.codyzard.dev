import {describe, it, expect, beforeEach} from 'vitest'
import type {Command} from '../types'

// Import the class to create test instances
class CommandRegistry {
  private commands: Map<string, Command> = new Map()
  private aliases: Map<string, string> = new Map()

  register(command: Command, aliases?: string[]): void {
    const name = command.name.toLowerCase()

    if (this.commands.has(name)) {
      throw new Error(`Command "${name}" is already registered`)
    }

    this.commands.set(name, command)

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

  registerBulk(commands: Command[]): void {
    for (const command of commands) {
      this.register(command)
    }
  }

  get(name: string): Command | undefined {
    const nameLower = name.toLowerCase()
    const command = this.commands.get(nameLower)
    if (command) {
      return command
    }
    const actualName = this.aliases.get(nameLower)
    if (actualName) {
      return this.commands.get(actualName)
    }
    return undefined
  }

  has(name: string): boolean {
    const nameLower = name.toLowerCase()
    return this.commands.has(nameLower) || this.aliases.has(nameLower)
  }

  getAll(): Command[] {
    return Array.from(this.commands.values())
  }

  getNames(): string[] {
    return Array.from(this.commands.keys())
  }

  count(): number {
    return this.commands.size
  }

  unregister(name: string): boolean {
    const nameLower = name.toLowerCase()
    for (const [alias, commandName] of this.aliases.entries()) {
      if (commandName === nameLower) {
        this.aliases.delete(alias)
      }
    }
    return this.commands.delete(nameLower)
  }

  clear(): void {
    this.commands.clear()
    this.aliases.clear()
  }

  toObject(): {[key: string]: Command} {
    const obj: {[key: string]: Command} = {}
    for (const [name, command] of this.commands.entries()) {
      obj[name] = command
    }
    return obj
  }
}

describe('CommandRegistry', () => {
  let registry: CommandRegistry
  const mockCommand: Command = {
    name: 'test',
    description: 'Test command',
    action: () => null,
  }

  beforeEach(() => {
    registry = new CommandRegistry()
  })

  describe('register', () => {
    it('should register a command', () => {
      registry.register(mockCommand)
      expect(registry.has('test')).toBe(true)
      expect(registry.count()).toBe(1)
    })

    it('should register command with case-insensitive name', () => {
      registry.register({...mockCommand, name: 'TEST'})
      expect(registry.has('test')).toBe(true)
      expect(registry.has('TEST')).toBe(true)
    })

    it('should register command with aliases', () => {
      registry.register(mockCommand, ['t', 'tst'])
      expect(registry.has('test')).toBe(true)
      expect(registry.has('t')).toBe(true)
      expect(registry.has('tst')).toBe(true)
    })

    it('should throw error when registering duplicate command', () => {
      registry.register(mockCommand)
      expect(() => registry.register(mockCommand)).toThrow('Command "test" is already registered')
    })

    it('should throw error when registering duplicate alias', () => {
      registry.register(mockCommand, ['t'])
      expect(() => registry.register({...mockCommand, name: 'test2'}, ['t'])).toThrow(
        'Alias "t" is already registered',
      )
    })

    it('should handle aliases with different cases', () => {
      registry.register(mockCommand, ['T', 'TST'])
      expect(registry.has('t')).toBe(true)
      expect(registry.has('T')).toBe(true)
      expect(registry.has('tst')).toBe(true)
    })
  })

  describe('registerBulk', () => {
    it('should register multiple commands at once', () => {
      const commands: Command[] = [
        {name: 'cmd1', description: 'Command 1', action: () => null},
        {name: 'cmd2', description: 'Command 2', action: () => null},
        {name: 'cmd3', description: 'Command 3', action: () => null},
      ]
      registry.registerBulk(commands)
      expect(registry.count()).toBe(3)
      expect(registry.has('cmd1')).toBe(true)
      expect(registry.has('cmd2')).toBe(true)
      expect(registry.has('cmd3')).toBe(true)
    })

    it('should handle empty array', () => {
      registry.registerBulk([])
      expect(registry.count()).toBe(0)
    })
  })

  describe('get', () => {
    beforeEach(() => {
      registry.register(mockCommand, ['t', 'tst'])
    })

    it('should get command by exact name', () => {
      const cmd = registry.get('test')
      expect(cmd).toBeDefined()
      expect(cmd?.name).toBe('test')
    })

    it('should get command by alias', () => {
      const cmd = registry.get('t')
      expect(cmd).toBeDefined()
      expect(cmd?.name).toBe('test')
    })

    it('should be case-insensitive', () => {
      expect(registry.get('TEST')).toBeDefined()
      expect(registry.get('T')).toBeDefined()
      expect(registry.get('TsT')).toBeDefined()
    })

    it('should return undefined for non-existent command', () => {
      expect(registry.get('nonexistent')).toBeUndefined()
    })
  })

  describe('has', () => {
    beforeEach(() => {
      registry.register(mockCommand, ['t'])
    })

    it('should return true for registered command', () => {
      expect(registry.has('test')).toBe(true)
    })

    it('should return true for registered alias', () => {
      expect(registry.has('t')).toBe(true)
    })

    it('should be case-insensitive', () => {
      expect(registry.has('TEST')).toBe(true)
      expect(registry.has('T')).toBe(true)
    })

    it('should return false for non-existent command', () => {
      expect(registry.has('nonexistent')).toBe(false)
    })
  })

  describe('getAll', () => {
    it('should return all registered commands', () => {
      const commands: Command[] = [
        {name: 'cmd1', description: 'Command 1', action: () => null},
        {name: 'cmd2', description: 'Command 2', action: () => null},
      ]
      registry.registerBulk(commands)
      const all = registry.getAll()
      expect(all).toHaveLength(2)
      expect(all[0].name).toBe('cmd1')
      expect(all[1].name).toBe('cmd2')
    })

    it('should return empty array when no commands registered', () => {
      expect(registry.getAll()).toEqual([])
    })
  })

  describe('getNames', () => {
    it('should return all command names', () => {
      registry.registerBulk([
        {name: 'cmd1', description: 'Command 1', action: () => null},
        {name: 'cmd2', description: 'Command 2', action: () => null},
      ])
      const names = registry.getNames()
      expect(names).toHaveLength(2)
      expect(names).toContain('cmd1')
      expect(names).toContain('cmd2')
    })
  })

  describe('count', () => {
    it('should return 0 for empty registry', () => {
      expect(registry.count()).toBe(0)
    })

    it('should return correct count', () => {
      registry.register(mockCommand)
      expect(registry.count()).toBe(1)
      registry.register({...mockCommand, name: 'test2'})
      expect(registry.count()).toBe(2)
    })
  })

  describe('unregister', () => {
    beforeEach(() => {
      registry.register(mockCommand, ['t', 'tst'])
    })

    it('should unregister a command', () => {
      const result = registry.unregister('test')
      expect(result).toBe(true)
      expect(registry.has('test')).toBe(false)
      expect(registry.count()).toBe(0)
    })

    it('should remove all aliases when unregistering', () => {
      registry.unregister('test')
      expect(registry.has('t')).toBe(false)
      expect(registry.has('tst')).toBe(false)
    })

    it('should be case-insensitive', () => {
      const result = registry.unregister('TEST')
      expect(result).toBe(true)
      expect(registry.has('test')).toBe(false)
    })

    it('should return false for non-existent command', () => {
      const result = registry.unregister('nonexistent')
      expect(result).toBe(false)
    })
  })

  describe('clear', () => {
    it('should clear all commands and aliases', () => {
      registry.register(mockCommand, ['t'])
      registry.register({...mockCommand, name: 'test2'}, ['t2'])
      registry.clear()
      expect(registry.count()).toBe(0)
      expect(registry.has('test')).toBe(false)
      expect(registry.has('t')).toBe(false)
      expect(registry.has('test2')).toBe(false)
      expect(registry.has('t2')).toBe(false)
    })
  })

  describe('toObject', () => {
    it('should convert registry to object', () => {
      registry.registerBulk([
        {name: 'cmd1', description: 'Command 1', action: () => null},
        {name: 'cmd2', description: 'Command 2', action: () => null},
      ])
      const obj = registry.toObject()
      expect(Object.keys(obj)).toHaveLength(2)
      expect(obj.cmd1.name).toBe('cmd1')
      expect(obj.cmd2.name).toBe('cmd2')
    })

    it('should return empty object for empty registry', () => {
      expect(registry.toObject()).toEqual({})
    })
  })
})
