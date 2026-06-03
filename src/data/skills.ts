export interface SkillGroup {
  title: string;
  icon: string;
  accent: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Creative',
    icon: '✦',
    accent: '#F5A623',
    skills: [
      'Motion Graphics',
      'Video Editing',
      '2D Animation',
      '3D Animation',
      'Visual Storytelling',
      'Compositing',
      'Sound Design',
      'Editing Rhythm',
      'Transitions',
      'Branding',
      'Audiovisual Direction',
      'Social Media Content',
    ],
  },
  {
    title: 'Tools & Software',
    icon: '◆',
    accent: '#00E5FF',
    skills: [
      'After Effects',
      'Premiere Pro',
      'Cinema 4D',
      'Blender',
      'Photoshop',
      'Illustrator',
      'Adobe Creative Cloud',
      'DaVinci Resolve',
      'Figma',
    ],
  },
  {
    title: 'Development',
    icon: '⟨/⟩',
    accent: '#A855F7',
    skills: [
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Node.js',
      'HTML / CSS',
      'REST APIs',
      'SQL / PL/SQL',
      'Java',
      'Python',
      'Docker',
      'Linux',
      'RPA',
      'Power Apps',
    ],
  },
  {
    title: 'AI Toolkit',
    icon: '⚡',
    accent: '#FF4D6D',
    skills: [
      'Claude',
      'Adobe Firefly',
      'MidJourney',
      'Suno',
      'AI-Assisted Coding',
      'AI Video Workflows',
      'AI Ideation',
      'AI Sound Generation',
      'Generative Image Tools',
    ],
  },
];
