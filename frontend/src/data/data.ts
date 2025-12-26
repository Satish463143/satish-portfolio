import { Layers, Radio, Shield, Sparkles, Cloud, Rocket } from 'lucide-react';
export const services = [
    {
      icon: Layers,
      title: 'Full-Stack Web Apps',
      description: 'End-to-end MERN stack applications with modern architecture',
      deliverables: [
        'Scalable React/Next.js frontends',
        'RESTful Node.js/Express backends',
      ],
    },
    {
      icon: Radio,
      title: 'REST APIs + WebSockets',
      description: 'Real-time data communication and robust API design',
      deliverables: [
        'RESTful & GraphQL endpoints',
        'Socket.io real-time features',
      ],
    },
    {
      icon: Shield,
      title: 'Admin CMS + RBAC/JWT',
      description: 'Secure admin dashboards with role-based access control',
      deliverables: [
        'Custom CMS with permissions',
        'JWT authentication & authorization',
      ],
    },
    {
      icon: Sparkles,
      title: 'AI Features',
      description: 'Intelligent features powered by OpenAI & Gemini',
      deliverables: [
        'Chat interfaces & AI assistants',
        'Speech-to-text & automation',
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Storage + Security',
      description: 'Secure file management and cloud integration',
      deliverables: [
        'AWS S3 & GCP storage setup',
        'CORS, encryption & access control',
      ],
    },
    {
      icon: Rocket,
      title: 'CI/CD + Performance',
      description: 'Deployment pipelines and optimization',
      deliverables: [
        'GitHub Actions, Docker, Vercel',
        'Performance & SEO optimization',
      ],
    },
  ];

export const projects = [
    { 
      id: '1',
      image:'./project-1.png',
      title: 'AI-Powered E-Commerce Platform',
      problem: 'Client needed a scalable marketplace with AI product recommendations',
      result: '3x increase in conversion rate, 500k+ monthly users',
      tags: ['Next.js', 'OpenAI', 'MongoDB', 'Stripe'],
      gradient: 'from-purple-500/20 via-pink-500/20 to-orange-500/20',
    },
    {
      id: '2',
      image:'./project-1.png',
      title: 'Real-Time Collaboration Dashboard',
      problem: 'Team management tool with live updates and role-based access',
      result: 'Reduced coordination time by 60%, 10k+ active teams',
      tags: ['React', 'Socket.io', 'Express', 'Redis'],
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    },
    {
      id: '3',
      image:'./project-1.png',
      title: 'Cloud-Based Asset Management',
      problem: 'Secure file storage system with CDN integration',
      result: '99.99% uptime, 2TB+ assets managed, 50ms avg load time',
      tags: ['AWS S3', 'Node.js', 'CloudFront', 'JWT'],
      gradient: 'from-green-500/20 via-emerald-500/20 to-lime-500/20',
    },
    {
      id: '4',
      image:'./project-1.png',
      title: 'AI Chat Support System',
      problem: 'Automated customer support with natural language processing',
      result: '80% reduction in support tickets, 24/7 availability',
      tags: ['Gemini AI', 'TypeScript', 'WebSocket', 'PostgreSQL'],
      gradient: 'from-orange-500/20 via-red-500/20 to-rose-500/20',
    },
  ];

export const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Framer Motion', category: 'Frontend' },
    { name: 'Redux', category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'MongoDB', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Backend' },
    { name: 'Socket.io', category: 'Backend' },
    {name:'Python', category:'Backend'},
    
    // Cloud
    { name: 'AWS S3', category: 'Cloud' },
    {name:'Google Cloud Storage', category: 'Cloud'},
    { name: 'Vercel', category: 'Cloud' },
    
    // AI
    { name: 'OpenAI', category: 'AI' },
    { name: 'Gemini AI', category: 'AI' },
    {name:'OpenRouter', category:'AI'},
    
    
    // DevOps
    { name: 'Docker', category: 'DevOps' },
    {name:'Jenkins', category: 'DevOps'},
    { name: 'GitHub Actions', category: 'DevOps' },
  ];
  
  export const categories = ['All', 'Frontend', 'Backend', 'Cloud', 'AI', 'DevOps'];


  
 export const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Most projects take 4-8 weeks from kickoff to deployment, depending on complexity. I work in 2-week sprints with regular check-ins and demos. Rush projects can be accommodated with adjusted scope.',
  },
  {
    question: 'Do you work with startups or only established companies?',
    answer: 'I work with both! I have experience with early-stage startups building MVPs and established companies scaling their platforms. Each project gets the same level of attention and quality.',
  },
  {
    question: 'What is included in your full-stack development service?',
    answer: 'Full-stack service includes frontend (React/Next.js), backend (Node.js/Express), database design (MongoDB/PostgreSQL), API development, authentication, deployment, and basic DevOps. AI integrations and cloud storage are available as add-ons.',
  },
  {
    question: 'How do you handle project communication and updates?',
    answer: 'I use Slack/Discord for daily communication, weekly video calls for sprint reviews, and project management tools (Jira/Notion) for tracking. You\'ll have full visibility into progress with regular demos of working features.',
  },
  {
    question: 'What happens after the project is completed?',
    answer: 'You receive complete source code, documentation, deployment guides, and a 30-day post-launch support period. Ongoing maintenance packages are available for continued updates, bug fixes, and feature additions.',
  },
  {
    question: 'Can you integrate AI features into existing applications?',
    answer: 'Absolutely! I specialize in adding OpenAI and Gemini AI capabilities to existing apps: chatbots, content generation, image processing, speech-to-text, and custom AI workflows. Integration typically takes 1-3 weeks.',
  },
];
