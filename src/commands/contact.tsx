import type {Command} from '../types'
import {userData} from '../config/user-data'

export const contactCommand: Command = {
  name: 'contact',
  description: 'Displays my contact information.',
  execute: () => {
    return {
      content: (
        <>
          <p>
            📧 Email: <span className="text-blue-400">{userData.email}</span>
          </p>
          <p>
            🐙 GitHub:{' '}
            <a
              href={userData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {userData.github}
            </a>
          </p>
          <p>
            🔗 LinkedIn:{' '}
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {userData.linkedin}
            </a>
          </p>
        </>
      ),
    }
  },
}
