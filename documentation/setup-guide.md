# Salary Management System - Setup Guide

This guide provides step-by-step instructions for setting up the Salary Management System project, including the React application and Supabase configuration.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v7 or later) or yarn
- Git
- A Supabase account

## 1. Project Initialization

### 1.1. Create React Application

```bash
# Using Create React App
npx create-react-app salary-management
cd salary-management

# OR using Vite
npm create vite@latest salary-management -- --template react-ts
cd salary-management
```

### 1.2. Install Core Dependencies

```bash
# Using npm
npm install react-router-dom @tanstack/react-query

# UI Libraries
npm install antd @mui/material @mui/icons-material @emotion/react @emotion/styled styled-components

# Form Libraries
npm install formik yup

# Utilities
npm install date-fns lodash axios

# Charts
npm install recharts

# PDF Generation
npm install @react-pdf/renderer

# Supabase
npm install @supabase/supabase-js
```

### 1.3. Install Development Dependencies

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev husky lint-staged
```

### 1.4. Set Up Project Structure

Create the directory structure as outlined in the project-structure.md document:

```bash
# Create main directories
mkdir -p public/assets/{images,icons}
mkdir -p src/{assets/{images,icons,styles},components,contexts,hooks,lib,pages,services,store,utils}

# Create component directories
mkdir -p src/components/{common,layout,dashboard,employees,salary,payroll,payslip,attendance,tax,reports}

# Create common components
mkdir -p src/components/common/{Button,Card,Table,Modal,Form,Alert,Loader}

# Create layout components
mkdir -p src/components/layout/{Header,Sidebar,Footer,MainLayout}

# Create feature components
mkdir -p src/components/dashboard/{StatCard,Chart,AlertList}
mkdir -p src/components/employees/{EmployeeList,EmployeeForm,EmployeeDetails,DocumentUpload}
mkdir -p src/components/salary/{SalaryStructureList,SalaryStructureForm,ComponentList,ComponentForm}
mkdir -p src/components/payroll/{PayrollList,PayrollForm,PayrollApproval,PayrollSummary}
mkdir -p src/components/payslip/{PayslipList,PayslipPreview,PayslipEmail,BulkGeneration}
mkdir -p src/components/attendance/{AttendanceList,AttendanceForm,LeaveList,LeaveForm}
mkdir -p src/components/tax/{TaxCalculation,TaxDeductions,ComplianceReports,Form16Generation}
mkdir -p src/components/reports/{ReportList,ReportGenerator,AnalyticsDashboard,ExportOptions}

# Create page directories
mkdir -p src/pages/{Employees,SalaryStructure,Payroll,Payslip,Attendance,Tax,Reports}

# Create store directories
mkdir -p src/store/{slices,thunks}
```

### 1.5. Configure ESLint and Prettier

Create `.eslintrc.js`:

```javascript
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 100,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
};
```

Create `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 1.6. Set Up Husky and Lint-Staged

Initialize Husky:

```bash
npx husky-init && npm install
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

Create `lint-staged.config.js`:

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
```

### 1.7. Create Environment Files

Create `.env.development`:

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_NAME=Salary Management System
REACT_APP_VERSION=1.0.0
REACT_APP_API_TIMEOUT=30000
```

Create `.env.production`:

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_NAME=Salary Management System
REACT_APP_VERSION=1.0.0
REACT_APP_API_TIMEOUT=30000
```

## 2. Supabase Configuration

### 2.1. Create Supabase Project

1. Log in to your Supabase account at https://app.supabase.io/
2. Click "New Project"
3. Enter project details:
   - Name: Salary Management System
   - Database Password: (create a strong password)
   - Region: (select the closest region)
4. Click "Create New Project"

### 2.2. Get API Keys

1. In your Supabase project dashboard, go to Settings > API
2. Copy the URL and anon key
3. Update your `.env.development` and `.env.production` files with these values

### 2.3. Set Up Database Tables

Execute the following SQL in the Supabase SQL Editor to create the database tables as defined in the database-schema.md document:

```sql
-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT NOT NULL,
  full_name TEXT,
  last_sign_in TIMESTAMP WITH TIME ZONE
);

-- Departments table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles table
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employees table
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  gender TEXT,
  joining_date DATE NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  role_id UUID REFERENCES public.roles(id),
  reporting_to UUID REFERENCES public.employees(id),
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee bank details table
CREATE TABLE IF NOT EXISTS public.employee_bank_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  ifsc_code TEXT NOT NULL,
  branch TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee documents table
CREATE TABLE IF NOT EXISTS public.employee_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  document_type TEXT NOT NULL,
  document_number TEXT,
  file_path TEXT NOT NULL,
  expiry_date DATE,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salary components table
CREATE TABLE IF NOT EXISTS public.salary_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  is_taxable BOOLEAN DEFAULT false,
  is_percentage BOOLEAN DEFAULT false,
  percentage_of TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salary structures table
CREATE TABLE IF NOT EXISTS public.salary_structures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salary structure components table
CREATE TABLE IF NOT EXISTS public.salary_structure_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salary_structure_id UUID REFERENCES public.salary_structures(id) NOT NULL,
  component_id UUID REFERENCES public.salary_components(id) NOT NULL,
  amount DECIMAL(12, 2),
  percentage DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee salary table
CREATE TABLE IF NOT EXISTS public.employee_salary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  salary_structure_id UUID REFERENCES public.salary_structures(id) NOT NULL,
  effective_from DATE NOT NULL,
  effective_to DATE,
  basic_salary DECIMAL(12, 2) NOT NULL,
  gross_salary DECIMAL(12, 2) NOT NULL,
  net_salary DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  date DATE NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave types table
CREATE TABLE IF NOT EXISTS public.leave_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  annual_quota INTEGER,
  is_paid BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee leaves table
CREATE TABLE IF NOT EXISTS public.employee_leaves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  leave_type_id UUID REFERENCES public.leave_types(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT NOT NULL,
  approved_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll table
CREATE TABLE IF NOT EXISTS public.payroll (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  basic_salary DECIMAL(12, 2) NOT NULL,
  gross_salary DECIMAL(12, 2) NOT NULL,
  total_deductions DECIMAL(12, 2) NOT NULL,
  net_salary DECIMAL(12, 2) NOT NULL,
  payment_status TEXT NOT NULL,
  payment_date DATE,
  payment_method TEXT,
  transaction_reference TEXT,
  created_by UUID REFERENCES public.users(id) NOT NULL,
  approved_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll components table
CREATE TABLE IF NOT EXISTS public.payroll_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_id UUID REFERENCES public.payroll(id) NOT NULL,
  component_id UUID REFERENCES public.salary_components(id) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax information table
CREATE TABLE IF NOT EXISTS public.tax_information (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  financial_year TEXT NOT NULL,
  pan_number TEXT,
  tax_regime TEXT,
  total_income DECIMAL(12, 2),
  total_deductions DECIMAL(12, 2),
  taxable_income DECIMAL(12, 2),
  tax_payable DECIMAL(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax deductions table
CREATE TABLE IF NOT EXISTS public.tax_deductions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tax_information_id UUID REFERENCES public.tax_information(id) NOT NULL,
  deduction_type TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  proof_document TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payslips table
CREATE TABLE IF NOT EXISTS public.payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_id UUID REFERENCES public.payroll(id) NOT NULL,
  file_path TEXT,
  is_emailed BOOLEAN DEFAULT false,
  emailed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4. Set Up Storage Buckets

1. In your Supabase project dashboard, go to Storage
2. Create the following buckets:
   - `employee_documents`
   - `payslips`
   - `tax_documents`
   - `reports`
3. Set appropriate permissions for each bucket

### 2.5. Configure Authentication

1. In your Supabase project dashboard, go to Authentication > Settings
2. Configure Site URL to match your application URL
3. Enable Email auth provider
4. Customize email templates if needed

### 2.6. Set Up Row-Level Security Policies

Execute the following SQL to set up basic RLS policies:

```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_structure_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_salary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_deductions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payslips ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin can do anything" ON public.users
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Repeat similar policies for all tables
-- Example:
CREATE POLICY "Admin can do anything" ON public.departments
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## 3. React Application Setup

### 3.1. Configure Supabase Client

Create `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3.2. Set Up Authentication Context

Create `src/contexts/AuthContext.js`:

```javascript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
```

### 3.3. Create Protected Route Component

Create `src/components/common/ProtectedRoute/ProtectedRoute.js`:

```javascript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### 3.4. Set Up Routes

Create `src/routes.js`:

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/Employees';
import EmployeeAdd from './pages/Employees/Add';
import EmployeeEdit from './pages/Employees/Edit';
import EmployeeDetails from './pages/Employees/Details';
// Import other pages...

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'employees', element: <EmployeeList /> },
      { path: 'employees/add', element: <EmployeeAdd /> },
      { path: 'employees/edit/:id', element: <EmployeeEdit /> },
      { path: 'employees/:id', element: <EmployeeDetails /> },
      // Add other routes...
    ],
  },
];

export default routes;
```

### 3.5. Set Up App Component

Update `src/App.js`:

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ConfigProvider } from 'antd';

import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import routes from './routes';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ConfigProvider>
            <CssBaseline />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ConfigProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### 3.6. Create Theme Configuration

Create `src/theme.js`:

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
```

## 4. Running the Application

### 4.1. Start Development Server

```bash
npm start
```

### 4.2. Build for Production

```bash
npm run build
```

## 5. Next Steps

After completing the setup, proceed with implementing the following:

1. Create the home page with admin login button
2. Implement the login page
3. Develop the admin dashboard layout
4. Start building the core modules as outlined in the implementation plan

Refer to the implementation-plan.md document for a detailed breakdown of the tasks for each module.