export type Photo = {
  src: string
  alt: string
  caption?: string
  /** CSS object-position focal point for cropping; defaults to centered. */
  position?: string
}

/**
 * Real department photography (students, classes, showcases, commencement).
 * Sits alongside the AI-generated hero images in /public/images; grouped here by the page
 * each set appears on so captions can be edited without touching layout code.
 */
const p = (file: string, alt: string, caption?: string, position?: string): Photo => ({
  src: `/images/photos/${file}.webp`,
  alt,
  caption,
  position,
})

export const homeGallery: Photo[] = [
  p('showcase-hall', 'Students presenting research posters to visitors in a crowded showcase hall', 'Research showcase day'),
  p('lab-class-wide', 'Students working at dual-monitor workstations in a computer lab', 'Hands-on lab sessions'),
  p('hardware-lab', 'Students assembling a small robot and electronics on a lab bench', 'Building hardware, not just software'),
  p('research-poster-duo', 'Two students standing beside their research poster', 'Student research, presented'),
  p('commencement-trio', 'Two graduates in caps and gowns with a faculty member in academic regalia', 'Commencement'),
]

export const aboutGallery: Photo[] = [
  p('student-gathering', 'A large group of department students gathered together in a campus hall', 'A department that knows each other'),
  p('showcase-conversation', 'A student explaining a data poster to a faculty member', 'One-on-one with faculty'),
  p('lab-class-workstations', 'A full computer lab class with students at workstations', 'Small, focused classes'),
]

export const programsGallery: Photo[] = [
  p('lab-mentoring', 'A faculty member working through code with a group of students around a table', 'Coding side by side with faculty'),
  p('research-poster-review', 'A student walking a visitor through a research poster', 'Capstone and research projects'),
]

export const facultyPhoto: Photo = p(
  'teaching-lecture',
  'A professor lecturing to students in a computer classroom',
  'Faculty who teach every class themselves',
)

export const achievementsGallery: Photo[] = [
  p('showcase-judges', 'A student presenting a research poster to judges', 'Presenting to judges'),
  p('showcase-presentation', 'A student presenting a project to faculty and visitors', 'Defending the work'),
  p('showcase-poster-explain', 'A student pointing out results on a research poster at a conference', 'Research on the road'),
]

export const eventsGallery: Photo[] = [
  p('commencement-portrait', 'Two graduates in regalia with a faculty member at commencement', 'Commencement', 'center 35%'),
  p('commencement-trio', 'Graduates holding diplomas and flowers beside a faculty member in red regalia', 'Celebrating our graduates'),
]

export const admissionsPhoto: Photo = p(
  'teaching-whiteboard',
  'A professor writing on a whiteboard while students follow along',
  'Sit in on a real class',
  'center 20%',
)
