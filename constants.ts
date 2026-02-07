import { Project, SkillCategory } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java', iconClass: 'devicon-java-plain colored', percentage: 90 },
      { name: 'Python', iconClass: 'devicon-python-plain colored', percentage: 85 },
      { name: 'C++', iconClass: 'devicon-cplusplus-plain colored', percentage: 80 },
      { name: 'C', iconClass: 'devicon-c-plain colored', percentage: 75 },
      { name: 'Solidity', iconClass: 'devicon-solidity-plain', percentage: 70 },
    ]
  },
  {
    title: 'Web Technologies',
    skills: [
      { name: 'HTML', iconClass: 'devicon-html5-plain colored', percentage: 95 },
      { name: 'CSS', iconClass: 'devicon-css3-plain colored', percentage: 90 },
      { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored', percentage: 88 },
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', iconClass: 'devicon-git-plain colored', percentage: 85 },
      { name: 'GitHub', iconClass: 'devicon-github-original', percentage: 90 },
    ]
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'DSA', iconClass: 'fas fa-project-diagram text-blue-500', percentage: 80 },
      { name: 'DBMS', iconClass: 'fas fa-database text-blue-500', percentage: 85 },
      { name: 'SQL', iconClass: 'devicon-mysql-plain colored', percentage: 85 },
      { name: 'OOP', iconClass: 'fas fa-cubes text-blue-500', percentage: 90 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Crisis Response Management',
    image: '/crisis.png',
    githubUrl: 'https://github.com/ambalavanan01/crisis-response-command-center',
    liveUrl: 'https://crisis-management.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    description: 'A comprehensive system to coordinate resources and communication efficiently during emergency crises.',
  },
  {
    id: 2,
    title: 'SKE Textiles',
    image: '/sketextiles.png',
    githubUrl: 'https://github.com/ambalavanan01/ske-text',
    liveUrl: 'https://ske-textiles.netlify.app/',
    techStack: ['React'],
    description: 'An inventory and sales management platform tailored for textile manufacturing business operations.',
  },
  {
    id: 3,
    title: 'E-Voting Using Blockchain',
    image: '/e-voting.png',
    githubUrl: 'https://github.com/ambalavanan01/E-Voting-using-Blockchain',
    liveUrl: 'https://e-vote-blockchain.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Solidity', 'Blockchain'],
    description: 'Secure and transparent voting application leveraging blockchain technology to prevent fraud and tampering.',
  },
  {
    id: 4,
    title: 'Online Quiz Management',
    image: '/onlinequiz.png',
    githubUrl: 'https://github.com/ambalavanan01/Online-Quiz-management',
    liveUrl: 'https://onlinequiz-management.gt.tc/',
    techStack: ['PHP', 'JSON'],
    description: 'Interactive quiz platform for educational institutions featuring real-time scoring and performance reporting.',
  },
];

export const FORMSPREE_URL = "https://formspree.io/f/mrepwolr";