import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Typography, 
  Spin,
  Alert
} from 'antd';
import {
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
// import your Supabase client if/when you use actual API calls
// import { supabase } from './supabase-client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './DashboardPagee.css';

const { Title } = Typography;

interface DashboardStats {
  totalEmployees: number;
  totalSalary: number;
  pendingPayments: number;
  alerts: number;
}

interface DepartmentSalary {
  department: string;
  employees: number;
  totalSalary: number;
}

interface PendingPayment {
  key: string;
  employee: string;
  department: string;
  amount: number;
  dueDate: string;
  status: string;
}

interface AlertData {
  key: string;
  type: string;
  message: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
}

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalSalary: 0,
    pendingPayments: 0,
    alerts: 0
  });
  const [departmentSalaries, setDepartmentSalaries] = useState<DepartmentSalary[]>([]);
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use your API/Supabase calls here; below is mock data.
        const statsData = {
          total_employees: 156,
          total_salary: 7850000,
          pending_payments: 12,
          alerts: 5
        };
        setStats({
          totalEmployees: statsData.total_employees,
          totalSalary: statsData.total_salary,
          pendingPayments: statsData.pending_payments,
          alerts: statsData.alerts
        });

        const deptData = [
          { department: 'Engineering', employees: 45, totalSalary: 2500000 },
          { department: 'Marketing', employees: 30, totalSalary: 1500000 },
          { department: 'Finance', employees: 25, totalSalary: 1350000 },
          { department: 'HR', employees: 15, totalSalary: 900000 },
          { department: 'Operations', employees: 35, totalSalary: 1600000 },
          { department: 'Sales', employees: 6, totalSalary: 400000 }
        ];
        setDepartmentSalaries(deptData);

        const paymentsData = [
          { key: '1', employee: 'John Doe', department: 'Engineering', amount: 85000, dueDate: '2023-07-31', status: 'pending' },
          { key: '2', employee: 'Jane Smith', department: 'Marketing', amount: 65000, dueDate: '2023-07-31', status: 'pending' },
          { key: '3', employee: 'Robert Johnson', department: 'Finance', amount: 75000, dueDate: '2023-07-31', status: 'pending' },
          { key: '4', employee: 'Emily Davis', department: 'HR', amount: 60000, dueDate: '2023-07-31', status: 'pending' },
          { key: '5', employee: 'Michael Wilson', department: 'Operations', amount: 70000, dueDate: '2023-07-31', status: 'pending' }
        ];
        setPendingPayments(paymentsData);

        const alertsData = [
          { key: '1', type: 'Document Expiry', message: 'Passport for John Doe expires in 30 days', date: '2023-08-25', severity: 'medium' },
          { key: '2', type: 'Salary Anomaly', message: 'Unusual increase in overtime for Marketing department', date: '2023-07-26', severity: 'low' },
          { key: '3', type: 'Compliance', message: 'Tax filing deadline approaching', date: '2023-07-31', severity: 'high' },
          { key: '4', type: 'Document Expiry', message: 'Work permit for Jane Smith expires in 15 days', date: '2023-08-10', severity: 'high' },
          { key: '5', type: 'System', message: 'Database backup failed', date: '2023-07-25', severity: 'medium' }
        ];
        setAlerts(alertsData);

      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Columns for pending payments table
  const paymentColumns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="orange">{status.toUpperCase()}</Tag>
      ),
    },
  ];

  // Columns for alerts table
  const alertColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        let color = 'green';
        if (severity === 'high') {
          color = 'red';
        } else if (severity === 'medium') {
          color = 'orange';
        }
        return (
          <Tag color={color}>{severity.toUpperCase()}</Tag>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="dashboard-root">
      <Title level={2} className="dashboard-title">Dashboard</Title>
      
      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Monthly Salary"
              value={stats.totalSalary}
              precision={0}
              prefix={<DollarOutlined />}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Pending Payments"
              value={stats.pendingPayments}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Alerts"
              value={stats.alerts}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Department Salary Chart */}
      <Card className="dashboard-card dashboard-bar-chart" title="Department-wise Salary Distribution" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={departmentSalaries}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="totalSalary" name="Total Salary" fill="#1890ff" />
            <Bar dataKey="employees" name="Employees" fill="#52c41a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* Pending Payments Table */}
      <Card className="dashboard-card" title="Pending Salary Payments" style={{ marginBottom: 24 }}>
        <Table 
          columns={paymentColumns} 
          dataSource={pendingPayments} 
          pagination={{ pageSize: 5 }}
        />
      </Card>
      
      {/* Alerts Table */}
      <Card className="dashboard-card" title="Alerts & Reminders">
        <Table 
          columns={alertColumns} 
          dataSource={alerts} 
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
