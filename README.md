# Job Application Dashboard

A modern, responsive job application tracking dashboard built with React, TypeScript, TailwindCSS, and shadcn/ui.

## Features

### Core Features
- ✅ **Dashboard Page**: View all job applications in a clean table format
- ✅ **Add Applications**: Create new job applications with a comprehensive form
- ✅ **Edit Applications**: Update existing applications with pre-filled data
- ✅ **Status Management**: Update application status directly from the table
- ✅ **Responsive Design**: Works perfectly on mobile and desktop devices

### Advanced Features
- ✅ **Data Persistence**: Applications are saved to localStorage
- ✅ **Search & Filter**: Search by job title/company and filter by status
- ✅ **Sortable Columns**: Click column headers to sort data
- ✅ **Pagination**: Navigate large datasets efficiently
- ✅ **Form Validation**: Comprehensive validation using Zod and React Hook Form
- ✅ **External Links**: Direct links to job postings

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Access React Query DevTools** (Development only)
   Click the React Query icon in the bottom-left corner to inspect queries, mutations, and cache state

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── JobApplicationForm.tsx       # Add/Edit form dialog with React Query
│   ├── JobApplicationsTable.tsx     # Main data table with mutations
│   ├── JobApplicationFilters.tsx    # Search and filter controls
│   └── Pagination.tsx               # Pagination component
├── hooks/
│   └── useJobApplicationQueries.ts  # React Query hooks for data management
├── services/
│   └── jobService.ts               # API service layer with CRUD operations
├── data/
│   └── mockData.ts                 # Mock data and utilities
├── lib/
│   ├── utils.ts                    # Utility functions
│   └── validations.ts              # Zod validation schemas
├── types/
│   └── job.ts                      # TypeScript type definitions
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point with React Query setup
└── index.css                       # TailwindCSS imports
```

## Usage

### Adding Applications
1. Click the "Add Application" button
2. Fill out the form with job details
3. Submit to add to your dashboard

### Managing Applications
- **Edit**: Click the edit icon in the Actions column
- **Delete**: Click the delete icon (with confirmation)
- **Update Status**: Use the status dropdown in each row
- **View Job Posting**: Click the external link icon if URL provided

### Filtering & Search
- **Search**: Use the search bar to find by job title or company
- **Filter by Status**: Use the status dropdown to filter applications
- **Clear Filters**: Click "Clear" to reset all filters

### Sorting & Pagination
- **Sort**: Click column headers to sort by that field
- **Pagination**: Navigate pages at the bottom of the table
- **Page Size**: Adjust how many applications to show per page

## Architecture & Data Management

### Service Layer
All data operations are centralized in `jobService.ts` with methods for:
- `getAll()` - Fetch all applications
- `getById(id)` - Get single application
- `create(data)` - Add new application
- `update(id, updates)` - Update existing application
- `delete(id)` - Remove application
- `searchAndFilter(query, status)` - Advanced filtering
- `getStatistics()` - Application analytics

### Data Persistence
- **Mock Data**: Rich sample dataset with 8+ realistic job applications
- **localStorage**: Automatic persistence across browser sessions
- **Real-time**: Instant updates across all components
- **Optimistic UI**: Immediate visual feedback before server confirmation
