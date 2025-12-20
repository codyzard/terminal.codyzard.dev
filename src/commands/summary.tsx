import type {Command} from '../types'
import {userData} from '../config/user-data'

export const summaryCommand: Command = {
  name: 'summary',
  description: 'A brief overview of my professional background.',
  execute: () => {
    return {
      content: (
        <>
          <p className='mb-2 text-lg text-white'>{userData.title}</p>
          <p>
            Hi, I&apos;m **{userData.name}**, a passionate developer specializing in modern web
            technologies like **Next.js, React, and TypeScript**. Now based in Tokyo, Japan
          </p>
          <p className='mt-2'>
            Use **&apos;skills&apos;** to see my tech stack or **&apos;contact&apos;** for my
            details.
          </p>
        </>
      ),
    }
  },
}
