# Dashboard Service

This file contains the complete implementation of the dashboard service that was getting cut off in the api-services.md file.

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
      .lte('expiry_date', thresholdDate.toISOString().split('T')[0])
      .gt('expiry_date', today.toISOString().split('T')[0]);
  },

  // Get upcoming birthdays
  getUpcomingBirthdays: async (daysThreshold = 30) => {
    return await supabase.rpc('get_upcoming_birthdays', { days_threshold: daysThreshold });
  },

  // Get upcoming work anniversaries
  getUpcomingWorkAnniversaries: async (daysThreshold = 30) => {
    return await supabase.rpc('get_upcoming_work_anniversaries', { days_threshold: daysThreshold });
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    return await supabase.rpc('get_recent_activities', { activity_limit: limit });
  },

  // Get employee distribution by department
  getEmployeeDistributionByDepartment: async () => {
    return await supabase.rpc('get_employee_distribution_by_department');
  },

  // Get employee distribution by role
  getEmployeeDistributionByRole: async () => {
    return await supabase.rpc('get_employee_distribution_by_role');
  },

  // Get salary distribution
  getSalaryDistribution: async () => {
    return await supabase.rpc('get_salary_distribution');
  },

  // Get attendance overview
  getAttendanceOverview: async (month, year) => {
    return await supabase.rpc('get_attendance_overview', { month, year });
  },

  // Get leave overview
  getLeaveOverview: async (month, year) => {
    return await supabase.rpc('get_leave_overview', { month, year });
  },
};