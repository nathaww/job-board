import { useState } from 'react';
import { Edit2, Trash2, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { useDeleteJobApplication, useUpdateApplicationStatus } from '../hooks/useJobApplicationQueries';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { format } from 'date-fns';

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
  const deleteMutation = useDeleteJobApplication();
  const updateStatusMutation = useUpdateApplicationStatus();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleStatusUpdate = async (id: string, status: ApplicationStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
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
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => handleSort('jobTitle')}
            >
              <div className="flex items-center gap-2">
                Job Title
                <SortIcon field="jobTitle" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => handleSort('companyName')}
            >
              <div className="flex items-center gap-2">
                Company
                <SortIcon field="companyName" />
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Salary</TableHead>
            <TableHead className="hidden sm:table-cell">Type</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => handleSort('dateApplied')}
            >
              <div className="flex items-center gap-2">
                Date Applied
                <SortIcon field="dateApplied" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{application.jobTitle}</div>
                  <div className="text-sm text-muted-foreground md:hidden">{application.companyName}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="max-w-xs">
                  {truncateText(application.jobDescription, 60)}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {application.companyName}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {application.salary}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="outline">{application.jobType}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{formatDate(application.dateApplied)}</div>
              </TableCell>
              <TableCell>
                <Select
                  value={application.status}
                  onValueChange={(value: string) => handleStatusUpdate(application.id, value as ApplicationStatus)}
                >
                  <SelectTrigger className="w-32">
                    <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                      {application.status}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">
                      <Badge className="text-xs bg-secondary text-secondary-foreground">Applied</Badge>
                    </SelectItem>
                    <SelectItem value="Interview">
                      <Badge className="text-xs bg-primary/10 text-primary border border-primary/20">Interview</Badge>
                    </SelectItem>
                    <SelectItem value="Offer">
                      <Badge className="text-xs bg-green-100 text-green-700 border border-green-200">Offer</Badge>
                    </SelectItem>
                    <SelectItem value="Rejected">
                      <Badge className="text-xs bg-destructive/10 text-destructive border border-destructive/20">Rejected</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {application.jobPostingUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(application.jobPostingUrl, '_blank')}
                      title="View Job Posting"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(application)}
                    title="Edit Application"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(application.id)}
                    title="Delete Application"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
