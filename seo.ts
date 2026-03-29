import type { Project } from './types';

const SITE_URL = 'https://ambalavanan.vercel.app';
const SITE_NAME = 'Ambalavanan Portfolio';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.svg`;

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export const toAbsoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
};

export const basePersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ambalavanan M',
  alternateName: 'Ambalavanan',
  url: SITE_URL,
  image: `${SITE_URL}/profile.webp`,
  sameAs: [
    'https://github.com/ambalavanan01',
    'https://www.linkedin.com/in/ambalavanan-m/',
    'https://x.com/iam_ambalavanan',
  ],
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer specializing in React, Java, Python, AWS, and modern web application development.',
  knowsAbout: ['React', 'Java', 'Python', 'AWS', 'Cloud Computing', 'Machine Learning', 'Blockchain'],
};

export const homeMeta: SeoMeta = {
  title: 'Ambalavanan M | Software Engineer Portfolio | React, Java & AWS Developer',
  description:
    'Portfolio of Ambalavanan M, a software engineer building React, Java, Python, AWS, and blockchain projects with a focus on scalable web experiences.',
  canonicalPath: '/',
  ogImage: DEFAULT_OG_IMAGE,
  schema: [
    basePersonSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Ambalavanan M Portfolio',
      url: SITE_URL,
      description:
        'Software engineer portfolio featuring React, Java, Python, AWS, and blockchain projects.',
      about: {
        '@type': 'Person',
        name: 'Ambalavanan M',
      },
    },
  ],
};

export const resumeMeta: SeoMeta = {
  title: 'Ambalavanan M Resume | Software Engineer | React, Java, Python & AWS',
  description:
    'Interactive resume of Ambalavanan M covering software engineering experience, technical skills, projects, certifications, and education.',
  canonicalPath: '/resume',
  ogImage: DEFAULT_OG_IMAGE,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Ambalavanan M Resume',
      url: `${SITE_URL}/resume`,
      description:
        'Interactive resume of Ambalavanan M, software engineer specializing in React, Java, Python, AWS, and modern web development.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Resume', item: `${SITE_URL}/resume` },
      ],
    },
  ],
};

export const adminMeta: SeoMeta = {
  title: 'Admin | Ambalavanan Portfolio',
  description: 'Admin dashboard for portfolio review management.',
  canonicalPath: '/admin',
  noindex: true,
};

export const converterMeta: SeoMeta = {
  title: 'PDF Converter | Ambalavanan Portfolio',
  description: 'Portfolio utility page for PDF conversion.',
  canonicalPath: '/convertpdf',
  noindex: true,
};

export const getProjectMeta = (project: Project): SeoMeta => ({
  title: `${project.title} | Ambalavanan M Project Case Study`,
  description: project.seoDescription,
  canonicalPath: `/projects/${project.slug}`,
  ogImage: toAbsoluteUrl(project.image),
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.seoDescription,
      codeRepository: project.githubUrl,
      programmingLanguage: project.techStack.join(', '),
      creator: {
        '@type': 'Person',
        name: 'Ambalavanan M',
      },
      image: toAbsoluteUrl(project.image),
      url: `${SITE_URL}/projects/${project.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.title,
          item: `${SITE_URL}/projects/${project.slug}`,
        },
      ],
    },
  ],
});

export const defaultMeta = homeMeta;
export const siteUrl = SITE_URL;
export const siteName = SITE_NAME;
export const defaultOgImage = DEFAULT_OG_IMAGE;
