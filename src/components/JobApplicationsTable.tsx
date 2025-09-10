import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Edit2, ExternalLink, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDeleteJobApplication } from '../hooks/useJobApplicationQueries';
import type { ApplicationStatus, JobApplication } from '../types/job';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface JobApplicationsTableProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
}

type SortField = 'jobTitle' | 'companyName' | 'dateApplied' | 'salary' | 'status';
type SortDirection = 'asc' | 'desc';

export function JobApplicationsTable({
  applications,
  onEdit
}: JobApplicationsTableProps) {
  const [sortField, setSortField] = useState<SortField>('dateApplied');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<JobApplication | null>(null);
  const deleteMutation = useDeleteJobApplication();

  const handleDeleteClick = (application: JobApplication) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (applicationToDelete) {
      try {
        await deleteMutation.mutateAsync(applicationToDelete.id);
        setDeleteDialogOpen(false);
        setApplicationToDelete(null);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === 'dateApplied') {
      aValue = new Date(a.dateApplied).getTime();
      bValue = new Date(b.dateApplied).getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });



  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied': return 'bg-secondary text-secondary-foreground';
      case 'Interview': return 'bg-primary/10 text-primary border border-primary/20';
      case 'Offer': return 'bg-green-100 text-green-700 border border-green-200';
      case 'Rejected': return 'bg-destructive/10 text-destructive border border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No job applications found</p>
        <p className="text-muted-foreground text-sm mt-2">Add your first job application to get started</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="border rounded-lg">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none flex justify-center text-primary items-center gap-2"
              onClick={() => handleSort('jobTitle')}
            >
              Job Title
              <SortIcon field="jobTitle" />
            </TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none text-primary"
              onClick={() => handleSort('companyName')}
            >
              <div className="flex items-center gap-2">
                Company
                <SortIcon field="companyName" />
              </div>
            </TableHead>
            <TableHead className="hidden sm:table-cell">Salary</TableHead>
            <TableHead className="hidden sm:table-cell">Type</TableHead>
            <TableHead
              className="w-[120px] cursor-pointer hover:bg-muted/50 select-none flex gap-1 text-primary items-center"
              onClick={() => handleSort('dateApplied')}
            >
              Date Applied
              <SortIcon field="dateApplied" />
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                <div className="font-semibold">{application.jobTitle}</div>
                <div className="text-sm text-muted-foreground md:hidden">{application.companyName}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="max-w-xs">
                  {truncateText(application.jobDescription, 60)}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {application.companyName}
              </TableCell>
              <TableCell className="text-center">
                {application.salary}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="outline">{application.jobType}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{formatDate(application.dateApplied)}</div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                  {application.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex">
                  {application.jobPostingUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(application.jobPostingUrl, '_blank')}
                          className='text-primary cursor-pointer'
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Job Posting</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(application)}
                        className='cursor-pointer'
                      >
                        <Edit2 className="h-4 w-4 text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Application</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(application)}
                        disabled={deleteMutation.isPending}
                        className='cursor-pointer'
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Application</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={applicationToDelete ? `${applicationToDelete.jobTitle} at ${applicationToDelete.companyName}` : ''}
        isDeleting={deleteMutation.isPending}
      />
      </div>
    </TooltipProvider>
  );
}
