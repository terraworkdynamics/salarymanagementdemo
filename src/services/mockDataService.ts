import { Database } from '../types/database.types';

// Simple UUID generator
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

// Type definitions
type Employee = Database['public']['Tables']['employees']['Row'];
type SalaryStructure = Database['public']['Tables']['salary_structures']['Row'];
type SalaryComponent = Database['public']['Tables']['salary_components']['Row'];
type PayrollPeriod = Database['public']['Tables']['payroll_periods']['Row'];
type Payslip = Database['public']['Tables']['payslips']['Row'];

// Generate current date and some relative dates
const now = new Date();
const currentDate = now.toISOString();
const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString();
const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString();
const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();

// Mock Employees Data
export const mockEmployees: Employee[] = [
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip_code: '400001',
    country: 'India',
    date_of_birth: '1985-05-15',
    date_of_joining: '2020-01-15',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    employee_id: 'EMP001',
    manager_id: null,
    status: 'active',
    bank_account_number: '1234567890',
    bank_name: 'HDFC Bank',
    bank_ifsc: 'HDFC0001234',
    pan_number: 'ABCDE1234F',
    aadhar_number: '123456789012',
    uan_number: '100123456789',
    pf_number: 'PF12345678',
    esi_number: 'ESI12345678'
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+91 9876543211',
    address: '456 Park Avenue',
    city: 'Bangalore',
    state: 'Karnataka',
    zip_code: '560001',
    country: 'India',
    date_of_birth: '1990-08-20',
    date_of_joining: '2020-02-10',
    department: 'HR',
    designation: 'HR Manager',
    employee_id: 'EMP002',
    manager_id: null,
    status: 'active',
    bank_account_number: '0987654321',
    bank_name: 'ICICI Bank',
    bank_ifsc: 'ICIC0001234',
    pan_number: 'FGHIJ5678K',
    aadhar_number: '210987654321',
    uan_number: '100987654321',
    pf_number: 'PF87654321',
    esi_number: 'ESI87654321'
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'Raj',
    last_name: 'Kumar',
    email: 'raj.kumar@example.com',
    phone: '+91 9876543212',
    address: '789 Lake View',
    city: 'Delhi',
    state: 'Delhi',
    zip_code: '110001',
    country: 'India',
    date_of_birth: '1988-11-12',
    date_of_joining: '2020-03-05',
    department: 'Finance',
    designation: 'Finance Manager',
    employee_id: 'EMP003',
    manager_id: null,
    status: 'active',
    bank_account_number: '5678901234',
    bank_name: 'SBI Bank',
    bank_ifsc: 'SBIN0001234',
    pan_number: 'LMNOP9012Q',
    aadhar_number: '345678901234',
    uan_number: '100345678901',
    pf_number: 'PF34567890',
    esi_number: 'ESI34567890'
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'Priya',
    last_name: 'Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543213',
    address: '101 Hill Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zip_code: '600001',
    country: 'India',
    date_of_birth: '1992-04-25',
    date_of_joining: '2020-04-15',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    employee_id: 'EMP004',
    manager_id: null,
    status: 'active',
    bank_account_number: '6789012345',
    bank_name: 'Axis Bank',
    bank_ifsc: 'UTIB0001234',
    pan_number: 'QRSTU3456V',
    aadhar_number: '456789012345',
    uan_number: '100456789012',
    pf_number: 'PF45678901',
    esi_number: 'ESI45678901'
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'Amit',
    last_name: 'Patel',
    email: 'amit.patel@example.com',
    phone: '+91 9876543214',
    address: '202 River View',
    city: 'Hyderabad',
    state: 'Telangana',
    zip_code: '500001',
    country: 'India',
    date_of_birth: '1987-09-30',
    date_of_joining: '2020-05-20',
    department: 'Engineering',
    designation: 'Software Engineer',
    employee_id: 'EMP005',
    manager_id: null,
    status: 'active',
    bank_account_number: '7890123456',
    bank_name: 'Kotak Bank',
    bank_ifsc: 'KKBK0001234',
    pan_number: 'VWXYZ7890A',
    aadhar_number: '567890123456',
    uan_number: '100567890123',
    pf_number: 'PF56789012',
    esi_number: 'ESI56789012'
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    first_name: 'Neha',
    last_name: 'Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 9876543215',
    address: '303 Mountain View',
    city: 'Pune',
    state: 'Maharashtra',
    zip_code: '411001',
    country: 'India',
    date_of_birth: '1991-07-18',
    date_of_joining: '2020-06-10',
    department: 'Sales',
    designation: 'Sales Executive',
    employee_id: 'EMP006',
    manager_id: null,
    status: 'on_leave',
    bank_account_number: '8901234567',
    bank_name: 'Yes Bank',
    bank_ifsc: 'YESB0001234',
    pan_number: 'BCDEF2345G',
    aadhar_number: '678901234567',
    uan_number: '100678901234',
    pf_number: 'PF67890123',
    esi_number: 'ESI67890123'
  }
];

// Mock Salary Structures
export const mockSalaryStructures: SalaryStructure[] = [
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Standard Structure',
    description: 'Standard salary structure for most employees',
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Executive Structure',
    description: 'Salary structure for executive level employees',
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Intern Structure',
    description: 'Salary structure for interns',
    is_active: true
  }
];

// Mock Salary Components
export const mockSalaryComponents: SalaryComponent[] = [
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Basic Salary',
    description: 'Base salary component',
    component_type: 'earning',
    calculation_type: 'fixed',
    calculation_value: 50000,
    calculation_basis: null,
    taxable: true,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'House Rent Allowance',
    description: 'HRA component',
    component_type: 'earning',
    calculation_type: 'percentage',
    calculation_value: 40,
    calculation_basis: 'Basic Salary',
    taxable: false,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Conveyance Allowance',
    description: 'Transport allowance',
    component_type: 'earning',
    calculation_type: 'fixed',
    calculation_value: 3000,
    calculation_basis: null,
    taxable: false,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Medical Allowance',
    description: 'Medical benefits',
    component_type: 'earning',
    calculation_type: 'fixed',
    calculation_value: 2000,
    calculation_basis: null,
    taxable: false,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Special Allowance',
    description: 'Additional benefits',
    component_type: 'earning',
    calculation_type: 'fixed',
    calculation_value: 5000,
    calculation_basis: null,
    taxable: true,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Provident Fund',
    description: 'Employee PF contribution',
    component_type: 'deduction',
    calculation_type: 'percentage',
    calculation_value: 12,
    calculation_basis: 'Basic Salary',
    taxable: false,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Professional Tax',
    description: 'State professional tax',
    component_type: 'deduction',
    calculation_type: 'fixed',
    calculation_value: 200,
    calculation_basis: null,
    taxable: false,
    is_active: true
  },
  {
    id: generateId(),
    created_at: oneYearAgo,
    updated_at: currentDate,
    name: 'Income Tax',
    description: 'TDS deduction',
    component_type: 'deduction',
    calculation_type: 'percentage',
    calculation_value: 10,
    calculation_basis: 'Gross Salary',
    taxable: false,
    is_active: true
  }
];

// Mock Payroll Periods
export const mockPayrollPeriods: PayrollPeriod[] = [
  {
    id: generateId(),
    created_at: threeMonthsAgo,
    updated_at: threeMonthsAgo,
    period_name: 'April 2023',
    period_start: '2023-04-01',
    period_end: '2023-04-30',
    payment_date: '2023-05-01',
    status: 'paid'
  },
  {
    id: generateId(),
    created_at: twoMonthsAgo,
    updated_at: twoMonthsAgo,
    period_name: 'May 2023',
    period_start: '2023-05-01',
    period_end: '2023-05-31',
    payment_date: '2023-06-01',
    status: 'paid'
  },
  {
    id: generateId(),
    created_at: oneMonthAgo,
    updated_at: oneMonthAgo,
    period_name: 'June 2023',
    period_start: '2023-06-01',
    period_end: '2023-06-30',
    payment_date: '2023-07-01',
    status: 'approved'
  },
  {
    id: generateId(),
    created_at: currentDate,
    updated_at: currentDate,
    period_name: 'July 2023',
    period_start: '2023-07-01',
    period_end: '2023-07-31',
    payment_date: '2023-08-01',
    status: 'processing'
  }
];

// Generate mock payslips for each employee and payroll period
export const generateMockPayslips = (): Payslip[] => {
  const payslips: Payslip[] = [];
  
  mockPayrollPeriods.forEach(period => {
    mockEmployees.forEach(employee => {
      // Skip generating payslips for employees on leave or inactive
      if (employee.status === 'inactive' || employee.status === 'terminated') {
        return;
      }
      
      // Base salary varies by designation
      let baseSalary = 50000; // default
      if (employee.designation.includes('Manager')) {
        baseSalary = 80000;
      } else if (employee.designation.includes('Senior')) {
        baseSalary = 65000;
      } else if (employee.designation.includes('Executive')) {
        baseSalary = 45000;
      }
      
      // Calculate earnings (simplified)
      const hraAmount = baseSalary * 0.4;
      const conveyanceAmount = 3000;
      const medicalAmount = 2000;
      const specialAmount = 5000;
      
      const grossEarnings = baseSalary + hraAmount + conveyanceAmount + medicalAmount + specialAmount;
      
      // Calculate deductions (simplified)
      const pfAmount = baseSalary * 0.12;
      const ptAmount = 200;
      const itAmount = grossEarnings * 0.1;
      
      const totalDeductions = pfAmount + ptAmount + itAmount;
      
      // Net salary
      const netSalary = grossEarnings - totalDeductions;
      
      // Payment status based on payroll period status
      const paymentStatus = period.status === 'paid' ? 'paid' : 'pending';
      
      // Create payslip
      payslips.push({
        id: generateId(),
        created_at: period.created_at,
        updated_at: period.updated_at,
        employee_id: employee.id,
        payroll_period_id: period.id,
        base_salary: baseSalary,
        gross_earnings: grossEarnings,
        total_deductions: totalDeductions,
        net_salary: netSalary,
        payment_method: 'Bank Transfer',
        payment_status: paymentStatus,
        payment_date: paymentStatus === 'paid' ? period.payment_date : null,
        payment_reference: paymentStatus === 'paid' ? `REF-${Math.floor(Math.random() * 1000000)}` : null
      });
    });
  });
  
  return payslips;
};

// Mock Payslips
export const mockPayslips: Payslip[] = generateMockPayslips();

// Mock API response format
export const mockApiResponse = <T>(data: T) => {
  return {
    data,
    error: null
  };
};

// Mock API error response
export const mockApiError = (message: string) => {
  return {
    data: null,
    error: {
      message
    }
  };
};

// Mock API functions that mimic the Supabase client functions
export const mockApi = {
  // Authentication
  signIn: async (email: string, password: string) => {
    if (email === 'admin@example.com' && password === 'password123') {
      return mockApiResponse({
        user: {
          id: 'mock-user-id',
          email: 'admin@example.com',
          user_metadata: {
            name: 'Admin User'
          }
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token',
          expires_in: 3600
        }
      });
    }
    return mockApiError('Invalid email or password');
  },
  
  // Employees
  fetchEmployees: async () => {
    return mockApiResponse(mockEmployees);
  },
  
  fetchEmployee: async (id: string) => {
    const employee = mockEmployees.find(e => e.id === id);
    if (employee) {
      return mockApiResponse(employee);
    }
    return mockApiError('Employee not found');
  },
  
  createEmployee: async (employeeData: any) => {
    const newEmployee = {
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...employeeData
    };
    mockEmployees.push(newEmployee as Employee);
    return mockApiResponse(newEmployee);
  },
  
  updateEmployee: async (id: string, employeeData: any) => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEmployees[index] = {
        ...mockEmployees[index],
        ...employeeData,
        updated_at: new Date().toISOString()
      };
      return mockApiResponse(mockEmployees[index]);
    }
    return mockApiError('Employee not found');
  },
  
  deleteEmployee: async (id: string) => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
      return mockApiResponse({ success: true });
    }
    return mockApiError('Employee not found');
  },
  
  // Salary Structures
  fetchSalaryStructures: async () => {
    return mockApiResponse(mockSalaryStructures);
  },
  
  // Salary Components
  fetchSalaryComponents: async () => {
    return mockApiResponse(mockSalaryComponents);
  },
  
  // Payroll Periods
  fetchPayrollPeriods: async () => {
    return mockApiResponse(mockPayrollPeriods);
  },
  
  // Payslips
  fetchPayslips: async (periodId: string) => {
    const periodPayslips = mockPayslips.filter(p => p.payroll_period_id === periodId);
    
    // Enhance payslips with employee data
    const enhancedPayslips = periodPayslips.map(payslip => {
      const employee = mockEmployees.find(e => e.id === payslip.employee_id);
      return {
        ...payslip,
        employees: employee ? {
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          employee_id: employee.employee_id
        } : null
      };
    });
    
    return mockApiResponse(enhancedPayslips);
  }
};

export default mockApi;