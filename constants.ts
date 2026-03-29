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
    slug: 'crisis-response-management',
    title: 'Crisis Response Management',
    image: '/crisis.webp',
    githubUrl: 'https://github.com/ambalavanan01/crisis-response-command-center',
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
  },
  {
    id: 2,
    slug: 'ske-textiles',
    title: 'SKE Textiles',
    image: '/sketextiles.webp',
    githubUrl: 'https://github.com/ambalavanan01/ske-text',
    liveUrl: 'https://ske-textiles.netlify.app/',
    techStack: ['React'],
    description: 'An inventory and sales management platform tailored for textile manufacturing business operations.',
    seoDescription:
      'SKE Textiles is a React-based inventory and sales management platform designed for textile manufacturing workflows, stock visibility, and operational efficiency.',
    problem:
      'Textile operations need a clearer view of inventory, sales activity, and day-to-day business data without relying on fragmented manual tracking.',
    solution:
      'This platform organizes inventory and sales workflows in a focused React interface tailored to textile business needs.',
    impact:
      'It showcases domain-specific product thinking, business workflow modeling, and the ability to build practical software for operations teams.',
  },
  {
    id: 3,
    slug: 'e-voting-using-blockchain',
    title: 'E-Voting Using Blockchain',
    image: '/e-voting.webp',
    githubUrl: 'https://github.com/ambalavanan01/E-Voting-using-Blockchain',
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
  },
  {
    id: 4,
    slug: 'online-quiz-management',
    title: 'Online Quiz Management',
    image: '/onlinequiz.webp',
    githubUrl: 'https://github.com/ambalavanan01/Online-Quiz-management',
    techStack: ['PHP', 'JSON'],
    description: 'Interactive quiz platform for educational institutions featuring real-time scoring and performance reporting.',
    seoDescription:
      'Online Quiz Management is an educational quiz platform with scoring and reporting features for institutions that need interactive assessments.',
    problem:
      'Educational organizations need lightweight ways to run quizzes, evaluate results quickly, and monitor learner performance.',
    solution:
      'This project delivers a web-based quiz workflow with assessment delivery, score calculation, and reporting-oriented data handling.',
    impact:
      'It demonstrates my ability to build education-focused systems around usability, feedback loops, and structured result reporting.',
  },
  {
    id: 5,
    slug: 'loan-approval-prediction',
    title: 'Loan Approval Prediction',
    image: '/loan-prediction.webp',
    githubUrl: 'https://github.com/ambalavanan01/Loan-Approval-Prediction',
    liveUrl: ['https://aws-loan-approval-prediction.netlify.app/', 'https://d11lsquvmj22ld.cloudfront.net/'],
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
  },
  {
    id: 6,
    slug: 'youtube-focusmode-browser-extension',
    title: 'YouTube focusmode browser extension',
    image: '/focus-mode.webp',
    githubUrl: 'https://github.com/ambalavanan01/YouTube-focusmode-broswer-extension-',
    techStack: ['JavaScript', 'Browser Extension', 'CSS'],
    description: 'Eliminate distractions on YouTube. Hide comments, recommendations, and Shorts with a single click. Focus on what matters.',
    seoDescription:
      'YouTube Focusmode is a browser extension that reduces distractions by hiding recommendations, comments, and Shorts for a cleaner viewing experience.',
    problem:
      'YouTube can make focused learning difficult because recommendation feeds, Shorts, and comments constantly compete for attention.',
    solution:
      'I built a browser extension that simplifies the viewing interface and helps users stay on-task with fewer distractions.',
    impact:
      'It reflects my product thinking around habit design, browser extension development, and user-centered productivity tools.',
  },
  {
    id: 7,
    slug: 'local-retrieval-augmented-generation',
    title: 'Local Retrieval-Augmented Generation',
    image: '/RAG.webp',
    githubUrl: 'https://github.com/ambalavanan01/Am-RAG',
    liveUrl: 'https://am-rag.streamlit.app/',
    techStack: ['Python', 'HuggingFace', 'Streamlit', 'Vector DB'],
    description: 'This application allows users to upload documents (PDF, DOCX, PPTX, TXT) to their local machine, automatically chunk and embed the text into a completely local vector database using HuggingFace models, and "chat" with their documents seamlessly.',
    seoDescription:
      'Local Retrieval-Augmented Generation is a document chat application using HuggingFace models, local embeddings, and vector search for privacy-friendly RAG workflows.',
    problem:
      'Many document question-answering tools rely on cloud pipelines, which can limit privacy and reduce local control over sensitive data.',
    solution:
      'This project uses local vector storage and HuggingFace-powered embeddings so users can upload files and chat with their documents without a cloud-first dependency.',
    impact:
      'It demonstrates applied AI engineering, document processing, vector search integration, and practical experimentation with modern RAG patterns.',
  },
  {
    id: 8,
    slug: 'qr-code-generator',
    title: 'Qr code Generator',
    image: '/qrcode.webp',
    githubUrl: 'https://github.com/ambalavanan01/Qr-generation',
    liveUrl: 'https://qrcodegenerator-pro.neocities.org/',
    techStack: ['JavaScript', 'CSS', 'HTML', 'qrcode-generator'],
    description: 'Qr code generation for all Text, URL, wifi connection, mail sending',
    seoDescription:
      'QR Code Generator is a JavaScript web tool for generating QR codes for text, URLs, Wi-Fi credentials, and email actions.',
    problem:
      'Users often need a quick way to convert common data types like URLs, Wi-Fi details, and plain text into scannable QR codes.',
    solution:
      'I built a simple browser-based generator that supports several practical QR use cases with a straightforward interface.',
    impact:
      'The project highlights utility-focused product design, client-side JavaScript implementation, and fast interaction design.',
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
