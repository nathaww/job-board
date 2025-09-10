import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/jobService';
import type { JobApplication, ApplicationStatus } from '../types/job';

export const JOB_APPLICATIONS_QUERY_KEY = ['jobApplications'];

export const useJobApplications = () => {
  return useQuery({
    queryKey: JOB_APPLICATIONS_QUERY_KEY,
    queryFn: jobService.getAll,
    staleTime: 1000 * 60 * 5,
  });
};

export const useJobApplication = (id: string) => {
  return useQuery({
    queryKey: ['jobApplication', id],
    queryFn: () => jobService.getById(id),
    enabled: !!id,
  });
};

export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: jobService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_APPLICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error creating job application:', error);
    },
  });
};

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<JobApplication, 'id'>> }) =>
      jobService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_APPLICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error updating job application:', error);
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      jobService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_APPLICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error updating application status:', error);
    },
  });
};

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: jobService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_APPLICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error deleting job application:', error);
    },
  });
};

export const useSearchJobApplications = (query: string, status: ApplicationStatus | 'All') => {
  return useQuery({
    queryKey: ['jobApplications', 'search', query, status],
    queryFn: () => jobService.searchAndFilter(query, status),
    enabled: query.length > 0 || status !== 'All',
    staleTime: 1000 * 60 * 2,
  });
};

export const useJobApplicationStatistics = () => {
  return useQuery({
    queryKey: ['jobApplications', 'statistics'],
    queryFn: jobService.getStatistics,
    staleTime: 1000 * 60 * 10,
  });
};
