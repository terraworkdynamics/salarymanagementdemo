export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string | null
          date_of_birth: string | null
          date_of_joining: string
          department: string
          designation: string
          employee_id: string
          manager_id: string | null
          status: 'active' | 'inactive' | 'on_leave' | 'terminated'
          bank_account_number: string | null
          bank_name: string | null
          bank_ifsc: string | null
          pan_number: string | null
          aadhar_number: string | null
          uan_number: string | null
          pf_number: string | null
          esi_number: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          date_of_birth?: string | null
          date_of_joining: string
          department: string
          designation: string
          employee_id: string
          manager_id?: string | null
          status?: 'active' | 'inactive' | 'on_leave' | 'terminated'
          bank_account_number?: string | null
          bank_name?: string | null
          bank_ifsc?: string | null
          pan_number?: string | null
          aadhar_number?: string | null
          uan_number?: string | null
          pf_number?: string | null
          esi_number?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          date_of_birth?: string | null
          date_of_joining?: string
          department?: string
          designation?: string
          employee_id?: string
          manager_id?: string | null
          status?: 'active' | 'inactive' | 'on_leave' | 'terminated'
          bank_account_number?: string | null
          bank_name?: string | null
          bank_ifsc?: string | null
          pan_number?: string | null
          aadhar_number?: string | null
          uan_number?: string | null
          pf_number?: string | null
          esi_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_manager_id_fkey"
            columns: ["manager_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      salary_structures: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          is_active?: boolean
        }
        Relationships: []
      }
      salary_components: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          component_type: 'earning' | 'deduction'
          calculation_type: 'fixed' | 'percentage'
          calculation_value: number
          calculation_basis: string | null
          taxable: boolean
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          component_type: 'earning' | 'deduction'
          calculation_type: 'fixed' | 'percentage'
          calculation_value: number
          calculation_basis?: string | null
          taxable?: boolean
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          component_type?: 'earning' | 'deduction'
          calculation_type?: 'fixed' | 'percentage'
          calculation_value?: number
          calculation_basis?: string | null
          taxable?: boolean
          is_active?: boolean
        }
        Relationships: []
      }
      structure_components: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          structure_id: string
          component_id: string
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          structure_id: string
          component_id: string
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          structure_id?: string
          component_id?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "structure_components_structure_id_fkey"
            columns: ["structure_id"]
            referencedRelation: "salary_structures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "structure_components_component_id_fkey"
            columns: ["component_id"]
            referencedRelation: "salary_components"
            referencedColumns: ["id"]
          }
        ]
      }
      employee_salary: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          employee_id: string
          structure_id: string
          base_salary: number
          effective_from: string
          effective_to: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id: string
          structure_id: string
          base_salary: number
          effective_from: string
          effective_to?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id?: string
          structure_id?: string
          base_salary?: number
          effective_from?: string
          effective_to?: string | null
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "employee_salary_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_salary_structure_id_fkey"
            columns: ["structure_id"]
            referencedRelation: "salary_structures"
            referencedColumns: ["id"]
          }
        ]
      }
      payroll_periods: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          period_name: string
          period_start: string
          period_end: string
          payment_date: string
          status: 'draft' | 'processing' | 'approved' | 'paid'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          period_name: string
          period_start: string
          period_end: string
          payment_date: string
          status?: 'draft' | 'processing' | 'approved' | 'paid'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          period_name?: string
          period_start?: string
          period_end?: string
          payment_date?: string
          status?: 'draft' | 'processing' | 'approved' | 'paid'
        }
        Relationships: []
      }
      payslips: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          employee_id: string
          payroll_period_id: string
          base_salary: number
          gross_earnings: number
          total_deductions: number
          net_salary: number
          payment_method: string
          payment_status: 'pending' | 'paid'
          payment_date: string | null
          payment_reference: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id: string
          payroll_period_id: string
          base_salary: number
          gross_earnings: number
          total_deductions: number
          net_salary: number
          payment_method: string
          payment_status?: 'pending' | 'paid'
          payment_date?: string | null
          payment_reference?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id?: string
          payroll_period_id?: string
          base_salary?: number
          gross_earnings?: number
          total_deductions?: number
          net_salary?: number
          payment_method?: string
          payment_status?: 'pending' | 'paid'
          payment_date?: string | null
          payment_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payslips_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payslips_payroll_period_id_fkey"
            columns: ["payroll_period_id"]
            referencedRelation: "payroll_periods"
            referencedColumns: ["id"]
          }
        ]
      }
      payslip_components: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          payslip_id: string
          component_id: string
          component_name: string
          component_type: 'earning' | 'deduction'
          amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          payslip_id: string
          component_id: string
          component_name: string
          component_type: 'earning' | 'deduction'
          amount: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          payslip_id?: string
          component_id?: string
          component_name?: string
          component_type?: 'earning' | 'deduction'
          amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "payslip_components_payslip_id_fkey"
            columns: ["payslip_id"]
            referencedRelation: "payslips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payslip_components_component_id_fkey"
            columns: ["component_id"]
            referencedRelation: "salary_components"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}