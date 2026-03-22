import { Project, SkillCategory, Certification } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Certified Courses',
    skills: [
      { name: 'AWS Cloud Foundation', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 100 }
    ]
  },
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
      { name: 'AWS S3', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 75 },
      { name: 'AWS Sagemaker', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 70 },
      { name: 'AWS Lambda', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 75 },
      { name: 'AWS API Gateway', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 70 },
      { name: 'AWS CloudFront', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', percentage: 70 },
    ]
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'DSA', icon: 'git-branch', percentage: 80 },
      { name: 'DBMS', icon: 'database', percentage: 85 },
      { name: 'SQL', iconClass: 'devicon-mysql-plain colored', percentage: 85 },
      { name: 'OOP', icon: 'boxes', percentage: 90 },
      { name: 'Linear Regression', icon: 'chart-column', percentage: 80 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Crisis Response Management',
    image: '/crisis.webp',
    githubUrl: 'https://github.com/ambalavanan01/crisis-response-command-center',
    liveUrl: 'https://crisis-management.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    description: 'A comprehensive system to coordinate resources and communication efficiently during emergency crises.',
  },
  {
    id: 2,
    title: 'SKE Textiles',
    image: '/sketextiles.webp',
    githubUrl: 'https://github.com/ambalavanan01/ske-text',
    liveUrl: 'https://ske-textiles.netlify.app/',
    techStack: ['React'],
    description: 'An inventory and sales management platform tailored for textile manufacturing business operations.',
  },
  {
    id: 3,
    title: 'E-Voting Using Blockchain',
    image: '/e-voting.webp',
    githubUrl: 'https://github.com/ambalavanan01/E-Voting-using-Blockchain',
    liveUrl: 'https://e-vote-blockchain.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Solidity', 'Blockchain'],
    description: 'Secure and transparent voting application leveraging blockchain technology to prevent fraud and tampering.',
  },
  {
    id: 4,
    title: 'Online Quiz Management',
    image: '/onlinequiz.webp',
    githubUrl: 'https://github.com/ambalavanan01/Online-Quiz-management',
    techStack: ['PHP', 'JSON'],
    description: 'Interactive quiz platform for educational institutions featuring real-time scoring and performance reporting.',
  },
  {
    id: 5,
    title: 'Loan Approval Prediction',
    image: '/loan-prediction.webp',
    githubUrl: 'https://github.com/ambalavanan01/Loan-Approval-Prediction',
    liveUrl: ['https://aws-loan-approval-prediction.netlify.app/', 'https://d11lsquvmj22ld.cloudfront.net/'],
    techStack: ['Python', 'Machine Learning', 'AWS', 'React'],
    description: 'The AI Loan Prediction Portal is a comprehensive, end-to-end Machine Learning web application designed to assess and predict loan approval statuses instantly. By leveraging historical financial data and modern cloud architecture, this project bridges the gap between raw datasets and a fully functional user-facing product.',
  },
  {
    id: 6,
    title: 'YouTube focusmode browser extension',
    image: '/focus-mode.webp',
    githubUrl: 'https://github.com/ambalavanan01/YouTube-focusmode-broswer-extension-',
    techStack: ['JavaScript', 'Browser Extension', 'CSS'],
    description: 'Eliminate distractions on YouTube. Hide comments, recommendations, and Shorts with a single click. Focus on what matters.',
  },
  {
    id: 7,
    title: 'Local Retrieval-Augmented Generation',
    image: '/RAG.webp',
    githubUrl: 'https://github.com/ambalavanan01/Am-RAG',
    liveUrl: 'https://am-rag.streamlit.app/',
    techStack: ['Python', 'HuggingFace', 'Streamlit', 'Vector DB'],
    description: 'This application allows users to upload documents (PDF, DOCX, PPTX, TXT) to their local machine, automatically chunk and embed the text into a completely local vector database using HuggingFace models, and "chat" with their documents seamlessly.',
  },
  {
    id: 8,
    title: 'Qr code Generator',
    image: '/qrcode.webp',
    githubUrl: 'https://github.com/ambalavanan01/Qr-generation',
    liveUrl: 'https://qrcodegenerator-pro.neocities.org/',
    techStack: ['JavaScript', 'CSS', 'HTML', 'qrcode-generator'],
    description: 'Qr code generation for all Text, URL, wifi connection, mail sending',
  },
];

export const FORMSPREE_URL = "https://formspree.io/f/mrepwolr";

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    image: '/aws-academy-graduate-cloud-foundations-training-bad.png'
  }
];
