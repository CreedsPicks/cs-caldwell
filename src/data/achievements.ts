export type Achievement = {
  id: string
  year: string
  title: string
  category: string
  detail: string
  highlight?: boolean
}

export const achievements: Achievement[] = [
  {
    id: 'garden-state-hackathon',
    year: '2026',
    title: 'First Place, Garden State Collegiate Hackathon',
    category: 'Hackathon',
    detail:
      'A four-student Caldwell team placed first overall out of 38 teams — beating squads from Princeton and Columbia — with a live disaster-response routing tool built in 24 hours.',
    highlight: true,
  },
  {
    id: 'acm-icpc',
    year: '2026',
    title: 'Regional Finalist, ACM ICPC Programming Contest',
    category: 'Competitive Programming',
    detail:
      'Caldwell’s three-person team advanced to the regional finals of the International Collegiate Programming Contest for the second year running.',
  },
  {
    id: 'cyber-defense',
    year: '2025',
    title: 'Top 5, Northeast Collegiate Cyber Defense Competition',
    category: 'Cybersecurity',
    detail:
      'The student-run Cyber Defense team finished in the top five of the regional bracket, defending a simulated corporate network against live red-team attacks for eight hours straight.',
  },
  {
    id: 'ivy-showdown',
    year: '2025',
    title: 'Outscored Two Ivy League Teams at HackNJ',
    category: 'Hackathon',
    detail:
      'At the statewide HackNJ invitational, Caldwell’s team out-scored entries from two Ivy League computer science programs in the judged product round, drawing attention from regional tech recruiters.',
    highlight: true,
  },
  {
    id: 'ai-case-competition',
    year: '2025',
    title: 'Winner, NJ Collegiate AI Case Competition',
    category: 'Applied AI',
    detail:
      'A team of Computer Information Systems majors won the state case competition for a machine-learning model that predicts hospital readmission risk.',
  },
  {
    id: 'internship-placement',
    year: 'Ongoing',
    title: '94% Internship Placement Rate',
    category: 'Career Outcomes',
    detail:
      'Nine in ten CS and CIS majors complete at least one paid internship before graduating, at employers ranging from regional fintech startups to Fortune 500 technology teams.',
  },
]

export const stats = [
  { value: '38', label: 'Teams beaten for first place at Garden State Hackathon' },
  { value: '6', label: 'Regional & state competitions placed in since 2025' },
  { value: '94%', label: 'Students with a paid internship before graduation' },
  { value: '12:1', label: 'Student-to-faculty ratio in CS & CIS courses' },
]
