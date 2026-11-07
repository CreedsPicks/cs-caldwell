export type FacultyLink = {
  label: string
  href: string
}

export type FacultyMember = {
  id: string
  name: string
  title: string
  focus: string
  bio: string
  initials: string
  /** Headshot path under /public; falls back to the initials monogram when absent. */
  photo?: string
  email?: string
  phone?: string
  office?: string
  links?: FacultyLink[]
}

export const faculty: FacultyMember[] = [
  {
    id: 'veksler',
    name: 'Dr. Vladislav D. Veksler',
    title: 'Department Chair & Assistant Professor of Computer Science',
    focus: 'AI, Human-Computer Interaction & Cognitive Modeling',
    bio: 'Dr. Vlad Veksler’s research and teaching span Artificial Intelligence and Machine Learning, UI/UX and Human-Computer Interaction, Human-Agent Teaming, Cybernetics, Cognitive Modeling and Behavioral Simulations, Behavioral Game Theory, AI in Games, and Cognitive Robotics. Students who want to get involved in scientific research in these fields can explore opportunities at the CogAI Research Laboratory.',
    initials: 'VV',
    photo: '/images/faculty/veksler.jpg',
    email: 'vveksler@caldwell.edu',
    phone: '973-618-3028',
    office: 'Visceglia Hall 204A',
    links: [{ label: 'CogAI Research Laboratory', href: 'https://sites.google.com/caldwell.edu/cogai' }],
  },
  {
    id: 'kreutzer',
    name: 'Dr. Steven E. Kreutzer',
    title: 'Dean & Associate Professor of Computer Science',
    focus: 'Software Development & Technology Management',
    bio: 'Dr. Kreutzer holds a B.S. in Computer Science from Union College and M.S. and PhD degrees in Computer Science from Northwestern University. Before academia he built a long industry career in product management, business analysis, software development, and project management at AT&T Bell Laboratories, PricewaterhouseCoopers, and AIG, and led management consulting practices serving senior executives in twelve countries. A college professor since 2012, he has taught more than a dozen computer science courses and takes great joy in seeing his students receive excellent job offers and graduate — in that order.',
    initials: 'SK',
    photo: '/images/faculty/kreutzer.webp',
    email: 'skreutzer@caldwell.edu',
    phone: '973-618-3646',
  },
  {
    id: 'ferraro',
    name: 'Dr. Salvatore Ferraro',
    title: 'Associate Professor',
    focus: 'Management Information Systems & Organizational Leadership',
    bio: '“Dr. Sal” has worked for companies ranging from family-run businesses to Fortune 500 firms across the manufacturing, telecommunications, healthcare, shipping, and aerospace industries. He earned his degrees while working and raising a family — an Associate of Science in Quality Assurance, a B.S. and Master’s in Management Information Systems, and, twenty-five years into the journey, a doctorate in management information systems and organizational leadership. Outside the classroom he skis six months of the year, rides motorcycles the other six, and has taught both.',
    initials: 'SF',
    email: 'sferraro@caldwell.edu',
    phone: '973-618-3376',
    links: [
      { label: 'DataCamp for Universities', href: 'https://www.datacamp.com/universities' },
      { label: 'DataCamp', href: 'https://datacamp.com/' },
    ],
  },
]
