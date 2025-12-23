'use client'

import {useMatrixToggle} from './use-matrix-toggle'

export const MatrixToggle = () => {
  const {action} = useMatrixToggle()

  // Show loading while determining action
  if (action === null) {
    return null
  }

  return (
    <div className='my-2 font-mono text-sm'>
      <div className='text-[#00ff00]'>
        Matrix background has been <span className='font-bold'>{action}</span>.
      </div>
      <div className='mt-1 text-[#008000]'>
        {action === 'enabled'
          ? 'Digital rain is now falling in the background...'
          : 'The Matrix has been paused.'}
      </div>
      <div className='mt-2 text-[#666]'>
        Type <span className='text-[#00cc00]'>matrix</span> again to toggle.
      </div>
    </div>
  )
}
