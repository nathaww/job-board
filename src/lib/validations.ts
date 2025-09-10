import { z } from 'zod';

export const jobApplicationSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required').max(100, 'Job title must be less than 100 characters'),
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters').max(1000, 'Job description must be less than 1000 characters'),
  companyName: z.string().min(1, 'Company name is required').max(50, 'Company name must be less than 50 characters'),
  salary: z.string().min(1, 'Salary is required'),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
    message: 'Please select a job type'
  }),
  dateApplied: z.string().min(1, 'Date applied is required'),
  jobPostingUrl: z.string().url('Please enter a valid URL').or(z.literal('')),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional().or(z.literal('')),
  status: z.enum(['Applied', 'Interview', 'Offer', 'Rejected'], {
    message: 'Please select a status'
  })
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
