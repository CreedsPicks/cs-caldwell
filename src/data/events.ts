export type EventItem = {
  id: string
  date: { month: string; day: string }
  time: string
  title: string
  location: string
  description: string
}

export const upcomingEvents: EventItem[] = [
  {
    id: 'open-house-oct',
    date: { month: 'Oct', day: '17' },
    time: '10:00 AM – 1:00 PM',
    title: 'Computer Science Open House',
    location: 'Aquinas Hall, Room 214',
    description: 'Tour the department’s labs, meet faculty, and sit in on a live coding demo from the hackathon team.',
  },
  {
    id: 'hackathon-night',
    date: { month: 'Oct', day: '25' },
    time: '6:00 PM – Midnight',
    title: 'Caldwell Fall Hackathon Night',
    location: 'Jennings Library, Innovation Lab',
    description: 'An overnight build night open to all majors, with mentors from local tech employers dropping in.',
  },
  {
    id: 'open-house-nov',
    date: { month: 'Nov', day: '14' },
    time: '10:00 AM – 1:00 PM',
    title: 'Computer Science Open House',
    location: 'Aquinas Hall, Room 214',
    description: 'A second open house session for prospective students and families exploring the CS and CIS majors.',
  },
  {
    id: 'career-panel',
    date: { month: 'Dec', day: '03' },
    time: '4:30 PM – 6:00 PM',
    title: 'Alumni Careers in Tech Panel',
    location: 'Student Center, Great Room',
    description: 'Five Caldwell CS alumni return to campus to talk about their first jobs in software, security, and data.',
  },
]

export type NewsItem = {
  id: string
  title: string
  summary: string
  tag: string
}

export const newsItems: NewsItem[] = [
  {
    id: 'garden-state-recap',
    tag: 'Achievement',
    title: 'CS Students Take First Place at Garden State Hackathon',
    summary: 'A four-student team out-built 38 competing squads with a disaster-response routing tool in 24 hours.',
  },
  {
    id: 'new-cyber-lab',
    tag: 'Facilities',
    title: 'Department Opens New Cybersecurity Lab in Aquinas Hall',
    summary: 'A dedicated red-team/blue-team lab gives students hands-on practice defending live simulated networks.',
  },
  {
    id: 'faculty-grant',
    tag: 'Research',
    title: 'Dr. Delacroix Awarded Grant for Low-Resource Language Models',
    summary: 'The research grant will fund two undergraduate research assistants starting next semester.',
  },
]
