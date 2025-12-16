import type {Command} from '../types'

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message.',
  execute: () => {
    return {
      content: (
        <>
          <p className="text-yellow-400 text-xl">[ 💻 Initializing Terminal Portfolio ]</p>
          <p className="mt-1 text-green-500 text-sm">
            $ system_info: Hostname: Codyzard.dev | User: Guest
          </p>
          <div className="mt-4">
            <p>Authentication success. Welcome to the **Codyzard.dev** CLI.</p>
            <p>I`&apos;`m **Le Hoang Tu**, a developer specializing in modern web stack.</p>
            <p className="mt-2 text-cyan-400">* Status: Awaiting command input...</p>
          </div>
          <p className="mt-3">
            Type **`&apos;`help`&apos;`** for command directory, or **`&apos;`summary`&apos;`** to
            begin.
          </p>
        </>
      ),
    }
  },
}
