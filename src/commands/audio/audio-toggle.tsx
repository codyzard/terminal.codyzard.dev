'use client'

import {useAudioToggle} from './use-audio-toggle'

export const AudioToggle = () => {
  const {action, isTypingSoundEnabled} = useAudioToggle()

  if (action === null) {
    return null
  }

  return (
    <div className='my-2 font-mono text-sm'>
      <div className='text-[#00ff00]'>
        Audio has been <span className='font-bold'>{action}</span>.
      </div>
      <div className='mt-1 text-[#008000]'>
        {action === 'enabled'
          ? 'Typing sounds are now active. Try typing!'
          : 'All sounds have been muted.'}
      </div>
      <div className='mt-2 text-[#666]'>
        <div>
          Type <span className='text-[#00cc00]'>audio</span> again to toggle.
        </div>
        {action === 'enabled' && (
          <div className='mt-1'>
            Current settings: Typing sound {isTypingSoundEnabled ? 'ON' : 'OFF'}
          </div>
        )}
      </div>
    </div>
  )
}
