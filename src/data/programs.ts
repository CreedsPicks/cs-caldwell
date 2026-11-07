export type Program = {
  id: string
  level: 'Undergraduate' | 'Graduate' | 'Combined Pathway'
  name: string
  credits: string
  description: string
  tracks?: string[]
}

export const programs: Program[] = [
  {
    id: 'bs-computer-science',
    level: 'Undergraduate',
    name: 'B.S. in Computer Science',
    credits: '120 credits',
    description:
      'A rigorous core in algorithms, systems, and mathematics paired with hands-on studio courses in AI, cybersecurity, and software engineering. Every student ships a capstone product with a real client.',
    tracks: ['Artificial Intelligence', 'Cybersecurity', 'Software Engineering'],
  },
  {
    id: 'bs-computer-information-systems',
    level: 'Undergraduate',
    name: 'B.S. in Computer Information Systems',
    credits: '120 credits',
    description:
      'Built for students who want to sit at the intersection of technology and business — database design, systems analysis, and enterprise architecture taught alongside management fundamentals.',
    tracks: ['Business Systems Track', 'Data Analytics Track'],
  },
  {
    id: 'minor-computer-science',
    level: 'Undergraduate',
    name: 'Minor in Computer Science',
    credits: '21 credits',
    description:
      'For students majoring outside the department who want fluency in programming, data structures, and applied computing to bring back to biology, business, criminal justice, or the arts.',
  },
  {
    id: 'ms-computer-science',
    level: 'Graduate',
    name: 'M.S. in Computer Science',
    credits: '30 credits',
    description:
      'A project-driven graduate program in applied AI and systems design, taught in small evening seminars by faculty who are still active researchers and industry consultants.',
    tracks: ['Applied Machine Learning', 'Cloud & Distributed Systems'],
  },
  {
    id: 'combined-bs-ms',
    level: 'Combined Pathway',
    name: 'Five-Year B.S./M.S. in Computer Science',
    credits: '150 credits total',
    description:
      "High-achieving majors can begin graduate coursework in their senior year, finishing a master's degree just one extra year after their bachelor's — at substantial tuition savings.",
  },
]

export const curriculumHighlights = [
  {
    title: 'Studio-Based Learning',
    detail: 'Every major spends at least four semesters in project studios instead of lecture-only courses — building, breaking, and shipping real software.',
  },
  {
    title: 'Industry Capstones',
    detail: 'Senior capstone teams build for outside clients, from local nonprofits to regional fintech startups, with faculty acting as technical advisors.',
  },
  {
    title: 'Research From Day One',
    detail: 'First-years can join faculty research groups in applied AI, network security, and human-computer interaction well before their junior year.',
  },
]
