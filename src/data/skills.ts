export type SkillGroup = {
  id: string
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming & Problem Solving',
    items: [
      'C and C++',
      'Python',
      'Data Structures and Algorithms',
      'Striver A2Z DSA Sheet',
      'LeetCode and Codeforces practice',
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Low-Level Computing',
    items: [
      'Operating Systems',
      'Computer Architecture',
      'Linux / Ubuntu using WSL2',
    ],
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    items: [
      'Computer Networking: A Top-Down Approach by Kurose and Ross',
      'Stanford CS144 networking materials',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Prompt Engineering',
    items: [
      'Prompt design and refinement',
      'AI-assisted development',
      'Generated-code review',
      'Testing, debugging and iteration',
    ],
  },
  {
    id: 'emerging',
    title: 'Emerging Technologies',
    items: [
      'Foundations of Quantum Computing',
      'Introductory quantum computing concepts and applications',
    ],
  },
]
