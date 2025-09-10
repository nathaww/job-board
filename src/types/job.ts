export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  salary: string;
  jobType: JobType;
  dateApplied: string;
  jobPostingUrl: string;
  notes: string;
  status: ApplicationStatus;
}

export interface JobApplicationFormData {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  salary: string;
  jobType: JobType;
  dateApplied: string;
  jobPostingUrl: string;
  notes: string;
  status: ApplicationStatus;
}
