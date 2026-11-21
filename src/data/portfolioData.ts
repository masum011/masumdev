export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  impactMetric: string;
  stack: string[];
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Next.js' | 'React.js' | 'FinTech & RBAC' | 'Full-Stack';
  year: string;
  role: string;
  tagline: string;
  description: string;
  architecture: string;
  impact: string;
  stack: string[];
  metrics: {
    latency: string;
    throughput: string;
    uptime: string;
  };
  image: string;
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
}

export interface TechStackCategory {
  id: string;
  domain: string;
  summary: string;
  tools: {
    name: string;
    version: string;
    focus: string;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export const developerProfile = {
  name: 'Masum Reza',
  handle: 'Masum.dev',
  role: 'Frontend Software Developer',
  email: 'masumre1010@gmail.com',
  phone: '+91 98001 41571',
  location: 'Kolkata, West Bengal, India',
  availability: 'Open to Frontend & Full-Stack Roles',
  cvPdfPath: '/assets/aistudio/MasumReza_Frontend_914d87a5.pdf',
  cvFileName: 'MasumReza_Frontend_CV.pdf',
  portfolioUrl: 'https://masumrezadev.netlify.app',
  githubUrl: 'https://github.com/masum011',
  linkedinUrl: 'https://www.linkedin.com/in/masum-reza',
  summary:
    'React developer with 3 years of experience building fast, scalable web apps with React.js, Next.js and Redux Toolkit. Skilled in REST API integration, JWT authentication and performance optimization. Hands-on with IndexedDB, Web Workers, Service Workers (offline support), BroadcastChannel, Supabase, VPS deployment, and monorepo/micro-frontend architecture.',
  primaryStack: [
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Redux Toolkit',
    'Framer Motion',
    'Supabase',
    'IndexedDB',
  ],
};

export const heroMetrics = [
  {value: '3+ Yrs', label: 'React & Next.js Engineering'},
  {value: '10 Live', label: 'Production Client Platforms'},
  {value: 'RBAC & JWT', label: 'Multi-Role Auth & Interceptors'},
  {value: 'Offline-Ready', label: 'IndexedDB & Service Workers'},
];

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: 'Freelance IT & Frontend Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: '2024 – Present',
    summary:
      'Delivering end-to-end React.js and Next.js web applications, JWT-protected RBAC dashboards, offline-capable browser architectures, and VPS deployments.',
    impactMetric: 'JWT RBAC, Material UI DataGrid, Offline Sync & VPS Hosting',
    stack: [
      'React.js',
      'Next.js',
      'JWT & Axios',
      'Material UI DataGrid',
      'IndexedDB',
      'Service Workers',
      'Chart.js',
    ],
    highlights: [
      'Implemented JWT authentication (access/refresh tokens, Axios interceptors) with protected routing and RBAC.',
      'Built an Admin Dashboard with Material UI DataGrid (filtering, sorting, pagination, bulk actions) and CRUD via REST.',
      'Optimized performance with React.memo, useMemo, useCallback, lazy loading, code splitting and debouncing.',
      'Used IndexedDB and Web Workers for large datasets and heavy computation; added Service Workers for API caching and offline support, with BroadcastChannel for cross-tab sync.',
      'Added skeleton loaders and fallback UI states, integrated Chart.js for analytics, and handled domain setup, hosting, VPS deployment, and on-page SEO.',
    ],
  },
  {
    id: 'exp-02',
    role: 'React.js Developer',
    company: 'Antino Labs Pvt Ltd',
    location: 'Gurugram, India',
    period: 'Jan 2023 – Nov 2023',
    summary:
      'Engineered reusable dashboard UIs across monolithic and micro-frontend React architectures alongside Node.js/MongoDB, design, and QA teams.',
    impactMetric: 'Low-bundle Redux Toolkit UIs & windowed high-volume tables',
    stack: [
      'React.js',
      'Redux Toolkit',
      'Micro-Frontends',
      'Material UI',
      'IndexedDB',
      'Node.js',
      'MongoDB',
    ],
    highlights: [
      'Built dashboard UIs with reusable React components, protected routes and secure cookie-based login flows.',
      'Worked on monolithic and micro-frontend React architectures, collaborating with backend (Node.js, MongoDB), design and QA teams.',
      'Managed state with Redux Toolkit and integrated REST APIs and Material UI with low bundle size.',
      'Optimized large lists and tables with memoization, lazy loading and windowing; added IndexedDB caching.',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'proj-yenopay',
    title: 'YenoPay — FinTech Payment Solutions',
    category: 'FinTech & RBAC',
    year: '2025',
    role: 'Frontend Developer',
    tagline: 'Complete FinTech platform & multi-role dashboards for AEPS, BBPS & payment gateway flows.',
    description:
      'Developed the complete frontend of a FinTech platform covering AEPS, BBPS, money transfer, payment gateway and white-label services, from the public website to internal dashboards.',
    architecture: 'React.js · Vite · Tailwind CSS · GSAP · Framer Motion · Multi-Role RBAC',
    impact: '4 role-based dashboards (Super Admin, Distributor, Retailer, Employee) + API playground',
    stack: ['React.js', 'Vite', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lucide React'],
    metrics: {
      latency: 'Animated UI',
      throughput: '4 RBAC Roles',
      uptime: 'yenopay.com',
    },
    image: '/src/assets/images/project_fintech_ledger_1795268346030.jpg',
    liveUrl: 'https://yenopay.com',
    repoUrl: 'https://github.com/masum011',
    featured: true,
  },
  {
    id: 'proj-jeevan-amruttam',
    title: 'Jeevan Amruttam — Business Platform',
    category: 'Next.js',
    year: '2025',
    role: 'Full-Stack Frontend Developer',
    tagline: 'Scalable Next.js & React business website backed by Supabase.',
    description:
      'Building a responsive business website with scalable Next.js App Router frontend architecture, clean Tailwind CSS styling, and Supabase database/backend integration.',
    architecture: 'Next.js · React.js · JavaScript · Supabase Backend · Tailwind CSS',
    impact: 'Scalable SSR/SSG business platform with live Supabase integration',
    stack: ['Next.js', 'React.js', 'JavaScript', 'Supabase', 'Tailwind CSS'],
    metrics: {
      latency: 'SSR / SSG',
      throughput: 'Supabase',
      uptime: 'jeevanamrutham.com',
    },
    image: '/src/assets/images/project_edge_commerce_1795268346471.jpg',
    liveUrl: 'https://jeevanamrutham.com',
    repoUrl: 'https://github.com/masum011',
    featured: true,
  },
  {
    id: 'proj-apna-tea',
    title: 'Apna Tea — Tea Brand Website',
    category: 'React.js',
    year: '2024',
    role: 'Frontend Developer',
    tagline: 'Responsive brand website with product showcase and reusable component architecture.',
    description:
      'Built a fast tea brand website featuring responsive layouts, structured product presentation, and reusable React UI components optimized across desktop and mobile viewports.',
    architecture: 'React.js · Vite · JavaScript · Tailwind CSS · Responsive Component System',
    impact: 'Desktop & mobile optimized brand storefront',
    stack: ['React.js', 'Vite', 'JavaScript', 'Tailwind CSS'],
    metrics: {
      latency: 'Vite Build',
      throughput: 'Responsive',
      uptime: 'apnatea.com',
    },
    image: '/src/assets/images/project_realtime_canvas_1795268345978.jpg',
    liveUrl: 'https://apnatea.com',
    repoUrl: 'https://github.com/masum011',
  },
  {
    id: 'proj-offline-rbac-console',
    title: 'Offline-First DataGrid & Auth Suite',
    category: 'Full-Stack',
    year: '2024',
    role: 'Freelance IT & Frontend Developer',
    tagline: 'JWT access/refresh interceptors, Material UI DataGrid & Service Worker sync.',
    description:
      'Engineered an enterprise admin interface featuring Axios JWT token refresh interceptors, Material UI DataGrid with bulk actions, Web Worker offloading, IndexedDB storage, and BroadcastChannel cross-tab synchronization.',
    architecture: 'React.js · MUI DataGrid · IndexedDB · Web & Service Workers · BroadcastChannel',
    impact: 'Offline API caching, cross-tab sync & zero main-thread UI stalls',
    stack: ['React.js', 'TypeScript', 'Material UI', 'IndexedDB', 'Web Workers', 'Service Workers', 'Chart.js'],
    metrics: {
      latency: 'Off-Thread',
      throughput: 'Cross-Tab',
      uptime: 'Offline PWA',
    },
    image: '/src/assets/images/project_workflow_cli_1795268346413.jpg',
    liveUrl: 'https://masumrezadev.netlify.app',
    repoUrl: 'https://github.com/masum011',
  },
];

export const techStackCategories: TechStackCategory[] = [
  {
    id: 'frontend-state',
    domain: 'Frontend & State Management',
    summary: 'Modern React & Next.js interfaces with predictable global and form state.',
    tools: [
      {name: 'React & Next.js', version: 'App Router / SSR', focus: 'HTML5, CSS3, ES6+, TypeScript, Tailwind CSS'},
      {name: 'Redux Toolkit & Zustand', version: 'Context API', focus: 'Scalable state & React Router'},
      {name: 'TanStack Query & Axios', version: 'Data Layer', focus: 'Caching, interceptors & REST flows'},
      {name: 'React Hook Form & Zod', version: 'Validation', focus: 'Type-safe schema forms & GSAP/Motion'},
    ],
  },
  {
    id: 'performance-browser',
    domain: 'Performance & Browser APIs',
    summary: 'High-throughput client computing, offline resilience, and cross-tab sync.',
    tools: [
      {name: 'React Compiler & Splitting', version: 'Optimization', focus: 'React.memo, useMemo, lazy loading, windowing'},
      {name: 'IndexedDB', version: 'Client DB', focus: 'Large client dataset storage & caching'},
      {name: 'Web & Service Workers', version: 'Offline APIs', focus: 'Background compute & API response caching'},
      {name: 'BroadcastChannel', version: 'Sync API', focus: 'Real-time cross-tab state coordination'},
    ],
  },
  {
    id: 'backend-devops',
    domain: 'Backend, APIs & Deployment',
    summary: 'Full-stack database integration, real-time protocols, and VPS infrastructure.',
    tools: [
      {name: 'Supabase & Node/MongoDB', version: 'Backend', focus: 'Database, auth & full-stack APIs'},
      {name: 'REST, GraphQL & WebSockets', version: 'Protocols', focus: 'JWT (access/refresh), RBAC & Webhooks'},
      {name: 'VPS Deployment & Hosting', version: 'DevOps', focus: 'VPS servers, domain setup & on-page SEO'},
      {name: 'Monorepo & Micro-Frontends', version: 'Architecture', focus: 'Git, GitHub, Postman, Figma, Jira'},
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-01',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Brainware University, West Bengal',
    location: 'Kolkata, India',
    period: 'Jul 2020 – Jun 2023',
  },
  {
    id: 'edu-02',
    degree: 'Diploma in Computer Science & Technology',
    institution: 'Nibedita Institute of Technology',
    location: 'Murshidabad, India',
    period: 'Jun 2017 – Jun 2020',
  },
];
