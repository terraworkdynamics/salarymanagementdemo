import { mockEmployees, mockSalaryStructures, mockSalaryComponents, mockPayrollPeriods, mockPayslips } from './mockDataService';
import { Database } from '../types/database.types';

type Employee = Database['public']['Tables']['employees']['Row'];
type SalaryStructure = Database['public']['Tables']['salary_structures']['Row'];
type SalaryComponent = Database['public']['Tables']['salary_components']['Row'];
type PayrollPeriod = Database['public']['Tables']['payroll_periods']['Row'];
type Payslip = Database['public']['Tables']['payslips']['Row'];

export interface SearchResult {
  type: 'employee' | 'salary_structure' | 'salary_component' | 'payroll_period' | 'payslip';
  id: string;
  title: string;
  subtitle: string;
  description: string;
  data: any;
  relevance: number;
}

export interface SearchFilters {
  types?: string[];
  departments?: string[];
  status?: string[];
}

class SearchService {
  private searchIndex: SearchResult[] = [];

  constructor() {
    this.buildSearchIndex();
  }

  private buildSearchIndex() {
    this.searchIndex = [];

    // Index employees
    mockEmployees.forEach(employee => {
      this.searchIndex.push({
        type: 'employee',
        id: employee.id,
        title: `${employee.first_name} ${employee.last_name}`,
        subtitle: `${employee.designation} - ${employee.department}`,
        description: `${employee.email} | ${employee.employee_id} | ${employee.city}, ${employee.state}`,
        data: employee,
        relevance: 0
      });
    });

    // Index salary structures
    mockSalaryStructures.forEach(structure => {
      this.searchIndex.push({
        type: 'salary_structure',
        id: structure.id,
        title: structure.name,
        subtitle: 'Salary Structure',
        description: structure.description || 'No description available',
        data: structure,
        relevance: 0
      });
    });

    // Index salary components
    mockSalaryComponents.forEach(component => {
      this.searchIndex.push({
        type: 'salary_component',
        id: component.id,
        title: component.name,
        subtitle: `${component.component_type} - ${component.calculation_type}`,
        description: `${component.description} | Value: ${component.calculation_value}${component.calculation_type === 'percentage' ? '%' : ''}`,
        data: component,
        relevance: 0
      });
    });

    // Index payroll periods
    mockPayrollPeriods.forEach(period => {
      this.searchIndex.push({
        type: 'payroll_period',
        id: period.id,
        title: period.period_name,
        subtitle: `Payroll Period - ${period.status}`,
        description: `${period.period_start} to ${period.period_end} | Payment: ${period.payment_date}`,
        data: period,
        relevance: 0
      });
    });

    // Index payslips with employee information
    mockPayslips.forEach(payslip => {
      const employee = mockEmployees.find(e => e.id === payslip.employee_id);
      const period = mockPayrollPeriods.find(p => p.id === payslip.payroll_period_id);
      
      if (employee && period) {
        this.searchIndex.push({
          type: 'payslip',
          id: payslip.id,
          title: `${employee.first_name} ${employee.last_name} - ${period.period_name}`,
          subtitle: `Payslip - ${payslip.payment_status}`,
          description: `Net Salary: ₹${payslip.net_salary.toLocaleString()} | Gross: ₹${payslip.gross_earnings.toLocaleString()} | Deductions: ₹${payslip.total_deductions.toLocaleString()}`,
          data: { ...payslip, employee, period },
          relevance: 0
        });
      }
    });
  }

  private calculateRelevance(query: string, result: SearchResult): number {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let relevance = 0;

    searchTerms.forEach(term => {
      const titleMatch = result.title.toLowerCase().includes(term);
      const subtitleMatch = result.subtitle.toLowerCase().includes(term);
      const descriptionMatch = result.description.toLowerCase().includes(term);

      if (titleMatch) relevance += 10;
      if (subtitleMatch) relevance += 5;
      if (descriptionMatch) relevance += 3;

      // Boost relevance for exact matches
      if (result.title.toLowerCase() === term) relevance += 20;
      if (result.subtitle.toLowerCase() === term) relevance += 15;
    });

    return relevance;
  }

  public search(query: string, filters?: SearchFilters): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    const results = this.searchIndex
      .map(result => ({
        ...result,
        relevance: this.calculateRelevance(query, result)
      }))
      .filter(result => result.relevance > 0)
      .filter(result => {
        if (!filters) return true;
        
        if (filters.types && filters.types.length > 0) {
          if (!filters.types.includes(result.type)) return false;
        }
        
        if (filters.departments && filters.departments.length > 0) {
          if (result.type === 'employee') {
            const employee = result.data as Employee;
            if (!filters.departments.includes(employee.department)) return false;
          }
        }
        
        if (filters.status && filters.status.length > 0) {
          if (result.type === 'employee') {
            const employee = result.data as Employee;
            if (!filters.status.includes(employee.status)) return false;
          } else if (result.type === 'payroll_period') {
            const period = result.data as PayrollPeriod;
            if (!filters.status.includes(period.status)) return false;
          } else if (result.type === 'payslip') {
            const payslip = result.data as Payslip;
            if (!filters.status.includes(payslip.payment_status)) return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 20); // Limit to top 20 results

    return results;
  }

  public getSearchSuggestions(query: string): string[] {
    if (!query.trim()) {
      return [];
    }

    const suggestions = new Set<string>();
    const searchTerms = query.toLowerCase();

    // Add employee names
    mockEmployees.forEach(employee => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      if (fullName.includes(searchTerms)) {
        suggestions.add(`${employee.first_name} ${employee.last_name}`);
      }
    });

    // Add departments
    const departments = Array.from(new Set(mockEmployees.map(e => e.department)));
    departments.forEach(dept => {
      if (dept.toLowerCase().includes(searchTerms)) {
        suggestions.add(dept);
      }
    });

    // Add designations
    const designations = Array.from(new Set(mockEmployees.map(e => e.designation)));
    designations.forEach(designation => {
      if (designation.toLowerCase().includes(searchTerms)) {
        suggestions.add(designation);
      }
    });

    // Add salary component names
    mockSalaryComponents.forEach(component => {
      if (component.name.toLowerCase().includes(searchTerms)) {
        suggestions.add(component.name);
      }
    });

    // Add payroll period names
    mockPayrollPeriods.forEach(period => {
      if (period.period_name.toLowerCase().includes(searchTerms)) {
        suggestions.add(period.period_name);
      }
    });

    return Array.from(suggestions).slice(0, 10);
  }

  public getQuickStats(): { [key: string]: number } {
    return {
      employees: mockEmployees.length,
      activeEmployees: mockEmployees.filter(e => e.status === 'active').length,
      salaryStructures: mockSalaryStructures.length,
      salaryComponents: mockSalaryComponents.length,
      payrollPeriods: mockPayrollPeriods.length,
      payslips: mockPayslips.length
    };
  }
}

export const searchService = new SearchService();
export default searchService; 