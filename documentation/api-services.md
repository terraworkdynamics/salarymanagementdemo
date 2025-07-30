# Salary Management System - API Services

This document outlines the API services and endpoints that will be used for communication between the frontend React application and the Supabase backend.

## Authentication Services

### `authService.js`

```javascript
import { supabase } from '../lib/supabase';

export const authService = {
  // Sign in with email and password
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  // Reset password
  resetPassword: async (email) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },

  // Update password
  updatePassword: async (password) => {
    return await supabase.auth.updateUser({ password });
  },

  // Get current session
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  // Get current user
  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
```

## Employee Services

### `employeeService.js`

```javascript
import { supabase } from '../lib/supabase';

export const employeeService = {
  // Get all employees
  getAllEmployees: async (page = 1, limit = 10, filters = {}) => {
    let query = supabase
      .from('employees')
      .select(`
        *,
        departments(name),
        roles(title)
      `)
      .range((page - 1) * limit, page * limit - 1);

    // Apply filters
    if (filters.name) {
      query = query.or(`first_name.ilike.%${filters.name}%,last_name.ilike.%${filters.name}%`);
    }
    if (filters.department_id) {
      query = query.eq('department_id', filters.department_id);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    return await query;
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    return await supabase
      .from('employees')
      .select(`
        *,
        departments(name),
        roles(title),
        employee_bank_details(*),
        employee_documents(*)
      `)
      .eq('id', id)
      .single();
  },

  // Create employee
  createEmployee: async (employeeData) => {
    return await supabase
      .from('employees')
      .insert(employeeData)
      .select();
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    return await supabase
      .from('employees')
      .update(employeeData)
      .eq('id', id)
      .select();
  },

  // Delete employee
  deleteEmployee: async (id) => {
    return await supabase
      .from('employees')
      .delete()
      .eq('id', id);
  },

  // Get employee count
  getEmployeeCount: async () => {
    return await supabase
      .from('employees')
      .select('id', { count: 'exact', head: true });
  },

  // Get employee bank details
  getEmployeeBankDetails: async (employeeId) => {
    return await supabase
      .from('employee_bank_details')
      .select('*')
      .eq('employee_id', employeeId);
  },

  // Create employee bank details
  createEmployeeBankDetails: async (bankDetails) => {
    return await supabase
      .from('employee_bank_details')
      .insert(bankDetails)
      .select();
  },

  // Update employee bank details
  updateEmployeeBankDetails: async (id, bankDetails) => {
    return await supabase
      .from('employee_bank_details')
      .update(bankDetails)
      .eq('id', id)
      .select();
  },

  // Delete employee bank details
  deleteEmployeeBankDetails: async (id) => {
    return await supabase
      .from('employee_bank_details')
      .delete()
      .eq('id', id);
  },

  // Get employee documents
  getEmployeeDocuments: async (employeeId) => {
    return await supabase
      .from('employee_documents')
      .select('*')
      .eq('employee_id', employeeId);
  },

  // Create employee document
  createEmployeeDocument: async (document) => {
    return await supabase
      .from('employee_documents')
      .insert(document)
      .select();
  },

  // Update employee document
  updateEmployeeDocument: async (id, document) => {
    return await supabase
      .from('employee_documents')
      .update(document)
      .eq('id', id)
      .select();
  },

  // Delete employee document
  deleteEmployeeDocument: async (id) => {
    return await supabase
      .from('employee_documents')
      .delete()
      .eq('id', id);
  },

  // Upload document file
  uploadDocumentFile: async (file, path) => {
    return await supabase.storage
      .from('employee_documents')
      .upload(path, file);
  },

  // Get document file URL
  getDocumentFileUrl: async (path) => {
    return supabase.storage
      .from('employee_documents')
      .getPublicUrl(path);
  },
};
```

## Department Services

### `departmentService.js`

```javascript
import { supabase } from '../lib/supabase';

export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    return await supabase
      .from('departments')
      .select('*')
      .order('name');
  },

  // Get department by ID
  getDepartmentById: async (id) => {
    return await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Create department
  createDepartment: async (departmentData) => {
    return await supabase
      .from('departments')
      .insert(departmentData)
      .select();
  },

  // Update department
  updateDepartment: async (id, departmentData) => {
    return await supabase
      .from('departments')
      .update(departmentData)
      .eq('id', id)
      .select();
  },

  // Delete department
  deleteDepartment: async (id) => {
    return await supabase
      .from('departments')
      .delete()
      .eq('id', id);
  },

  // Get department with employee count
  getDepartmentsWithEmployeeCount: async () => {
    return await supabase
      .from('departments')
      .select(`
        *,
        employees:employees(id)
      `);
  },
};
```

## Role Services

### `roleService.js`

```javascript
import { supabase } from '../lib/supabase';

export const roleService = {
  // Get all roles
  getAllRoles: async () => {
    return await supabase
      .from('roles')
      .select(`
        *,
        departments(name)
      `)
      .order('title');
  },

  // Get roles by department
  getRolesByDepartment: async (departmentId) => {
    return await supabase
      .from('roles')
      .select('*')
      .eq('department_id', departmentId)
      .order('title');
  },

  // Get role by ID
  getRoleById: async (id) => {
    return await supabase
      .from('roles')
      .select(`
        *,
        departments(name)
      `)
      .eq('id', id)
      .single();
  },

  // Create role
  createRole: async (roleData) => {
    return await supabase
      .from('roles')
      .insert(roleData)
      .select();
  },

  // Update role
  updateRole: async (id, roleData) => {
    return await supabase
      .from('roles')
      .update(roleData)
      .eq('id', id)
      .select();
  },

  // Delete role
  deleteRole: async (id) => {
    return await supabase
      .from('roles')
      .delete()
      .eq('id', id);
  },
};
```

## Salary Component Services

### `salaryComponentService.js`

```javascript
import { supabase } from '../lib/supabase';

export const salaryComponentService = {
  // Get all salary components
  getAllComponents: async () => {
    return await supabase
      .from('salary_components')
      .select('*')
      .order('name');
  },

  // Get components by type
  getComponentsByType: async (type) => {
    return await supabase
      .from('salary_components')
      .select('*')
      .eq('type', type)
      .order('name');
  },

  // Get component by ID
  getComponentById: async (id) => {
    return await supabase
      .from('salary_components')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Create component
  createComponent: async (componentData) => {
    return await supabase
      .from('salary_components')
      .insert(componentData)
      .select();
  },

  // Update component
  updateComponent: async (id, componentData) => {
    return await supabase
      .from('salary_components')
      .update(componentData)
      .eq('id', id)
      .select();
  },

  // Delete component
  deleteComponent: async (id) => {
    return await supabase
      .from('salary_components')
      .delete()
      .eq('id', id);
  },
};
```

## Salary Structure Services

### `salaryStructureService.js`

```javascript
import { supabase } from '../lib/supabase';

export const salaryStructureService = {
  // Get all salary structures
  getAllStructures: async () => {
    return await supabase
      .from('salary_structures')
      .select('*')
      .order('name');
  },

  // Get active structures
  getActiveStructures: async () => {
    return await supabase
      .from('salary_structures')
      .select('*')
      .eq('is_active', true)
      .order('name');
  },

  // Get structure by ID
  getStructureById: async (id) => {
    return await supabase
      .from('salary_structures')
      .select(`
        *,
        salary_structure_components(
          *,
          salary_components(*)
        )
      `)
      .eq('id', id)
      .single();
  },

  // Create structure
  createStructure: async (structureData) => {
    return await supabase
      .from('salary_structures')
      .insert(structureData)
      .select();
  },

  // Update structure
  updateStructure: async (id, structureData) => {
    return await supabase
      .from('salary_structures')
      .update(structureData)
      .eq('id', id)
      .select();
  },

  // Delete structure
  deleteStructure: async (id) => {
    return await supabase
      .from('salary_structures')
      .delete()
      .eq('id', id);
  },

  // Get structure components
  getStructureComponents: async (structureId) => {
    return await supabase
      .from('salary_structure_components')
      .select(`
        *,
        salary_components(*)
      `)
      .eq('salary_structure_id', structureId);
  },

  // Add component to structure
  addComponentToStructure: async (componentData) => {
    return await supabase
      .from('salary_structure_components')
      .insert(componentData)
      .select();
  },

  // Update structure component
  updateStructureComponent: async (id, componentData) => {
    return await supabase
      .from('salary_structure_components')
      .update(componentData)
      .eq('id', id)
      .select();
  },

  // Remove component from structure
  removeComponentFromStructure: async (id) => {
    return await supabase
      .from('salary_structure_components')
      .delete()
      .eq('id', id);
  },

  // Assign structure to employee
  assignStructureToEmployee: async (employeeId, structureId, salaryData) => {
    return await supabase
      .from('employee_salary')
      .insert({
        employee_id: employeeId,
        salary_structure_id: structureId,
        ...salaryData,
      })
      .select();
  },

  // Get employee salary
  getEmployeeSalary: async (employeeId) => {
    return await supabase
      .from('employee_salary')
      .select(`
        *,
        salary_structures(*)
      `)
      .eq('employee_id', employeeId)
      .order('effective_from', { ascending: false });
  },

  // Update employee salary
  updateEmployeeSalary: async (id, salaryData) => {
    return await supabase
      .from('employee_salary')
      .update(salaryData)
      .eq('id', id)
      .select();
  },
};
```

## Payroll Services

### `payrollService.js`

```javascript
import { supabase } from '../lib/supabase';

export const payrollService = {
  // Get payroll by month and year
  getPayrollByMonth: async (month, year) => {
    return await supabase
      .from('payroll')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name,
          departments(name),
          roles(title)
        )
      `)
      .eq('month', month)
      .eq('year', year);
  },

  // Get payroll by ID
  getPayrollById: async (id) => {
    return await supabase
      .from('payroll')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name,
          departments(name),
          roles(title)
        ),
        payroll_components(
          *,
          salary_components(*)
        )
      `)
      .eq('id', id)
      .single();
  },

  // Get employee payroll history
  getEmployeePayrollHistory: async (employeeId) => {
    return await supabase
      .from('payroll')
      .select('*')
      .eq('employee_id', employeeId)
      .order('year', { ascending: false })
      .order('month', { ascending: false });
  },

  // Create payroll
  createPayroll: async (payrollData) => {
    return await supabase
      .from('payroll')
      .insert(payrollData)
      .select();
  },

  // Update payroll
  updatePayroll: async (id, payrollData) => {
    return await supabase
      .from('payroll')
      .update(payrollData)
      .eq('id', id)
      .select();
  },

  // Delete payroll
  deletePayroll: async (id) => {
    return await supabase
      .from('payroll')
      .delete()
      .eq('id', id);
  },

  // Add payroll component
  addPayrollComponent: async (componentData) => {
    return await supabase
      .from('payroll_components')
      .insert(componentData)
      .select();
  },

  // Update payroll component
  updatePayrollComponent: async (id, componentData) => {
    return await supabase
      .from('payroll_components')
      .update(componentData)
      .eq('id', id)
      .select();
  },

  // Delete payroll component
  deletePayrollComponent: async (id) => {
    return await supabase
      .from('payroll_components')
      .delete()
      .eq('id', id);
  },

  // Get payroll summary
  getPayrollSummary: async (month, year) => {
    return await supabase.rpc('get_payroll_summary', { month, year });
  },

  // Generate payroll for month
  generatePayroll: async (month, year) => {
    return await supabase.rpc('generate_payroll', { month, year });
  },

  // Approve payroll
  approvePayroll: async (id, approvedBy) => {
    return await supabase
      .from('payroll')
      .update({
        payment_status: 'approved',
        approved_by: approvedBy,
      })
      .eq('id', id)
      .select();
  },

  // Process payment
  processPayment: async (id, paymentData) => {
    return await supabase
      .from('payroll')
      .update({
        payment_status: 'paid',
        payment_date: new Date(),
        payment_method: paymentData.method,
        transaction_reference: paymentData.reference,
      })
      .eq('id', id)
      .select();
  },
};
```

## Payslip Services

### `payslipService.js`

```javascript
import { supabase } from '../lib/supabase';

export const payslipService = {
  // Get payslip by payroll ID
  getPayslipByPayrollId: async (payrollId) => {
    return await supabase
      .from('payslips')
      .select('*')
      .eq('payroll_id', payrollId)
      .single();
  },

  // Create payslip
  createPayslip: async (payslipData) => {
    return await supabase
      .from('payslips')
      .insert(payslipData)
      .select();
  },

  // Update payslip
  updatePayslip: async (id, payslipData) => {
    return await supabase
      .from('payslips')
      .update(payslipData)
      .eq('id', id)
      .select();
  },

  // Upload payslip file
  uploadPayslipFile: async (file, path) => {
    return await supabase.storage
      .from('payslips')
      .upload(path, file);
  },

  // Get payslip file URL
  getPayslipFileUrl: async (path) => {
    return supabase.storage
      .from('payslips')
      .getPublicUrl(path);
  },

  // Mark payslip as emailed
  markPayslipAsEmailed: async (id) => {
    return await supabase
      .from('payslips')
      .update({
        is_emailed: true,
        emailed_at: new Date(),
      })
      .eq('id', id)
      .select();
  },

  // Generate payslips for month
  generatePayslipsForMonth: async (month, year) => {
    return await supabase.rpc('generate_payslips', { month, year });
  },
};
```

## Attendance Services

### `attendanceService.js`

```javascript
import { supabase } from '../lib/supabase';

export const attendanceService = {
  // Get attendance by date range
  getAttendanceByDateRange: async (startDate, endDate) => {
    return await supabase
      .from('attendance')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name
        )
      `)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date');
  },

  // Get employee attendance by date range
  getEmployeeAttendanceByDateRange: async (employeeId, startDate, endDate) => {
    return await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date');
  },

  // Get attendance by date
  getAttendanceByDate: async (date) => {
    return await supabase
      .from('attendance')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name
        )
      `)
      .eq('date', date);
  },

  // Create attendance
  createAttendance: async (attendanceData) => {
    return await supabase
      .from('attendance')
      .insert(attendanceData)
      .select();
  },

  // Update attendance
  updateAttendance: async (id, attendanceData) => {
    return await supabase
      .from('attendance')
      .update(attendanceData)
      .eq('id', id)
      .select();
  },

  // Delete attendance
  deleteAttendance: async (id) => {
    return await supabase
      .from('attendance')
      .delete()
      .eq('id', id);
  },

  // Bulk create attendance
  bulkCreateAttendance: async (attendanceDataArray) => {
    return await supabase
      .from('attendance')
      .insert(attendanceDataArray)
      .select();
  },

  // Get attendance summary by month
  getAttendanceSummaryByMonth: async (month, year) => {
    return await supabase.rpc('get_attendance_summary', { month, year });
  },
};
```

## Leave Services

### `leaveService.js`

```javascript
import { supabase } from '../lib/supabase';

export const leaveService = {
  // Get all leave types
  getAllLeaveTypes: async () => {
    return await supabase
      .from('leave_types')
      .select('*')
      .order('name');
  },

  // Get leave type by ID
  getLeaveTypeById: async (id) => {
    return await supabase
      .from('leave_types')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Create leave type
  createLeaveType: async (leaveTypeData) => {
    return await supabase
      .from('leave_types')
      .insert(leaveTypeData)
      .select();
  },

  // Update leave type
  updateLeaveType: async (id, leaveTypeData) => {
    return await supabase
      .from('leave_types')
      .update(leaveTypeData)
      .eq('id', id)
      .select();
  },

  // Delete leave type
  deleteLeaveType: async (id) => {
    return await supabase
      .from('leave_types')
      .delete()
      .eq('id', id);
  },

  // Get employee leaves
  getEmployeeLeaves: async (employeeId) => {
    return await supabase
      .from('employee_leaves')
      .select(`
        *,
        leave_types(*)
      `)
      .eq('employee_id', employeeId)
      .order('start_date', { ascending: false });
  },

  // Get leave by ID
  getLeaveById: async (id) => {
    return await supabase
      .from('employee_leaves')
      .select(`
        *,
        leave_types(*),
        employees(
          id,
          employee_id,
          first_name,
          last_name
        )
      `)
      .eq('id', id)
      .single();
  },

  // Create leave
  createLeave: async (leaveData) => {
    return await supabase
      .from('employee_leaves')
      .insert(leaveData)
      .select();
  },

  // Update leave
  updateLeave: async (id, leaveData) => {
    return await supabase
      .from('employee_leaves')
      .update(leaveData)
      .eq('id', id)
      .select();
  },

  // Delete leave
  deleteLeave: async (id) => {
    return await supabase
      .from('employee_leaves')
      .delete()
      .eq('id', id);
  },

  // Approve leave
  approveLeave: async (id, approvedBy) => {
    return await supabase
      .from('employee_leaves')
      .update({
        status: 'approved',
        approved_by: approvedBy,
      })
      .eq('id', id)
      .select();
  },

  // Reject leave
  rejectLeave: async (id, approvedBy) => {
    return await supabase
      .from('employee_leaves')
      .update({
        status: 'rejected',
        approved_by: approvedBy,
      })
      .eq('id', id)
      .select();
  },

  // Get leave balance
  getLeaveBalance: async (employeeId) => {
    return await supabase.rpc('get_leave_balance', { employee_id: employeeId });
  },
};
```

## Tax Services

### `taxService.js`

```javascript
import { supabase } from '../lib/supabase';

export const taxService = {
  // Get tax information by employee and financial year
  getTaxInformation: async (employeeId, financialYear) => {
    return await supabase
      .from('tax_information')
      .select(`
        *,
        tax_deductions(*)
      `)
      .eq('employee_id', employeeId)
      .eq('financial_year', financialYear)
      .single();
  },

  // Create tax information
  createTaxInformation: async (taxData) => {
    return await supabase
      .from('tax_information')
      .insert(taxData)
      .select();
  },

  // Update tax information
  updateTaxInformation: async (id, taxData) => {
    return await supabase
      .from('tax_information')
      .update(taxData)
      .eq('id', id)
      .select();
  },

  // Add tax deduction
  addTaxDeduction: async (deductionData) => {
    return await supabase
      .from('tax_deductions')
      .insert(deductionData)
      .select();
  },

  // Update tax deduction
  updateTaxDeduction: async (id, deductionData) => {
    return await supabase
      .from('tax_deductions')
      .update(deductionData)
      .eq('id', id)
      .select();
  },

  // Delete tax deduction
  deleteTaxDeduction: async (id) => {
    return await supabase
      .from('tax_deductions')
      .delete()
      .eq('id', id);
  },

  // Upload tax document
  uploadTaxDocument: async (file, path) => {
    return await supabase.storage
      .from('tax_documents')
      .upload(path, file);
  },

  // Get tax document URL
  getTaxDocumentUrl: async (path) => {
    return supabase.storage
      .from('tax_documents')
      .getPublicUrl(path);
  },

  // Calculate tax
  calculateTax: async (employeeId, financialYear) => {
    return await supabase.rpc('calculate_tax', {
      employee_id: employeeId,
      financial_year: financialYear,
    });
  },

  // Generate Form 16
  generateForm16: async (employeeId, financialYear) => {
    return await supabase.rpc('generate_form_16', {
      employee_id: employeeId,
      financial_year: financialYear,
    });
  },
};
```

## Report Services

### `reportService.js`

```javascript
import { supabase } from '../lib/supabase';

export const reportService = {
  // Get monthly payroll report
  getMonthlyPayrollReport: async (month, year) => {
    return await supabase.rpc('get_monthly_payroll_report', { month, year });
  },

  // Get department-wise salary report
  getDepartmentSalaryReport: async (month, year) => {
    return await supabase.rpc('get_department_salary_report', { month, year });
  },

  // Get employee salary history
  getEmployeeSalaryHistory: async (employeeId) => {
    return await supabase.rpc('get_employee_salary_history', { employee_id: employeeId });
  },

  // Get tax deduction report
  getTaxDeductionReport: async (financialYear) => {
    return await supabase.rpc('get_tax_deduction_report', { financial_year: financialYear });
  },

  // Get PF report
  getPFReport: async (month, year) => {
    return await supabase.rpc('get_pf_report', { month, year });
  },

  // Get ESI report
  getESIReport: async (month, year) => {
    return await supabase.rpc('get_esi_report', { month, year });
  },

  // Get PT report
  getPTReport: async (month, year) => {
    return await supabase.rpc('get_pt_report', { month, year });
  },

  // Generate custom report
  generateCustomReport: async (params) => {
    return await supabase.rpc('generate_custom_report', params);
  },

  // Upload report file
  uploadReportFile: async (file, path) => {
    return await supabase.storage
      .from('reports')
      .upload(path, file);
  },

  // Get report file URL
  getReportFileUrl: async (path) => {
    return supabase.storage
      .from('reports')
      .getPublicUrl(path);
  },
};
```

## Dashboard Services

### `dashboardService.js`

```javascript
import { supabase } from '../lib/supabase';

export const dashboardService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return await supabase.rpc('get_dashboard_stats');
  },

  // Get salary trends
  getSalaryTrends: async (months = 12) => {
    return await supabase.rpc('get_salary_trends', { months });
  },

  // Get department-wise payroll
  getDepartmentPayroll: async (month, year) => {
    return await supabase.rpc('get_department_payroll', { month, year });
  },

  // Get pending salary payments
  getPendingSalaryPayments: async () => {
    return await supabase
      .from('payroll')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name
        )
      `)
      .eq('payment_status', 'pending');
  },

  // Get document expiry alerts
  getDocumentExpiryAlerts: async (daysThreshold = 30) => {
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + daysThreshold);

    return await supabase
      .from('employee_documents')
      .select(`
        *,
        employees(
          id,
          employee_id,
          first_name,
          last_name
        )
      `)
      .lte('expiry_date', thresholdDate.toISOString().