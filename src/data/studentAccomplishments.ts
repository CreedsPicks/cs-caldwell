export type AccomplishmentLink = {
  label: string
  href: string
}

export type Recognition = {
  id: string
  title: string
  /** Students involved, shown as a byline under the title. */
  students?: string[]
  /** Prize or outcome, shown as a gold badge. */
  result?: string
  detail?: string
  /** Extra lines such as a list of winning teams. */
  list?: { heading: string; items: string[] }
  links?: AccomplishmentLink[]
}

export type Author = {
  name: string
  /** Student authors are rendered in bold. */
  student?: boolean
}

export type Publication = {
  id: string
  authors: Author[]
  year: string
  title: string
  venue: string
  award?: string
}

export type AccomplishmentYear = {
  year: string
  fellowships?: Recognition[]
  hackathons?: Recognition[]
  publications?: Publication[]
}

const veksler: Author = { name: 'Veksler, V. D.' }

export const accomplishmentYears: AccomplishmentYear[] = [
  {
    year: '2026',
    fellowships: [
      {
        id: 'sedai-phi-kappa-phi',
        title: '2026 Phi Kappa Phi Fellowship & Bond Fellowship',
        students: ['Anshuraj Sedai ’26'],
        result: 'Fellowship recipient',
        detail:
          'Anshuraj received the 2026 Phi Kappa Phi Fellowship, awarded to members entering their first year of graduate or professional study. He also received the Bond Fellowship, recognizing the top-scoring nominees in the fields of mathematics or information technology.',
        links: [
          {
            label: '2026 fellowship recipients',
            href: 'https://www.phikappaphi.org/grants-awards/fellowship/2026-fellowship-recipients',
          },
        ],
      },
    ],
    hackathons: [
      {
        id: 'hack-uri-2026',
        title: 'Two prizes at Hack@URI 2026',
        students: ['Pranish Uprety', 'Anshuraj Sedai', 'Shovan Raut', 'Rahul Mandal'],
        result: '1st place, Health Track · Best Use of PreSage (MLH)',
        detail:
          'Out of more than 100 undergraduate, Master’s, and PhD participants at the University of Rhode Island’s annual hackathon, the team took first place in the Health Track and also won “Best Use of PreSage,” a Major League Hacking sponsor track. Their project, Respondr, is an AI-assisted emergency response platform that continuously monitors wearable health data — heart rate, respiratory rate, oxygen levels, and activity patterns — detects abnormal trends automatically, and instantly connects patients with medical responders through live dashboards and video calls.',
        links: [{ label: 'Respondr on Devpost', href: 'https://devpost.com/software/respondr-zqegfs' }],
      },
      {
        id: 'hackprinceton-2026',
        title: 'HackPrinceton 2026 Spring',
        students: ['Pranish Uprety', 'Anshuraj Sedai', 'Binayak Subedi', 'Rahul Mandal'],
        result: 'Accepted & participated',
        detail:
          'Accepted to a 36-hour hackathon held at Princeton University, April 17–19, 2026. The team built CarboKnot, a Chrome extension that shows users the carbon cost of items before they purchase them. Calculations run directly on the device, results are explained with AI, and the tool connects to a user’s purchase history for a more personalized experience.',
      },
      {
        id: 'hoya-hacks-2026',
        title: 'Hoya Hacks 2026',
        students: ['Pranish Uprety', 'Anshuraj Sedai', 'Binayak Subedi', 'Rahul Mandal'],
        result: 'Accepted & participated',
        detail:
          'At Georgetown University’s annual hackathon, the team built CampPulse, a full-stack campus crowdsourcing app that merges real-time check-ins, safety reports, and location-based insights so students can see what is happening, where it is happening, and how to move safely.',
        links: [{ label: 'CampPulse on Devpost', href: 'https://devpost.com/software/camppulse' }],
      },
    ],
    publications: [
      {
        id: 'poudel-sede-2026',
        authors: [{ name: 'Poudel, Samarpan', student: true }, veksler],
        year: '2026',
        title:
          'Trusting Right Predictions for Wrong Reasons: A LIME Based Analysis of Deep Learning Interpretability in Lung Cancer Diagnosis',
        venue: '35th SEDE Conference: Software & Data Engineering (SEDE 2026). San Francisco, CA.',
      },
      {
        id: 'poudel-ccscne-2026',
        authors: [{ name: 'Poudel, Samarpan', student: true }, veksler],
        year: '2026',
        title:
          'Beyond Accuracy: A LIME-Based Comparative Analysis of Custom CNN and Pretrained ResNet50 for Lung Cancer CT Classification',
        venue:
          '30th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Northampton, MA.',
        award: 'Best Research Poster Award (2nd place)',
      },
      {
        id: 'regmi-ccscne-2026',
        authors: [{ name: 'Regmi, Satyam', student: true }, veksler],
        year: '2026',
        title: 'Facial Expression Recognition and Response with Tension Mapping and LLM-Assisted Dialogue',
        venue:
          '30th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Northampton, MA.',
      },
      {
        id: 'khadka-ccscne-2026',
        authors: [{ name: 'Khadka, Anuj', student: true }, veksler],
        year: '2026',
        title: 'Robo-Advisors and the Investor Experience',
        venue:
          '30th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Northampton, MA.',
      },
    ],
  },
  {
    year: '2025',
    hackathons: [
      {
        id: 'nasa-space-apps-2025',
        title: 'NASA International Space Apps Challenge at Caldwell',
        result: 'Largest attendance in New Jersey',
        detail: 'Caldwell University hosted the NASA International Space Apps Challenge in October 2025.',
      },
      {
        id: 'cougarhacks-2025',
        title: 'CougarHacks — Caldwell’s first hackathon',
        result: '50+ participants · 4 prizes',
        detail: 'Caldwell University’s first-ever hackathon drew over 50 participants, with four prizes awarded.',
        list: {
          heading: 'Prize winners',
          items: [
            'Keepa Maharjan, Mishal Ayub, Temilola Olanrewaju',
            'Kushma Saud, Samarpan Poudel, Satyam Regmi, Sparsha Regmi',
            'Rishab Ghimire',
            'Shovan Raut',
          ],
        },
      },
      {
        id: 'calhacks-2025',
        title: 'CalHacks 12.0',
        students: ['Anish Pandey', 'Saugat Subedi', 'Dikshya Giri'],
        result: 'Honorable Mention, category prize',
        detail: 'Accepted to and participated in the largest collegiate-level hackathon in the United States.',
      },
      {
        id: 'hackmit-2025',
        title: 'HackMIT 2025',
        students: ['Anish Pandey', 'Rajesh Paudel', 'Utsarga Pokharel'],
        result: 'Top 10 main prize finalists',
        detail: 'Accepted to and participated in HackMIT, with 1,500+ participants and 365+ submitted projects.',
      },
      {
        id: 'hophacks-2025',
        title: 'HopHacks 2025',
        students: ['Shovan Raut'],
        result: 'Top prize, Best Healthcare Hack',
        detail: 'Accepted to and participated in Johns Hopkins University’s annual hackathon.',
      },
      {
        id: 'hackprinceton-2025',
        title: 'HackPrinceton 2025',
        students: ['Pranish Upreti', 'Rahul Mandal', 'Himal Gautam'],
        result: 'Accepted & participated',
        detail:
          'The team built NeuroNudge, a Chromium-based browser extension that tracks time spent on websites, monitors keystrokes, and provides a productivity dashboard, time limits, and website blocking. It works as both a productivity enhancer and a parental control tool — especially for parents whose kids use Chromebooks as learning devices.',
        links: [{ label: 'NeuroNudge on Devpost', href: 'https://devpost.com/software/project-dristi' }],
      },
      {
        id: 'hackdartmouth-2025',
        title: 'HackDartmouth X 2025',
        students: ['Dikxant Bhandari', 'Himal Gautam', 'Pranish Uprety', 'Rahul Mandal'],
        result: 'Selected to participate',
        detail:
          'The team developed BayMax, an adaptive web app for professional therapists and individuals seeking therapy.',
        links: [{ label: 'BayMax on Devpost', href: 'https://devpost.com/software/baymax-jqlo2b' }],
      },
      {
        id: 'hacknyu-2025',
        title: 'HackNYU 2025',
        students: ['Anish Pandey', 'Dikshya Giri'],
        result: 'Top prize, Security & Privacy Track',
        detail: 'Accepted to and participated in NYU’s annual hackathon.',
      },
    ],
    publications: [
      {
        id: 'veksler-jccsc-2025',
        authors: [veksler, { name: 'Veksler, B. Z.' }, { name: 'Khadka, A.', student: true }],
        year: '2025',
        title: 'Plagiarism Detection and Deterrence Using Behavioral Tracking',
        venue: 'Journal of Computing Sciences in Colleges, 41(3).',
      },
      {
        id: 'thapa-ccsce-2025',
        authors: [{ name: 'Thapa, K.', student: true }, { name: 'Adhikari, D.', student: true }, veksler],
        year: '2025',
        title: 'Evaluating LMS Usability and Accessibility for Students and Instructors',
        venue:
          '41st annual conference of the Consortium for Computing Sciences in Colleges, Eastern Region (CCSC Eastern). Glenside, PA.',
      },
      {
        id: 'maharjan-ccsce-2025',
        authors: [{ name: 'Maharjan, K.', student: true }, veksler],
        year: '2025',
        title: 'Detecting Plagiarism through Visualization of Coding Activity Logs',
        venue:
          '41st annual conference of the Consortium for Computing Sciences in Colleges, Eastern Region (CCSC Eastern). Glenside, PA.',
      },
      {
        id: 'mensah-ccscne-2025',
        authors: [{ name: 'Mensah, P.', student: true }, veksler],
        year: '2025',
        title: 'A Comparative Analysis of UINL and HTML/CSS for Web Application',
        venue:
          '29th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Brockport, NY.',
      },
      {
        id: 'sharma-ccscne-2025',
        authors: [{ name: 'Sharma, K.', student: true }, veksler],
        year: '2025',
        title: 'Plagiarism detection in Computer Programming assignments using behavior tracking',
        venue:
          '29th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Brockport, NY.',
      },
    ],
  },
  {
    year: '2024',
    hackathons: [
      {
        id: 'hackprinceton-2024',
        title: 'Top prize at HackPrinceton 2024',
        students: ['Khagendra Khatri'],
        result: '1st overall + 3 prizes',
        detail:
          'Khagendra led his team to win three different prizes and the first overall prize for CrystalMath, an AI-powered platform that brings math to life with dynamic video animations and voice-over explanations, offering engaging, step-by-step solutions that transform how users learn, teach, and explore mathematics.',
        links: [{ label: 'CrystalMath on DoraHacks', href: 'https://dorahacks.io/buidl/19465' }],
      },
      {
        id: 'hacknjit-2024',
        title: '2nd overall prize at HackNJIT',
        students: ['Prashant Khatiwada', 'Anish Pandey', 'Dikshya Giri'],
        result: '2nd place overall',
        detail:
          'The team turned repetitive industrial tasks into an interactive, game-driven process: players catch apples in a simple game while a virtual hand precisely mirrors their movements to pick up and place real items in real time.',
      },
      {
        id: 'hackru-2024',
        title: 'First-place prize at Rutgers HackRU',
        students: ['Khagendra Khatri', 'Suman Sah'],
        result: '1st place, Failure to Launch category',
        detail:
          'At the 24-hour hackathon the team presented ODG-Vision, which empowers visually impaired users with real-time object detection, facial recognition, and voice guidance for confident, independent navigation.',
      },
      {
        id: 'nasa-space-apps-2024',
        title: 'NASA Space Apps Challenge 2024',
        result: 'Largest on the East Coast · 4th largest in the US',
        detail:
          'Caldwell University students created multiple projects, making Caldwell’s the largest NASA Space Apps participation on the East Coast and the fourth largest in the US.',
        links: [
          {
            label: 'Caldwell teams',
            href: 'https://www.spaceappschallenge.org/nasa-space-apps-2024/2024-local-events/caldwell/?tab=teams',
          },
        ],
      },
      {
        id: 'hophacks-2024',
        title: '2nd place at HopHacks (Johns Hopkins)',
        students: ['Dibas Daulia', 'Khagendra Khatri', 'Suman Sah'],
        result: '2nd place',
      },
      {
        id: 'makenjit-2024',
        title: 'MakeNJIT robotics hackathon',
        students: ['Anish Pandey', 'Dibas Dauliya', 'Saugat Timalsina'],
        result: 'Participated',
        detail: 'Caldwell’s robotics team impressed the judges with a strong showing.',
      },
    ],
    publications: [
      {
        id: 'gedenidze-ccscne-2024',
        authors: [{ name: 'Gedenidze, N.', student: true }, veksler],
        year: '2024',
        title: 'A Layer-Freezing Approach for Reduced Backpropagation Demand',
        venue:
          '28th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Albany, NY.',
      },
      {
        id: 'salazar-ccscne-2024',
        authors: [{ name: 'Salazar, J.', student: true }, veksler],
        year: '2024',
        title: 'Comparing Touch-Based Coding to Traditional Computer Programming Methods',
        venue:
          '28th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Albany, NY.',
      },
      {
        id: 'khatri-ccscne-2024',
        authors: [{ name: 'Khatri, K.', student: true }, { name: 'Khadka, S.', student: true }, veksler],
        year: '2024',
        title: 'ML for Plagiarism Detection in Coding Assignments',
        venue:
          '28th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Albany, NY.',
      },
      {
        id: 'gogitidze-ccscne-2024',
        authors: [{ name: 'Gogitidze, G.', student: true }, veksler],
        year: '2024',
        title: 'Using a GPT with Reinforcement Learning for More Personalized or Targeted Text Generation',
        venue:
          '28th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Albany, NY.',
      },
    ],
  },
  {
    year: '2023',
    hackathons: [
      {
        id: 'vassar-datafest-2023',
        title: 'Best in category at Vassar Data Analysis Competition',
        students: ['Saurav Ghimire'],
        result: 'The Best Data Visualization',
        detail:
          'Saurav’s team won “The Best Data Visualization” category at the Data Analysis Competition organized by Vassar College and sponsored by the American Statistical Association.',
        links: [{ label: 'Caldwell news story', href: 'https://www.caldwell.edu/student-wins-datafest-2023/' }],
      },
      {
        id: 'icunj-2024',
        title: 'ICUNJ 2024 STEM Undergraduate Research Symposium',
        students: ['Ishaq Ansari'],
        result: '2nd place',
      },
    ],
    publications: [
      {
        id: 'veksler-brain-informatics-2023',
        authors: [veksler, { name: 'Gedenidze, N.', student: true }, { name: 'Yadav, R.', student: true }],
        year: '2023',
        title: 'Visual Cortex Doesn’t Change, Why should Convolutional Layers?',
        venue: 'The 16th International Conference on Brain Informatics. Hoboken, NJ, USA.',
      },
      {
        id: 'gedenidze-ccscne-2023',
        authors: [{ name: 'Gedenidze, N.', student: true }, veksler],
        year: '2023',
        title: 'Backpropagation is expensive. Is it necessary?',
        venue:
          '27th annual conference of the Consortium for Computing Sciences in Colleges, Northeastern Region (CCSCNE). Ithaca, NY.',
      },
    ],
  },
]

/** Student-led manuscripts in progress, to be submitted to journals and conferences. */
export const manuscriptsInProgress: { student: string; title: string }[] = [
  {
    student: 'Pranish Uprety',
    title: 'Quantifying and Forecasting the Impact of the 2025 U.S. Government Shutdown on New York–Metro Flight Delays',
  },
  {
    student: 'Eleazar Gebeyehu',
    title:
      'Privacy Leakage and Membership Inference in AI Systems: From Tabular Regularization to Preprocessing Tokenization Backdoors',
  },
  { student: 'Olaoluwa Bayo-Oluyamo', title: 'AI in Phishing Detection and Generation' },
  {
    student: 'Ashley Chio',
    title: 'Reverse Engineering for Malware Analysis: A Task-Centric Survey of Tools, Techniques, and Automation',
  },
  { student: 'Prayag Adhikari', title: 'Measuring and Mitigating NER Accuracy Degradation in Creative Resumes' },
  {
    student: 'Deepson Acharya',
    title:
      'Every Symbol Explained: A Dependency-Ordered Path to the Attention Mechanism, with an Empirical Study of Next-Token Uncertainty',
  },
  {
    student: 'Mushna Wahid Mumayyaz',
    title: 'Evaluating the Effectiveness of AI-Powered Tools in Library Databases for Caldwell University Students',
  },
  {
    student: 'Ganesh Karki',
    title:
      'When Humans and Robots Make Bad Bets: Prospect Theory-Calibrated Reinforcement Learning for Financial Trading',
  },
  {
    student: 'Gaurav Giri',
    title:
      'NepLearn: Parameter Efficient Deep Learning and Morphological RL Alignment for Low Resource Nepali Transcription',
  },
  {
    student: 'Prashun Shrestha',
    title:
      'Toward a Systematic Taxonomy of Zero-Knowledge Circuit Vulnerabilities: A Corpus-Driven Analysis Across Application Domains',
  },
  { student: 'Nabin Oli', title: 'Adversarial Attacks on Dynamic Malware Detection' },
]

export const summerInternships2026: string[] = ['Mushna Wahid Mumayyaz', 'Ragini Adhikari']
