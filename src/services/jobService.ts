import type { JobApplication, JobType, ApplicationStatus } from '../types/job';
import { mockJobApplications, getNextId } from '../data/mockData';

const STORAGE_KEY = 'job-applications';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getApplicationsFromStorage = (): JobApplication[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...mockJobApplications];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [...mockJobApplications];
  }
};

const saveApplicationsToStorage = (applications: JobApplication[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const jobService = {
  async getAll(): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    if (applications.length === 0) {
      saveApplicationsToStorage([...mockJobApplications]);
      return [...mockJobApplications];
    }
    return applications;
  },

  async getById(id: string): Promise<JobApplication | null> {
    await delay();
    const applications = getApplicationsFromStorage();
    return applications.find(app => app.id === id) || null;
  },

  async create(applicationData: Omit<JobApplication, 'id'>): Promise<JobApplication> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    const newApplication: JobApplication = {
      ...applicationData,
      id: getNextId(),
    };
    
    const updatedApplications = [...applications, newApplication];
    saveApplicationsToStorage(updatedApplications);
    
    return newApplication;
  },

  async update(id: string, updates: Partial<Omit<JobApplication, 'id'>>): Promise<JobApplication> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    const index = applications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error(`Application with id ${id} not found`);
    }
    
    const updatedApplication = { ...applications[index], ...updates };
    const updatedApplications = [...applications];
    updatedApplications[index] = updatedApplication;
    
    saveApplicationsToStorage(updatedApplications);
    
    return updatedApplication;
  },

  async updateStatus(id: string, status: ApplicationStatus): Promise<JobApplication> {
    await delay();
    return this.update(id, { status });
  },

  async delete(id: string): Promise<void> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    const filteredApplications = applications.filter(app => app.id !== id);
    if (filteredApplications.length === applications.length) {
      throw new Error(`Application with id ${id} not found`);
    }
    
    saveApplicationsToStorage(filteredApplications);
  },

  async search(query: string): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    if (!query.trim()) {
      return applications;
    }
    
    const searchTerm = query.toLowerCase().trim();
    return applications.filter(app => 
      app.jobTitle.toLowerCase().includes(searchTerm) ||
      app.companyName.toLowerCase().includes(searchTerm) ||
      app.jobDescription.toLowerCase().includes(searchTerm)
    );
  },

  async filterByStatus(status: ApplicationStatus | 'All'): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    if (status === 'All') {
      return applications;
    }
    
    return applications.filter(app => app.status === status);
  },

  async searchAndFilter(query: string, status: ApplicationStatus | 'All'): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    let filteredApps = applications;
    
    if (status !== 'All') {
      filteredApps = filteredApps.filter(app => app.status === status);
    }
    
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filteredApps = filteredApps.filter(app => 
        app.jobTitle.toLowerCase().includes(searchTerm) ||
        app.companyName.toLowerCase().includes(searchTerm) ||
        app.jobDescription.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredApps;
  },

  async getByJobType(jobType: JobType): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    return applications.filter(app => app.jobType === jobType);
  },

  async getRecentApplications(days: number = 30): Promise<JobApplication[]> {
    await delay();
    const applications = getApplicationsFromStorage();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return applications.filter(app => {
      const appDate = new Date(app.dateApplied);
      return appDate >= cutoffDate;
    });
  },

  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<ApplicationStatus, number>;
    byJobType: Record<JobType, number>;
  }> {
    await delay();
    const applications = getApplicationsFromStorage();
    
    const byStatus: Record<ApplicationStatus, number> = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };
    
    const byJobType: Record<JobType, number> = {
      'Full-time': 0,
      'Part-time': 0,
      Contract: 0,
      Internship: 0,
    };
    
    applications.forEach(app => {
      byStatus[app.status]++;
      byJobType[app.jobType]++;
    });
    
    return {
      total: applications.length,
      byStatus,
      byJobType,
    };
  },
};
