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
}

export interface SkillItem {
  name: string;
  iconClass?: string;
  icon?: string;
  percentage: number;
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

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  techStack: string;
  description: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  skills: {
    id: string;
    category: string;
    items: string;
  }[];
  education: ResumeEducation[];
  projects: ResumeProject[];
}
