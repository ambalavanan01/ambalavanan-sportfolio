export interface Project {
  id: number;
  slug: string;
  title: string;
  image: string;
  githubUrl: string;
  liveUrl?: string | string[];
  techStack: string[];
  description: string;
  seoDescription: string;
  problem: string;
  solution: string;
  impact: string;
  role?: string;
  duration?: string;
  metrics?: string[];
}

export interface SkillItem {
  name: string;
  iconClass?: string;
  icon?: string;
  percentage?: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string; // Hidden field to trap bots
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  details?: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

export interface ResumeData {
  pdfUrl: string;
  docxUrl: string;
}


export interface ContactQuery {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}
