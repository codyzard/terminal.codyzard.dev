import type {Command} from '../types'

export const awardsCommand: Command = {
  name: 'awards',
  description: 'View my awards and achievements.',
  execute: () => {
    return {
      content: (
        <div className='space-y-4'>
          <div className='mb-4 text-lg font-bold text-cyan-400'>🏆 Awards & Achievements</div>

          {/* PR TIMES Award */}
          <div className='border-l-4 border-yellow-400 py-2 pl-4'>
            <div className='mb-2 flex items-start gap-2'>
              <span className='text-2xl'>🎖️</span>
              <div className='flex-1'>
                <h3 className='text-lg font-bold text-yellow-400'>PR TIMES Culture Award</h3>
                <p className='text-sm text-gray-400'>PR TIMES, Inc.</p>
              </div>
            </div>

            <p className='mb-3 text-gray-300'>
              This award celebrates individuals who contribute positively to PR TIMES culture and
              values.
            </p>

            <a
              href='https://prtimes.co.jp/culture/prtimes_lehoangtu/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-cyan-400 underline transition-colors hover:text-cyan-300'
            >
              <span>🔗 View Award Page</span>
              <span className='text-xs'>↗</span>
            </a>
          </div>

          {/* Add more awards here in the future */}
          <div className='mt-6 border-t border-gray-700 pt-4'>
            <p className='text-sm text-gray-500 italic'>💡 More achievements coming soon...</p>
          </div>
        </div>
      ),
    }
  },
}
