import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import mockApi from '../services/mockDataService';

// Check if mock data is enabled
const useMockData = process.env.REACT_APP_ENABLE_MOCK_DATA === 'true';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!useMockData && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common Supabase operations

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  if (useMockData) {
    console.log('Using mock authentication');
    return await mockApi.signIn(email, password);
  }
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  if (useMockData) {
    console.log('Using mock sign out');
    return { error: null };
  }
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (useMockData) {
    console.log('Using mock user data');
    // Return mock user if signed in with demo credentials
    return {
      data: {
        user: {
          id: 'demo-user-id',
          email: 'admin@example.com',
          user_metadata: {
            name: 'Admin User'
          }
        }
      },
      error: null
    };
  }
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  if (useMockData) {
    console.log('Using mock session data');
    // Return mock session if signed in with demo credentials
    return {
      data: {
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: 'bearer',
          user: {
            id: 'demo-user-id',
            email: 'admin@example.com',
            user_metadata: {
              name: 'Admin User'
            }
          }
        }
      },
      error: null
    };
  }
  return await supabase.auth.getSession();
};

// Database helpers
export const fetchEmployees = async () => {
  if (useMockData) {
    console.log('Using mock employee data');
    return await mockApi.fetchEmployees();
  }
  return await supabase
    .from('employees')
    .select('*')
    .order('last_name', { ascending: true });
};

export const fetchEmployee = async (id: string) => {
  if (useMockData) {
    console.log('Using mock employee data');
    return await mockApi.fetchEmployee(id);
  }
  return await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();
};

export const createEmployee = async (employeeData: any) => {
  if (useMockData) {
    console.log('Using mock employee creation');
    return await mockApi.createEmployee(employeeData);
  }
  return await supabase
    .from('employees')
    .insert(employeeData);
};

export const updateEmployee = async (id: string, employeeData: any) => {
  if (useMockData) {
    console.log('Using mock employee update');
    return await mockApi.updateEmployee(id, employeeData);
  }
  return await supabase
    .from('employees')
    .update(employeeData)
    .eq('id', id);
};

export const deleteEmployee = async (id: string) => {
  if (useMockData) {
    console.log('Using mock employee deletion');
    return await mockApi.deleteEmployee(id);
  }
  return await supabase
    .from('employees')
    .delete()
    .eq('id', id);
};

// Salary structure helpers
export const fetchSalaryStructures = async () => {
  if (useMockData) {
    console.log('Using mock salary structure data');
    return await mockApi.fetchSalaryStructures();
  }
  return await supabase
    .from('salary_structures')
    .select('*')
    .order('created_at', { ascending: false });
};

export const fetchSalaryComponents = async () => {
  if (useMockData) {
    console.log('Using mock salary component data');
    return await mockApi.fetchSalaryComponents();
  }
  return await supabase
    .from('salary_components')
    .select('*')
    .order('component_type', { ascending: true });
};

// Payroll helpers
export const fetchPayrollPeriods = async () => {
  if (useMockData) {
    console.log('Using mock payroll period data');
    return await mockApi.fetchPayrollPeriods();
  }
  return await supabase
    .from('payroll_periods')
    .select('*')
    .order('period_end', { ascending: false });
};

export const fetchPayslips = async (periodId: string) => {
  if (useMockData) {
    console.log('Using mock payslip data');
    return await mockApi.fetchPayslips(periodId);
  }
  return await supabase
    .from('payslips')
    .select('*, employees(id, first_name, last_name, employee_id)')
    .eq('payroll_period_id', periodId);
};

export default supabase;