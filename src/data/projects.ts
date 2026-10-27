export type Project = {
  id: string
  index: string
  name: string
  description: string
  technologies: string[]
  image: string
  repositoryUrl?: string
  liveUrl?: string
  detailsHref?: string
}

export const projects: Project[] = [
  {
    id: 'python-programs-collection',
    index: '01',
    name: 'Python Programs Collection',
    description:
      'A collection of Python programming exercises, including factorial, Fibonacci and struct-to-dictionary conversion, with supporting documentation.',
    technologies: ['Python', 'Jupyter Notebook'],
    image: '/assets/projects/python-programs.svg',
    repositoryUrl: 'https://github.com/TusharMital/python-programs-collection',
    detailsHref: '#/project/python-programs-collection',
  },
  {
    id: 'python-debugging',
    index: '02',
    name: 'Messy Python Code Improvement',
    description:
      'Coursework on inspecting, debugging and improving Python utilities. The repository uses unittest and a red–fix–green workflow to correct average, pass-mark and grade logic.',
    technologies: ['Python', 'unittest'],
    image: '/assets/projects/python-debugging.svg',
    repositoryUrl: 'https://github.com/TusharMital/lecture-8-python-debugging',
    detailsHref: '#/project/python-debugging',
  },
  {
    id: 'cursor-bug-fix',
    index: '03',
    name: 'Bug Fixing Using Cursor AI',
    description:
      'A debugging case study of a Python loop that overwrote a running total instead of accumulating values. The correction uses total += numbers[i], producing the expected sum of 150 for the supplied example.',
    technologies: ['Python'],
    image: '/assets/projects/cursor-bug-fix.svg',
    detailsHref: '#/project/cursor-bug-fix',
  },
  {
    id: 'interactive-quiz',
    index: '04',
    name: 'Interactive Quiz Application',
    description:
      'A responsive multiple-choice quiz built with HTML, CSS and JavaScript. It presents one question at a time, tracks score and progress, and includes light and dark themes with a restart option.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/assets/projects/interactive-quiz.svg',
    repositoryUrl: 'https://github.com/TusharMital/interactive-quiz-app',
    liveUrl: 'https://interactive-quiz-app-rosy.vercel.app/',
    detailsHref: '#/project/interactive-quiz',
  },
  {
    id: 'reading-list',
    index: '05',
    name: 'Book Reading List Application',
    description:
      'A reading list for adding books, managing statuses (Want to Read, Reading, Finished) and filtering the list. Built with React, TypeScript and Vite, with data kept in the browser.',
    technologies: ['React', 'TypeScript', 'Vite'],
    image: '/assets/projects/reading-list.svg',
    repositoryUrl: 'https://github.com/TusharMital/reading-list-app',
    liveUrl: 'https://reading-list-app-one.vercel.app/',
    detailsHref: '#/project/reading-list',
  },
]
