import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Spin, Empty } from 'antd';
import { 
  TeamOutlined, 
  BankOutlined, 
  CreditCardOutlined, 
  CalendarOutlined 
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
import { supabase } from '../lib/supabase-client';
import { Database } from '../types/database.types';

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
        // Fetch employee count
        const { count } = await supabase
          .from('employees')
          .select('*', { count: 'exact', head: true });
        
        setEmployeeCount(count || 0);

        // Fetch department distribution
        const { data: departmentDistribution } = await supabase
          .from('employees')
          .select('department');
        
        if (departmentDistribution) {
          const deptCounts: Record<string, number> = {};
          departmentDistribution.forEach(emp => {
            deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
          });
          
          setDepartmentData({
            labels: Object.keys(deptCounts),
            datasets: [
              {
                label: 'Employees by Department',
                data: Object.values(deptCounts),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          });
        }

        // Fetch salary distribution (mock data for now)
        // In a real app, you would fetch this from the database
        setSalaryData({
          labels: ['0-30K', '30K-50K', '50K-75K', '75K-100K', '100K+'],
          datasets: [
            {
              label: 'Salary Distribution',
              data: [5, 12, 18, 8, 3],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

        // Fetch recent payrolls
        const { data: payrolls } = await supabase
          .from('payroll_periods')
          .select('*')
          .order('period_end', { ascending: false })
          .limit(5);
        
        setRecentPayrolls(payrolls || []);

        // Fetch recent employees
        const { data: employees } = await supabase
          .from('employees')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setRecentEmployees(employees || []);
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
      render: (_: string, record: Employee) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
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
    },
  ];

  const payrollColumns = [
    {
      title: 'Period',
      dataIndex: 'period_name',
      key: 'period_name',
    },
    {
      title: 'Start Date',
      dataIndex: 'period_start',
      key: 'period_start',
    },
    {
      title: 'End Date',
      dataIndex: 'period_end',
      key: 'period_end',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ 
          textTransform: 'capitalize',
          color: status === 'paid' ? '#52c41a' : 
                 status === 'approved' ? '#1890ff' : 
                 status === 'processing' ? '#faad14' : '#f5222d'
        }}>
          {status.replace('_', ' ')}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <TitleComponent level={2}>Dashboard</TitleComponent>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={employeeCount}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Payrolls"
              value={recentPayrolls.filter(p => p.status === 'processing').length}
              prefix={<CreditCardOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Salary Structures"
              value={5} // Mock data
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Upcoming Payments"
              value={3} // Mock data
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Department Distribution">
            {Object.keys(departmentData).length > 0 ? (
              <Pie data={departmentData} />
            ) : (
              <Empty description="No department data available" />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Salary Distribution">
            {Object.keys(salaryData).length > 0 ? (
              <Bar 
                data={salaryData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            ) : (
              <Empty description="No salary data available" />
            )}
          </Card>
        </Col>
      </Row>
      
      {/* Tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Employees" style={{ marginBottom: '24px' }}>
            <Table 
              dataSource={recentEmployees} 
              columns={employeeColumns} 
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Payrolls" style={{ marginBottom: '24px' }}>
            <Table 
              dataSource={recentPayrolls} 
              columns={payrollColumns} 
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;