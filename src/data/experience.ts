export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  accent: string;
}

export const experience: ExperienceItem[] = [
  {
    period: '2024 — Present',
    title: 'Motion Designer & Creative Technologist',
    company: 'Freelance / Portfolio',
    description:
      'Designing high-impact motion graphics and developing interactive 3D web experiences. Specializing in bridging the gap between cinematic storytelling and technical implementation, utilizing AI-enhanced workflows to push the boundaries of digital content.',
    skills: ['After Effects', 'Cinema 4D', 'Next.js', 'Three.js', 'Claude', 'GSAP'],
    accent: '#F5A623',
  },
  {
    period: 'Oct 2023 — Dec 2023',
    title: 'Motion Graphic Designer',
    company: 'FUNDACIONPILARES · Freelance',
    description:
      'Illustration and content creation for an advertising campaign. Produced institutional videos including music and effects using Illustrator, After Effects, Cinema 4D, and Firefly.',
    skills: ['Illustrator', 'After Effects', 'Cinema 4D', 'Firefly'],
    accent: '#F6AD55',
  },
  {
    period: '2022 — 2024',
    title: 'Back-End & RPA Developer',
    company: 'IBM',
    description:
      'Developed enterprise automation workflows, back-end services, and DevOps pipelines. Built scalable solutions handling complex business logic and data processing.',
    skills: ['Java', 'Python', 'RPA', 'Docker', 'Linux', 'Enterprise Systems'],
    accent: '#00E5FF',
  },
  {
    period: '2020 — 2022',
    title: 'Application Developer',
    company: 'Tecnosoftware',
    description:
      'Built full-stack web applications, RESTful APIs, and internal business tools. Focused on maintainable, performant code and clean architecture.',
    skills: ['Node.js', 'REST APIs', 'SQL', 'Power Apps', 'JavaScript'],
    accent: '#A855F7',
  },
  {
    period: '2018 — 2020',
    title: 'Software Developer / Functional Analyst',
    company: 'Emerix',
    description:
      'Developed database-driven applications and web services. Bridged the gap between business requirements and technical implementation through systems analysis.',
    skills: ['PL/SQL', 'Java', 'Web Services', 'Systems Analysis'],
    accent: '#FF4D6D',
  },
];
