// utils/commands.tsx
import { Command } from '../types/types'

// Dữ liệu cá nhân của bạn
const userData = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  email: 'john.doe@example.com',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
}

// Hàm hiển thị danh sách lệnh (HELP command)
const helpCommand: Command = {
  name: 'help',
  description: 'Lists all available commands.',
  execute: () => {
    const commandList = Object.values(commands).map((cmd) => (
      <div key={cmd.name} className="flex space-x-4">
        <span className="inline-block w-24 text-yellow-400">{cmd.name}</span>
        <span>{cmd.description}</span>
      </div>
    ))

    return {
      content: (
        <>
          <p className="mb-2">Available commands:</p>
          {commandList}
          <p className="mt-2">Type any command above and press Enter.</p>
        </>
      ),
    }
  },
}

// Lệnh SUMMARY
const summaryCommand: Command = {
  name: 'summary',
  description: 'A brief overview of my professional background.',
  execute: () => {
    return {
      content: (
        <>
          <p className="mb-2 text-white text-lg">{userData.title}</p>
          <p>
            Hi, I&apos;m **{userData.name}**, a passionate developer specializing in modern web
            technologies like **Next.js, React, and TypeScript**. I focus on building performant,
            scalable, and user-friendly applications.
          </p>
          <p className="mt-2">
            Use **&apos;skills&apos;** to see my tech stack or **&apos;contact&apos;** for my
            details.
          </p>
        </>
      ),
    }
  },
}

// Lệnh CONTACT
const contactCommand: Command = {
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

// Lệnh WELCOME (chạy khi khởi động)
const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message.',
  execute: () => {
    return {
      content: (
        <>
          <p className="text-yellow-400 text-3xl">**TERMINAL PORTFOLIO**</p>
          <p className="mt-4">
            Welcome to my personal portfolio. This interface simulates a UNIX-like shell.
          </p>
          <p>Type **&apos;help&apos;** to see the list of available commands.</p>
        </>
      ),
    }
  },
}

// Lệnh SKILLS
const skillsCommand: Command = {
  name: 'skills',
  description: 'Displays my technical expertise (tech stack).',
  execute: () => {
    return {
      content: (
        <>
          <p className="mb-2 text-white text-lg">My Tech Stack:</p>
          {/* Bạn có thể thay đổi nội dung này theo kỹ năng thực tế của mình */}
          <div className="gap-y-1 grid grid-cols-2">
            <span className="font-bold text-yellow-400">Frontend:</span>{' '}
            <span>React, Next.js, TypeScript, Tailwind CSS, Redux/Zustand</span>
            <span className="font-bold text-yellow-400">Backend:</span>{' '}
            <span>Node.js, Express, Python (Django/Flask), GraphQL</span>
            <span className="font-bold text-yellow-400">Database:</span>{' '}
            <span>PostgreSQL, MongoDB</span>
            <span className="font-bold text-yellow-400">DevOps/Tools:</span>{' '}
            <span>Git, Docker, AWS (S3, Lambda), CI/CD</span>
          </div>
        </>
      ),
    }
  },
}

// Lệnh CLEAR
const clearCommand: Command = {
  name: 'clear',
  description: 'Clears the terminal history.',
  execute: () => {
    // Lệnh này không trả về nội dung, mà trả về một hành động đặc biệt
    return {
      content: '',
      specialAction: 'clear',
    }
  },
}

// Tập hợp tất cả các lệnh
export const commands: { [key: string]: Command } = {
  help: helpCommand,
  summary: summaryCommand,
  blog: {
    name: 'blog',
    description: 'Opens my development blog in a new tab.',
    execute: () => {
      window.open('YOUR_BLOG_URL', '_blank')
      return { content: 'Opening blog in a new tab...' }
    },
  },
  github: {
    name: 'github',
    description: 'Opens my GitHub profile in a new tab.',
    execute: () => {
      window.open(userData.github, '_blank')
      return { content: 'Opening GitHub profile in a new tab...' }
    },
  },
  linkedin: {
    name: 'linkedin',
    description: 'Opens my LinkedIn profile in a new tab.',
    execute: () => {
      window.open(userData.linkedin, '_blank')
      return { content: 'Opening LinkedIn profile in a new tab...' }
    },
  },
  contact: contactCommand,
  welcome: welcomeCommand,
  skills: skillsCommand,
  clear: clearCommand,
}
