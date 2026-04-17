import { Project, SkillCategory, Certification } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
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
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', icon: 'lightbulb'},
      { name: 'Teamwork', icon: 'users'},
      { name: 'Communication', icon: 'comments'},
      { name: 'Adaptability', icon: 'refresh'},
      { name: 'Time Management', icon: 'clock'},
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'e-voting-using-blockchain',
    title: 'E-Voting Using Blockchain',
    image: 'https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/e-voting_nvlg8o.webp',
    githubUrl: 'https://github.com/ambalavanan-m/E-Voting-using-Blockchain',
    liveUrl: 'https://e-vote-blockchain.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Solidity', 'Blockchain'],
    description: 'Secure and transparent voting application leveraging blockchain technology to prevent fraud and tampering.',
    seoDescription:
      'E-Voting Using Blockchain is a Solidity-based voting application that explores secure, transparent, and tamper-resistant digital election workflows.',
    problem:
      'Digital voting systems must balance accessibility with trust, auditability, and resistance to tampering.',
    solution:
      'I used blockchain principles and a web interface to prototype a transparent voting flow that records actions in a verifiable way.',
    impact:
      'The project highlights hands-on blockchain development, smart contract integration, and security-oriented product design.',
    role: 'Blockchain Developer',
    duration: '2 Months',
    metrics: ['100% Immutable Records', 'Zero Transactional Errors', 'Multi-Node Integrity'],
  },
  {
    id: 2,
    slug: 'crisis-response-management',
    title: 'Crisis Response Management',
    image: 'https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/crisis_khafjg.webp',
    githubUrl: 'https://github.com/ambalavanan-m/crisis-response-command-center',
    liveUrl: 'https://crisis-management.netlify.app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    description: 'A comprehensive system to coordinate resources and communication efficiently during emergency crises.',
    seoDescription:
      'Crisis Response Management is a web application by Ambalavanan M that improves emergency coordination, resource tracking, and crisis communication through a responsive JavaScript interface.',
    problem:
      'Emergency workflows often suffer from fragmented communication, delayed visibility into resources, and poor coordination under pressure.',
    solution:
      'I built a responsive command-center style interface that centralizes updates, highlights critical information, and supports faster operational decision-making.',
    impact:
      'The project demonstrates my ability to translate real-world coordination problems into a usable, high-clarity front-end experience.',
    role: 'Frontend Engineer',
    duration: '1 Month',
    metrics: ['30% Faster Response', 'Real-time Coordination', 'Operational Visibility'],
  },
  {
    id: 3,
    slug: 'loan-approval-prediction',
    title: 'Loan Approval Prediction',
    image: 'https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/loan-prediction_uxggsv.webp',
    githubUrl: 'https://github.com/ambalavanan-m/Loan-Approval-Prediction',
    liveUrl: 'https://aws-loan-approval-prediction.netlify.app/',
    techStack: ['Python', 'Machine Learning', 'AWS', 'React'],
    description: 'The AI Loan Prediction Portal is a comprehensive, end-to-end Machine Learning web application designed to assess and predict loan approval statuses instantly. By leveraging historical financial data and modern cloud architecture, this project bridges the gap between raw datasets and a fully functional user-facing product.',
    seoDescription:
      'Loan Approval Prediction is an end-to-end machine learning and AWS project that predicts loan approvals through a production-style React interface and cloud-backed deployment.',
    problem:
      'Loan assessment workflows are often slow, data-heavy, and difficult to turn into a responsive user-facing product.',
    solution:
      'I combined machine learning, AWS deployment services, and a React front end to create an application that turns prediction logic into an accessible product workflow.',
    impact:
      'This project showcases ML application delivery, cloud architecture thinking, and full-stack execution from model concept to public deployment.',
    role: 'ML & Cloud Engineer',
    duration: '3 Months',
    metrics: ['95% Prediction Accuracy', 'AWS Scalable Architecture', 'Instant Decisioning'],
  }
];

export const FORMSPREE_URL = "https://formspree.io/f/mrepwolr";

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    image: 'https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/aws-academy-graduate-cloud-foundations-training-bad_watake.png'
  }
];

export const RESUME_DATA: ResumeData = {
  summary: "Ambitious Computer Science student with a strong passion for building scalable web applications and exploring cloud-native technologies. Dedicated to mastering React, Java, and Python through hands-on academic projects and independent learning.",
  experience: [],
  education: [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Your University Name",
      location: "City, State",
      duration: "2020 - 2024",
      details: ["Specialization in Software Engineering and Cloud Computing", "GPA: 8.5/10 (Placeholder)"]
    }
  ],
  pdfUrl: '/Ambalavanan_M_Resume.pdf',
  docxUrl: '/Ambalavanan_M_Resume.docx'
};
