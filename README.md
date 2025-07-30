# Salary Management System

A comprehensive solution for managing employee salaries, payroll processing, and generating reports with ease.

## Features

- **Employee Management**: Manage employee information, departments, and designations
- **Salary Structure**: Create and manage flexible salary structures with multiple components
- **Payroll Processing**: Process payroll with automatic calculations and deductions
- **Reports & Analytics**: Generate comprehensive reports and analytics for better decision making

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Components**: Ant Design and Material UI
- **State Management**: React Context API
- **Backend**: Supabase (Authentication, Database, Storage)
- **Charts**: Chart.js with react-chartjs-2

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/salary-management.git
cd salary-management
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

1. Create a new project in [Supabase](https://supabase.io)
2. Get your Supabase URL and anon key from the project settings
3. Create a `.env` file in the root directory and add your Supabase credentials:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the database

1. Use the SQL editor in Supabase to create the necessary tables
2. The database schema can be found in the `database-schema.md` file

### 5. Start the development server

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── common/       # Common components like buttons, cards, etc.
│   └── layout/       # Layout components
├── contexts/         # React contexts for state management
├── lib/              # Utility functions and API clients
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── index.tsx         # Entry point
```

## Authentication

The application uses Supabase Auth for authentication. For demo purposes, you can use:

- Email: admin@example.com
- Password: password123

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.