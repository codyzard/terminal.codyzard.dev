import type {Command} from '../types'
import {userData} from '../config/user-data'

export const skillsCommand: Command = {
  name: 'skills',
  description: 'Displays my technical expertise (tech stack).',
  execute: () => {
    return {
      content: (
        <>
          <p className='mb-2 text-lg text-white'>My Tech Stack 💻:</p>
          <div className='grid max-w-md grid-cols-[auto_max-content] gap-x-4 gap-y-1'>
            <span className='font-bold text-yellow-400'>Frontend:</span>{' '}
            <span>{userData.skills.frontend}</span>
            <span className='font-bold text-yellow-400'>Backend:</span>{' '}
            <span>{userData.skills.backend}</span>
            <span className='font-bold text-yellow-400'>Database:</span>{' '}
            <span>{userData.skills.database}</span>
            <span className='font-bold text-yellow-400'>DevOps/Tools:</span>{' '}
            <span>{userData.skills.devops}</span>
            <span className='font-bold text-yellow-400'>Languages:</span>{' '}
            <span>{userData.skills.languages}</span>
          </div>
        </>
      ),
    }
  },
}
