import type {Command} from '../types'

export const skillsCommand: Command = {
  name: 'skills',
  description: 'Displays my technical expertise (tech stack).',
  execute: () => {
    return {
      content: (
        <>
          <p className="mb-2 text-white text-lg">My Tech Stack 💻:</p>
          <div className="gap-x-4 gap-y-1 grid grid-cols-[auto_max-content] max-w-md">
            <span className="font-bold text-yellow-400">Frontend:</span>{' '}
            <span>React, Next.js, TypeScript, Tailwind CSS</span>
            <span className="font-bold text-yellow-400">Backend:</span>{' '}
            <span>PHP, Go, Hono, Node.js, Express</span>
            <span className="font-bold text-yellow-400">Database:</span>{' '}
            <span>PostgreSQL, MySQL, DynamoDB</span>
            <span className="font-bold text-yellow-400">DevOps/Tools:</span>{' '}
            <span>Git, Docker, AWS (S3, Lambda), CI/CD</span>
            <span className="font-bold text-yellow-400">Languages:</span>{' '}
            <span>English, Japanese, Vietnamese</span>
          </div>
        </>
      ),
    }
  },
}
