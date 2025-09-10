import type { JobApplication } from '../types/job';

export const mockJobApplications: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Frontend Developer',
    jobDescription: 'Building modern web applications with React and TypeScript. Work with a talented team to create user-friendly interfaces and implement responsive designs.',
    companyName: 'TechCorp Inc',
    salary: '$80,000 - $100,000',
    jobType: 'Full-time',
    dateApplied: '2025-09-01',
    jobPostingUrl: 'https://example.com/jobs/frontend-developer',
    notes: 'Great company culture, looking forward to hearing back. They mentioned they use modern tech stack.',
    status: 'Applied'
  },
  {
    id: '2',
    jobTitle: 'Senior Software Engineer',
    jobDescription: 'Full-stack development with Node.js, React, and cloud technologies. Lead technical decisions and mentor junior developers.',
    companyName: 'StartupXYZ',
    salary: '$90,000 - $110,000',
    jobType: 'Full-time',
    dateApplied: '2025-08-28',
    jobPostingUrl: 'https://example.com/jobs/senior-software-engineer',
    notes: 'Remote position with flexible hours. Team seems very collaborative.',
    status: 'Interview'
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    jobDescription: 'Develop and maintain React applications for e-commerce platform. Focus on performance optimization and user experience.',
    companyName: 'E-Commerce Solutions',
    salary: '$75,000 - $95,000',
    jobType: 'Contract',
    dateApplied: '2025-08-25',
    jobPostingUrl: 'https://example.com/jobs/react-developer',
    notes: '6-month contract with possibility of extension. Interesting e-commerce challenges.',
    status: 'Offer'
  },
  {
    id: '4',
    jobTitle: 'Junior Web Developer',
    jobDescription: 'Entry-level position working with HTML, CSS, JavaScript and learning React. Great opportunity for career growth.',
    companyName: 'WebDev Agency',
    salary: '$45,000 - $55,000',
    jobType: 'Full-time',
    dateApplied: '2025-08-20',
    jobPostingUrl: 'https://example.com/jobs/junior-web-developer',
    notes: 'Entry level position, good for gaining experience. Mentioned training programs.',
    status: 'Rejected'
  },
  {
    id: '5',
    jobTitle: 'Frontend Intern',
    jobDescription: 'Summer internship program focusing on modern frontend technologies. Work on real projects with mentorship.',
    companyName: 'Innovation Labs',
    salary: '$20/hour',
    jobType: 'Internship',
    dateApplied: '2025-08-15',
    jobPostingUrl: 'https://example.com/jobs/frontend-intern',
    notes: '3-month internship with potential for full-time offer. Great learning opportunity.',
    status: 'Interview'
  },
  {
    id: '6',
    jobTitle: 'UI/UX Developer',
    jobDescription: 'Hybrid role combining UI development with UX design. Create beautiful and functional user interfaces.',
    companyName: 'Design Studio Pro',
    salary: '$70,000 - $85,000',
    jobType: 'Part-time',
    dateApplied: '2025-08-12',
    jobPostingUrl: 'https://example.com/jobs/ui-ux-developer',
    notes: 'Part-time position, 25 hours per week. Focus on design systems.',
    status: 'Applied'
  },
  {
    id: '7',
    jobTitle: 'Full Stack Developer',
    jobDescription: 'Work on both frontend and backend systems using modern technologies. Build scalable web applications from scratch.',
    companyName: 'CloudTech Solutions',
    salary: '$85,000 - $105,000',
    jobType: 'Full-time',
    dateApplied: '2025-08-10',
    jobPostingUrl: 'https://example.com/jobs/full-stack-developer',
    notes: 'Exciting opportunity to work with cloud technologies. Remote-first company.',
    status: 'Applied'
  },
  {
    id: '8',
    jobTitle: 'JavaScript Developer',
    jobDescription: 'Specialized JavaScript development for complex web applications. Work with latest ES6+ features and frameworks.',
    companyName: 'JS Experts Ltd',
    salary: '$72,000 - $88,000',
    jobType: 'Contract',
    dateApplied: '2025-08-08',
    jobPostingUrl: 'https://example.com/jobs/javascript-developer',
    notes: '1-year contract position. Focus on vanilla JavaScript and modern frameworks.',
    status: 'Interview'
  }
];

export const getNextId = (): string => {
  const maxId = Math.max(...mockJobApplications.map(app => parseInt(app.id)));
  return (maxId + 1).toString();
};
