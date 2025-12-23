'use client'

import Link from 'next/link'
import {MatrixRain} from '@/src/components/matrix-rain'

export default function NotFound() {
  return (
    <div className='relative min-h-screen overflow-hidden bg-black'>
      <MatrixRain className='absolute inset-0 z-0' fontSize={16} />
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='mb-4 font-mono text-9xl font-bold text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]'>
            404
          </h1>
          <p className='mb-2 font-mono text-2xl text-[#00ff00] drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]'>
            Error: Page Not Found
          </p>
          <p className='mb-8 font-mono text-lg text-[#00cc00]'>
            The matrix you're looking for doesn't exist...
          </p>
          <Link
            href='/'
            className='inline-block border-2 border-[#00ff00] bg-black px-8 py-3 font-mono text-lg text-[#00ff00] transition-all hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.8)]'
          >
            {'> Return to Terminal'}
          </Link>
        </div>
      </div>
    </div>
  )
}
