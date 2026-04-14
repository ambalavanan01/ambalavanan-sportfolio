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

export interface ResumeData {
  pdfUrl: string;
  docxUrl: string;
}

export type UserQueryStatus = 'new' | 'replied';

export interface UserQuery {
  id?: string;
  name: string;
  email: string;
  query: string;
  createdAt: any; // Firestore Timestamp
  expireAt: any;  // Firestore Timestamp
  status: UserQueryStatus;
}
