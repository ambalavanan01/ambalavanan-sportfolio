export interface Project {
  id: number;
  title: string;
  image: string;
  githubUrl: string;
  liveUrl?: string | string[];
  techStack: string[];
  description: string;
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
