import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Typography, Empty, Spin } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  RiseOutlined,
  DashboardOutlined,
  PieChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { fetchEmployees, fetchPayrollPeriods } from '../lib/supabase-client';
import { Database } from '../types/database.types';
import './DashboardPage.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const { Title: TitleComponent } = Typography;

type Employee = Database['public']['Tables']['employees']['Row'];
type PayrollPeriod = Database['public']['Tables']['payroll_periods']['Row'];

const DashboardPage: React.FC = () => {
  // --------- CSS: Place at Top of Component JSX -----------


  const [loading, setLoading] = useState<boolean>(true);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [departmentData, setDepartmentData] = useState<any>({});
  const [salaryData, setSalaryData] = useState<any>({});
  const [recentPayrolls, setRecentPayrolls] = useState<PayrollPeriod[]>([]);
  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch employees data
        const { data: employeesData } = await fetchEmployees();
        const employees = employeesData || [];

        setEmployeeCount(employees.length);
        setRecentEmployees(employees.slice(0, 5));

        // Process department distribution
        if (employees.length > 0) {
          const deptCounts: Record<string, number> = {};
          employees.forEach((emp: any) => {
            const dept = emp.department || 'Unknown';
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
          });

          setDepartmentData({
            labels: Object.keys(deptCounts),
            datasets: [
              {
                label: 'Employees by Department',
                data: Object.values(deptCounts),
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(245, 158, 11, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(236, 72, 153, 0.8)',
                ],
                borderColor: [
                  'rgba(59, 130, 246, 1)',
                  'rgba(16, 185, 129, 1)',
                  'rgba(245, 158, 11, 1)',
                  'rgba(239, 68, 68, 1)',
                  'rgba(139, 92, 246, 1)',
                  'rgba(236, 72, 153, 1)',
                ],
                borderWidth: 2,
              },
            ],
          });
        }

        // Enhanced salary distribution with modern colors
        setSalaryData({
          labels: ['0-30K', '30K-50K', '50K-75K', '75K-100K', '100K+'],
          datasets: [
            {
              label: 'Salary Distribution',
              data: [5, 12, 18, 8, 3],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        });

        // Fetch recent payrolls
        const { data: payrollsData } = await fetchPayrollPeriods();
        const payrolls = payrollsData || [];
        setRecentPayrolls(payrolls.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const employeeColumns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'name',
      render: (_: string, record: Employee) => (
        <div className="employee-info">
          <div className="employee-avatar">
            {record.first_name.charAt(0)}
            {record.last_name.charAt(0)}
          </div>
          <span className="employee-name">
            {record.first_name} {record.last_name}
          </span>
        </div>
      ),
    },
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
      render: (id: string) => (
        <span className="employee-id-badge">{id}</span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (dept: string) => (
        <span className="department-badge">{dept}</span>
      ),
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Joining Date',
      dataIndex: 'date_of_joining',
      key: 'date_of_joining',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const payrollColumns = [
    {
      title: 'Period',
      dataIndex: 'period_name',
      key: 'period_name',
      render: (name: string) => (
        <span style={{ fontWeight: 500 }}>{name}</span>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_: any, record: PayrollPeriod) => (
        <div style={{ fontSize: '14px' }}>
          <div>{new Date(record.period_start).toLocaleDateString()}</div>
          <div style={{ color: '#6b7280' }}>
            to {new Date(record.period_end).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (date: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined style={{ color: '#9ca3af' }} />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          paid: 'paid',
          approved: 'approved',
          processing: 'processing',
          draft: 'draft'
        };
        const statusClass = statusMap[status as keyof typeof statusMap] || 'draft';
        const icons = {
          paid: '✓',
          approved: '→',
          processing: '⟳',
          draft: '○'
        };

        return (
          <span className={`status-badge ${statusClass}`}>
            <span>{icons[statusClass as keyof typeof icons]}</span>
            <span>{status.replace('_', ' ').toUpperCase()}</span>
          </span>
        );
      },
    },
  ];

  if (loading) {
    return (
      <>
        <div className="dashboard-loading">
          <Spin size="large" />
          <Typography.Text className="dashboard-loading-text">
            Loading dashboard...
          </Typography.Text>
        </div>
      </>
    );
  }

  const statsData = [
    {
      title: 'Total Employees',
      value: employeeCount,
      icon: <UserOutlined />,
      color: '#1890ff',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Active Payrolls',
      value: recentPayrolls.filter(p => p.status === 'processing').length,
      icon: <CreditCardOutlined />,
      color: '#faad14',
      trend: { value: 5, isPositive: false },
    },
    {
      title: 'Monthly Expense',
      value: '₹12.5L',
      icon: <DollarOutlined />,
      color: '#52c41a',
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Upcoming Payments',
      value: 3,
      icon: <CalendarOutlined />,
      color: '#13c2c2',
    },
  ];

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <TitleComponent level={2}>Dashboard Overview</TitleComponent>
            <Typography.Text className="dashboard-header-subtitle">
              Welcome back! Here's what's happening with your organization.
            </Typography.Text>
          </div>
          <div className="dashboard-last-updated">
            <DashboardOutlined style={{ color: '#10b981' }} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats-grid">
          <Row className="dashboard-stats-row" gutter={0}>
            {statsData.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index} className="dashboard-stats-col">
                <div className="dashboard-stat-card">
                  <div className="dashboard-stat-content">
                    <div className="dashboard-stat-info">
                      <div className="dashboard-stat-title">{stat.title}</div>
                      <div className="dashboard-stat-value">{stat.value}</div>
                      {stat.trend && (
                        <div className={`dashboard-stat-trend ${stat.trend.isPositive ? 'positive' : 'negative'}`}>
                          {stat.trend.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                          {stat.trend.value}%
                        </div>
                      )}
                    </div>
                    <div className="dashboard-stat-icon" style={{ background: stat.color }}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Charts Section */}
        <div className="dashboard-charts-section">
          <Row className="dashboard-charts-row" gutter={0}>
            <Col xs={24} lg={12} className="dashboard-charts-col">
              <div className="dashboard-chart-card">
                <div className="dashboard-chart-header">
                  <div className="dashboard-chart-title">
                    <PieChartOutlined style={{ color: '#3b82f6' }} />
                    <span>Department Distribution</span>
                  </div>
                </div>
                <div className="dashboard-chart-content">
                  {Object.keys(departmentData).length > 0 ? (
                    <Pie
                      data={departmentData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom' as const,
                            labels: {
                              padding: 20,
                              usePointStyle: true,
                            }
                          },
                        },
                      }}
                    />
                  ) : (
                    <Empty description="No department data available" />
                  )}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12} className="dashboard-charts-col">
              <div className="dashboard-chart-card">
                <div className="dashboard-chart-header">
                  <div className="dashboard-chart-title">
                    <RiseOutlined style={{ color: '#10b981' }} />
                    <span>Salary Distribution</span>
                  </div>
                </div>
                <div className="dashboard-chart-content">
                  {Object.keys(salaryData).length > 0 ? (
                    <Bar
                      data={salaryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.05)',
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <Empty description="No salary data available" />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Tables Section */}
       <div className="dashboard-tables-section">
  <Row className="dashboard-tables-row" gutter={0}>
    {/* Recent Employees Table - always on top */}
    <Col xs={24} className="dashboard-tables-col">
      <div className="dashboard-table-card">
        <div className="dashboard-table-header">
          <div className="dashboard-table-title">
            <UserOutlined style={{ color: '#3b82f6' }} />
            <span>Recent Employees</span>
          </div>
          <Typography.Text className="dashboard-table-count">
            {recentEmployees.length} employees
          </Typography.Text>
        </div>
        <div className="dashboard-table-content">
          <Table
            className="dashboard-table"
            dataSource={recentEmployees}
            columns={employeeColumns}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </Col>

    {/* Recent Payrolls Table - always below */}
    <Col xs={24} className="dashboard-tables-col">
      <div className="dashboard-table-card">
        <div className="dashboard-table-header">
          <div className="dashboard-table-title">
            <CreditCardOutlined style={{ color: '#10b981' }} />
            <span>Recent Payrolls</span>
          </div>
          <Typography.Text className="dashboard-table-count">
            {recentPayrolls.length} periods
          </Typography.Text>
        </div>
        <div className="dashboard-table-content">
          <Table
            className="dashboard-table"
            dataSource={recentPayrolls}
            columns={payrollColumns}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </Col>
  </Row>
</div>

      </div>
    </>
  );
};

export default DashboardPage;
