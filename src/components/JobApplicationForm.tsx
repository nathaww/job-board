
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { jobApplicationSchema, type JobApplicationFormData } from '../lib/validations';
import { useCreateJobApplication, useUpdateJobApplication } from '../hooks/useJobApplicationQueries';
import type { JobApplication } from '../types/job';

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: JobApplication | null;
  mode: 'add' | 'edit';
}

export function JobApplicationForm({ 
  isOpen, 
  onClose, 
  initialData, 
  mode 
}: JobApplicationFormProps) {
  const createMutation = useCreateJobApplication();
  const updateMutation = useUpdateJobApplication();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: initialData ? {
      jobTitle: initialData.jobTitle,
      jobDescription: initialData.jobDescription,
      companyName: initialData.companyName,
      salary: initialData.salary,
      jobType: initialData.jobType,
      dateApplied: initialData.dateApplied,
      jobPostingUrl: initialData.jobPostingUrl,
      notes: initialData.notes,
      status: initialData.status
    } : {
      jobTitle: '',
      jobDescription: '',
      companyName: '',
      salary: '',
      jobType: 'Full-time',
      dateApplied: new Date().toISOString().split('T')[0],
      jobPostingUrl: '',
      notes: '',
      status: 'Applied'
    }
  });

  const jobType = watch('jobType');
  const status = watch('status');

  const handleFormSubmit = async (data: JobApplicationFormData) => {
    try {
      if (mode === 'add') {
        await createMutation.mutateAsync({
          ...data,
          notes: data.notes || ''
        });
      } else if (initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          updates: {
            ...data,
            notes: data.notes || ''
          }
        });
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Job Application' : 'Edit Job Application'}
          </DialogTitle>
        </DialogHeader> 
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                {...register('jobTitle')}
                placeholder="e.g. Frontend Developer"
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="e.g. Tech Corp"
              />
              {errors.companyName && (
                <p className="text-sm text-red-600">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              {...register('jobDescription')}
              placeholder="Describe the job responsibilities..."
              rows={3}
            />
            {errors.jobDescription && (
              <p className="text-sm text-red-600">{errors.jobDescription.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary *</Label>
              <Input
                id="salary"
                {...register('salary')}
                placeholder="e.g. $80,000 - $100,000"
              />
              {errors.salary && (
                <p className="text-sm text-red-600">{errors.salary.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateApplied">Date Applied *</Label>
              <Input
                id="dateApplied"
                type="date"
                {...register('dateApplied')}
              />
              {errors.dateApplied && (
                <p className="text-sm text-red-600">{errors.dateApplied.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Type *</Label>
              <Select value={jobType} onValueChange={(value: string) => setValue('jobType', value as JobApplicationFormData['jobType'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.jobType && (
                <p className="text-sm text-red-600">{errors.jobType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={status} onValueChange={(value: string) => setValue('status', value as JobApplicationFormData['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobPostingUrl">Job Posting URL</Label>
            <Input
              id="jobPostingUrl"
              type="url"
              {...register('jobPostingUrl')}
              placeholder="https://example.com/job-posting"
            />
            {errors.jobPostingUrl && (
              <p className="text-sm text-red-600">{errors.jobPostingUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any additional notes about this application..."
              rows={3}
            />
            {errors.notes && (
              <p className="text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || createMutation.isPending || updateMutation.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {(isSubmitting || createMutation.isPending || updateMutation.isPending) ? 'Saving...' : mode === 'add' ? 'Add Application' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
