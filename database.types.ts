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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          role: string
          full_name: string | null
          last_sign_in: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          role: string
          full_name?: string | null
          last_sign_in?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          role?: string
          full_name?: string | null
          last_sign_in?: string | null
        }
      }
      departments: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          title: string
          department_id: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          department_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          department_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          employee_id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          address: string | null
          date_of_birth: string | null
          gender: string | null
          joining_date: string
          department_id: string | null
          role_id: string | null
          reporting_to: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          gender?: string | null
          joining_date: string
          department_id?: string | null
          role_id?: string | null
          reporting_to?: string | null
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          gender?: string | null
          joining_date?: string
          department_id?: string | null
          role_id?: string | null
          reporting_to?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      employee_bank_details: {
        Row: {
          id: string
          employee_id: string
          bank_name: string
          account_number: string
          ifsc_code: string
          branch: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          bank_name: string
          account_number: string
          ifsc_code: string
          branch?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          bank_name?: string
          account_number?: string
          ifsc_code?: string
          branch?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employee_documents: {
        Row: {
          id: string
          employee_id: string
          document_type: string
          document_number: string | null
          file_path: string
          expiry_date: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          document_type: string
          document_number?: string | null
          file_path: string
          expiry_date?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          document_type?: string
          document_number?: string | null
          file_path?: string
          expiry_date?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Add more tables as needed
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