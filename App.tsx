import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Context Providers
import { AuthProvider } from './AuthContext';

// Components
import ProtectedRoute from './ProtectedRoute';
import MainLayout from './MainLayout';

// Pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

// Theme configuration
const antTheme = {
  token: {
    colorPrimary: '#1976d2',
    colorError: '#f44336',
    colorWarning: '#ff9800',
    colorSuccess: '#4caf50',
    colorInfo: '#2196f3',
    borderRadius: 4,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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

const App: React.FC = () => {
  return (
    <ConfigProvider theme={antTheme}>
      <ThemeProvider theme={muiTheme}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* Employee routes */}
                <Route path="employees" element={<div>Employee List (To be implemented)</div>} />
                <Route path="employees/add" element={<div>Add Employee (To be implemented)</div>} />
                <Route path="employees/:id" element={<div>Employee Details (To be implemented)</div>} />
                <Route path="employees/:id/edit" element={<div>Edit Employee (To be implemented)</div>} />
                
                {/* Salary Structure routes */}
                <Route path="salary-structure" element={<div>Salary Structure (To be implemented)</div>} />
                <Route path="salary-structure/add" element={<div>Add Salary Structure (To be implemented)</div>} />
                <Route path="salary-structure/:id" element={<div>Salary Structure Details (To be implemented)</div>} />
                <Route path="salary-structure/:id/edit" element={<div>Edit Salary Structure (To be implemented)</div>} />
                
                {/* Payroll routes */}
                <Route path="payroll" element={<div>Payroll (To be implemented)</div>} />
                <Route path="payroll/process" element={<div>Process Payroll (To be implemented)</div>} />
                <Route path="payroll/:id" element={<div>Payroll Details (To be implemented)</div>} />
                
                {/* Payslip routes */}
                <Route path="payslips" element={<div>Payslips (To be implemented)</div>} />
                <Route path="payslips/generate" element={<div>Generate Payslips (To be implemented)</div>} />
                <Route path="payslips/:id" element={<div>Payslip Details (To be implemented)</div>} />
                
                {/* Attendance routes */}
                <Route path="attendance" element={<div>Attendance (To be implemented)</div>} />
                <Route path="attendance/manage" element={<div>Manage Attendance (To be implemented)</div>} />
                <Route path="attendance/leave" element={<div>Leave Management (To be implemented)</div>} />
                
                {/* Reports routes */}
                <Route path="reports" element={<div>Reports (To be implemented)</div>} />
                <Route path="reports/payroll" element={<div>Payroll Reports (To be implemented)</div>} />
                <Route path="reports/tax" element={<div>Tax Reports (To be implemented)</div>} />
                <Route path="reports/custom" element={<div>Custom Reports (To be implemented)</div>} />
                
                {/* Settings routes */}
                <Route path="settings" element={<div>Settings (To be implemented)</div>} />
                <Route path="profile" element={<div>User Profile (To be implemented)</div>} />
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;