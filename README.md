# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

### Application Fields
Each job application includes:
- Job Title
- Job Description
- Company Name
- Salary
- Job Type (Full-time, Part-time, Contract, Internship)
- Date Applied (with date picker)
- Job Posting URL (with validation)
- Notes
- Status (Applied, Interview, Offer, Rejected) with colored badges

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: TanStack Query (React Query) v5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Data**: Mock data with localStorage persistence

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

### React Query Integration
The application uses **TanStack Query (React Query)** for optimal state management:

- **Caching**: Automatic query caching with configurable stale times
- **Background Updates**: Seamless data refetching and synchronization
- **Optimistic Updates**: Instant UI feedback for user actions
- **Error Handling**: Robust error states with retry mechanisms
- **DevTools**: Integrated React Query DevTools for debugging

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

## Browser Support

Works in all modern browsers including:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
