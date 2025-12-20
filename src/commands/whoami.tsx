import type {Command} from '../types'
import {userData} from '../config/user-data'

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display current user information.',
  execute: () => {
    const infoItems = [
      {label: 'User', value: userData.name, icon: '👤'},
      {label: 'Role', value: userData.title, icon: '💼'},
      {label: 'Location', value: userData.location, icon: '📍'},
      {label: 'Email', value: userData.email, icon: '✉️'},
      {label: 'GitHub', value: '@codyzard', icon: '🐙'},
    ]

    return {
      content: (
        <div className='space-y-4'>
          {/* Header */}
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-400 bg-gray-800 text-3xl'>
              👨‍💻
            </div>
            <div>
              <h2 className='text-2xl font-bold text-cyan-400'>{userData.name}</h2>
              <a href={userData.github} className='text-sm text-gray-400'>
                @codyzard
              </a>
            </div>
          </div>

          {/* Info Grid */}
          <div className='space-y-2 rounded-lg border border-gray-700 bg-gray-800/50 p-4'>
            {infoItems.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-gray-700/50'
              >
                <span className='text-xl'>{item.icon}</span>
                <div className='flex-1'>
                  <span className='font-bold text-yellow-400'>{item.label}:</span>
                  <span className='ml-2 text-green-400'>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className='mt-4 flex items-center gap-2 text-sm'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-500'></span>
            <span className='text-gray-400'>Currently online and building cool stuff 🚀</span>
          </div>

          {/* Tech Stack */}
          <div className='mt-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4'>
            <h3 className='mb-3 text-lg font-bold text-cyan-400'>💻 Tech Stack</h3>
            <div className='space-y-2 text-sm'>
              <div>
                <span className='font-bold text-yellow-400'>Frontend:</span>{' '}
                <span className='text-gray-300'>{userData.skills.frontend}</span>
              </div>
              <div>
                <span className='font-bold text-yellow-400'>Backend:</span>{' '}
                <span className='text-gray-300'>{userData.skills.backend}</span>
              </div>
              <div>
                <span className='font-bold text-yellow-400'>Database:</span>{' '}
                <span className='text-gray-300'>{userData.skills.database}</span>
              </div>
              <div>
                <span className='font-bold text-yellow-400'>DevOps/Tools:</span>{' '}
                <span className='text-gray-300'>{userData.skills.devops}</span>
              </div>
              <div>
                <span className='font-bold text-yellow-400'>Languages:</span>{' '}
                <span className='text-gray-300'>{userData.skills.languages}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='mt-4 flex flex-wrap gap-2'>
            <div className='rounded bg-gray-700 px-3 py-1 text-xs text-gray-300'>
              💻 Open to opportunities
            </div>
            <div className='rounded bg-gray-700 px-3 py-1 text-xs text-gray-300'>
              🌏 Remote friendly
            </div>
          </div>
        </div>
      ),
    }
  },
}
