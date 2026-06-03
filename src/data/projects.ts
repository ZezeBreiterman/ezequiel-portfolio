export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  tags: string[];
  year: number;
  role: string;
  tools: string[];
  thumbnail: string;
  color: string;
  featured: boolean;
  link?: string;
}

export const categories = [
  'All',
  'Motion Graphics',
  '3D Animation',
  'Web Development',
  'GLB Tools',
  'Social Media',
] as const;

export type Category = (typeof categories)[number];

export const projects: Project[] = [
  {
    slug: 'scarlett-2i2',
    title: 'Scarlett 2i2 — 3D Landing',
    tagline: 'Studio sound, rendered in real time.',
    category: 'Web Development',
    tags: ['Web Development', 'Three.js', '3D Animation'],
    year: 2025,
    role: 'Creative Developer',
    tools: ['Next.js', 'Three.js', 'React Three Fiber', 'GLSL', 'GSAP'],
    thumbnail: '/images/projects/scarlett.png',
    color: '#E0241A',
    featured: true,
    link: 'https://scarlett-2i2-landing.vercel.app/',
  },
  {
    slug: 'pin-pun',
    title: 'Pin-Pun Pizzeria',
    tagline: 'Authentic flavors, digital speed.',
    category: 'Web Development',
    tags: ['Web Development', 'React'],
    year: 2024,
    role: 'Front-End Developer',
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    thumbnail: '/images/projects/pinpun.jpg',
    color: '#E53E3E',
    featured: true,
    link: 'https://pizzeria-pinpun.netlify.app/',
  },
  {
    slug: 'la-ganadera',
    title: 'La Ganadera',
    tagline: 'Artisan deli, crafted online.',
    category: 'Web Development',
    tags: ['Web Development', 'Landing Page'],
    year: 2025,
    role: 'Front-End Developer',
    tools: ['Next.js', 'TypeScript', 'CSS Modules', 'Netlify'],
    thumbnail: '/images/projects/laganadera.jpg',
    color: '#8B4513',
    featured: true,
    link: 'https://laganadera-fiambreria.netlify.app/',
  },
  {
    slug: 'sabinos',
    title: 'SABINOS Barberia',
    tagline: 'Precision in style, digital presence.',
    category: 'Web Development',
    tags: ['Web Development', 'Landing Page'],
    year: 2024,
    role: 'Creative Developer',
    tools: ['Next.js', 'GSAP', 'CSS Modules', 'Netlify'],
    thumbnail: '/images/projects/sabinos.jpg',
    color: '#F5A623',
    featured: true,
    link: 'https://sabinosbarberia.netlify.app/',
  },
  {
    slug: 'motion-portfolio',
    title: 'Motion Graphics',
    tagline: 'Visual stories in motion.',
    category: 'Motion Graphics',
    tags: ['Motion Graphics', 'Adobe Portfolio'],
    year: 2024,
    role: 'Motion Designer',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
    thumbnail: '/images/projects/motion-graphics.png',
    color: '#F6AD55',
    featured: true,
    link: 'https://ezequielbreiterman.myportfolio.com/motion-graphics',
  },
  {
    slug: '3d-design',
    title: '3D Design & Animation',
    tagline: 'Dimensions of creativity.',
    category: '3D Animation',
    tags: ['3D Animation', 'Design'],
    year: 2024,
    role: '3D Artist',
    tools: ['Cinema 4D', 'Blender', 'After Effects'],
    thumbnail: '/images/projects/3d-animation.png',
    color: '#805AD5',
    featured: true,
    link: 'https://ezequielbreiterman.myportfolio.com/diseno-y-animacion-3d',
  },
  {
    slug: 'online-glb-viewer',
    title: 'Online GLB Viewer',
    tagline: 'Where code meets art.',
    category: 'GLB Tools',
    tags: ['Creative Tools', 'Three.js'],
    year: 2024,
    role: 'Creative Technologist',
    tools: ['Three.js', 'React Three Fiber', 'GLSL', 'Netlify'],
    thumbnail: '/images/projects/glb-viewer.png',
    color: '#38B2AC',
    featured: false,
    link: 'https://threejsviewer-ezequielbreiterman.netlify.app/',
  },
  {
    slug: 'full-portfolio',
    title: 'Design Portfolio',
    tagline: 'The complete visual archive.',
    category: 'Social Media',
    tags: ['Design', 'Social Media'],
    year: 2024,
    role: 'Multimedia Designer',
    tools: ['Photoshop', 'Illustrator', 'Indesign'],
    thumbnail: '/images/projects/motion-graphics.png', // Reusing motion graphics as a placeholder since design generation failed
    color: '#4299E1',
    featured: false,
    link: 'https://ezequielbreiterman.myportfolio.com/',
  },
];
