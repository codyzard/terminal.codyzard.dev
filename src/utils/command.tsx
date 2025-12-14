// utils/commands.tsx
import type {Command} from '../types'

// Dữ liệu cá nhân của bạn
const userData = {
  name: 'Le Hoang Tu',
  title: 'Software Engineer',
  email: 'mrahn1234@gmail.com',
  github: 'https://github.com/codyzard',
  linkedin: 'https://www.linkedin.com/in/l%C3%AA-ho%C3%A0ng-t%C3%BA-676b89136/',
  blog: 'https://developers.prtimes.jp/author/lehoangtu498b09a43f',
  location: 'Tokyo, Japan',
}

// Hàm hiển thị danh sách lệnh (HELP command)
const helpCommand: Command = {
  name: 'help',
  description: 'Lists all available commands.',
  execute: () => {
    const commandList = Object.values(commands)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cmd) => (
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
          <p className="mb-2 text-lg text-white">{userData.title}</p>
          <p>
            Hi, I&apos;m **{userData.name}**, a passionate developer specializing in modern web
            technologies like **Next.js, React, and TypeScript**. Now based in Tokyo, Japan
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
          <p className="text-xl text-yellow-400">[ 💻 Initializing Terminal Portfolio ]</p>
          <p className="mt-1 text-sm text-green-500">
            $ system_info: Hostname: Codyzard.dev | User: Le Hoang Tu (Guest)
          </p>
          <div className="mt-4">
            <p>Authentication success. Welcome to the **Codyzard.dev** CLI.</p>
            <p>I`&apos;`m **Le Hoang Tu**, a developer specializing in modern web stack.</p>
            <p className="mt-2 text-cyan-400">* Status: Awaiting command input...</p>
          </div>
          <p className="mt-3">
            Type **`&apos;`help`&apos;`** for command directory, or **`&apos;`summary`&apos;`** to
            begin.
          </p>
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
          <p className="mb-2 text-lg text-white">My Tech Stack 💻:</p>
          {/* Bạn có thể thay đổi nội dung này theo kỹ năng thực tế của mình */}
          <div className="grid grid-cols-2 gap-y-1">
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

// --- Lệnh resume ---
const resumeCommand: Command = {
  name: 'resume',
  description: 'Opens my professional Resume in a new browser tab.',
  execute: () => {
    // Sử dụng đường dẫn tuyệt đối bắt đầu từ root (thư mục public)
    window.open('/resume.pdf', '_blank')

    return {
      content: 'Opening Resume in a new tab...',
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
      window.open(userData.blog, '_blank')
      return {content: 'Opening blog in a new tab...'}
    },
  },
  github: {
    name: 'github',
    description: 'Opens my GitHub profile in a new tab.',
    execute: () => {
      window.open(userData.github, '_blank')
      return {content: 'Opening GitHub profile in a new tab...'}
    },
  },
  linkedin: {
    name: 'linkedin',
    description: 'Opens my LinkedIn profile in a new tab.',
    execute: () => {
      window.open(userData.linkedin, '_blank')
      return {content: 'Opening LinkedIn profile in a new tab...'}
    },
  },
  contact: contactCommand,
  welcome: welcomeCommand,
  skills: skillsCommand,
  clear: clearCommand,
  resume: resumeCommand,
}
