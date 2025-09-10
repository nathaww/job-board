import { Loader, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { JobApplicationFilters } from './components/JobApplicationFilters';
import { JobApplicationForm } from './components/JobApplicationForm';
import { JobApplicationsTable } from './components/JobApplicationsTable';
import { Pagination } from './components/Pagination';
import { StructuredData } from './components/StructuredData';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { useJobApplications } from './hooks/useJobApplicationQueries';
import type { ApplicationStatus, JobApplication } from './types/job';

function App() {
  const { data: applications = [], isLoading, error } = useJobApplications();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredApplications = useMemo(() => {
    return applications.filter((app: JobApplication) => {
      const matchesSearch = searchTerm === '' ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredApplications.slice(startIndex, endIndex);
  }, [filteredApplications, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredApplications.length / pageSize);

  const handleEdit = (application: JobApplication) => {
    setEditingApplication({ id: application.id } as JobApplication);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingApplication(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className='h-12 w-12 animate-spin mx-auto text-primary' />
          <p className="mt-4 text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading applications</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-background">
      <StructuredData />
      <div className="mx-auto py-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 w-full">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Application Dashboard</h1>
            <p className="text-muted-foreground mt-2  text-left">Track and manage your job applications</p>
          </div>
          <ThemeToggle />
        </div>

        <Card className="bg-card border-border shadow-sm py-0">
          <CardHeader className='px-0'>
            <div className="flex flex-row justify-between items-center gap-4">
              <CardTitle>
                Applications ({filteredApplications.length})
              </CardTitle>
              <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </div>
          </CardHeader>
          <CardContent className='px-0'>
            <JobApplicationFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onClearFilters={handleClearFilters}
            />

            <JobApplicationsTable
              applications={paginatedApplications}
              onEdit={handleEdit}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredApplications.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </CardContent>
        </Card>

        <JobApplicationForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          initialData={editingApplication}
          mode={editingApplication ? 'edit' : 'add'}
        />
      </div>
    </div>
  );
}

export default App;
