import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Button, 
  Space, 
  Typography, 
  Form, 
  Select, 
  DatePicker, 
  Table, 
  Divider,
  Row,
  Col,
  Statistic,
  Empty
} from 'antd';
import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  TeamOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const { Title: TitleComponent } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [reportData, setReportData] = useState<any>(null);
  const [payrollForm] = Form.useForm();
  const [employeeForm] = Form.useForm();
  const [taxForm] = Form.useForm();

  // Mock data for charts
  const departmentSalaryData = {
    labels: ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'],
    datasets: [
      {
        label: 'Average Salary',
        data: [85000, 65000, 75000, 60000, 70000, 55000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlySalaryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Salary Expense',
        data: [
          1250000, 1275000, 1300000, 1350000, 1400000, 1450000, 
          1500000, 1550000, 1600000, 1650000, 1700000, 1750000
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const salaryComponentData = {
    labels: ['Basic', 'HRA', 'Conveyance', 'Medical', 'Special Allowance', 'PF', 'Tax'],
    datasets: [
      {
        label: 'Salary Components',
        data: [50, 20, 5, 5, 10, 5, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock data for tables
  const payrollSummaryColumns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Total Employees',
      dataIndex: 'employees',
      key: 'employees',
    },
    {
      title: 'Gross Salary',
      dataIndex: 'gross',
      key: 'gross',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Total Deductions',
      dataIndex: 'deductions',
      key: 'deductions',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Net Salary',
      dataIndex: 'net',
      key: 'net',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
  ];

  const payrollSummaryData = [
    {
      key: '1',
      period: 'January 2023',
      employees: 120,
      gross: 12500000,
      deductions: 2500000,
      net: 10000000,
    },
    {
      key: '2',
      period: 'February 2023',
      employees: 122,
      gross: 12750000,
      deductions: 2550000,
      net: 10200000,
    },
    {
      key: '3',
      period: 'March 2023',
      employees: 125,
      gross: 13000000,
      deductions: 2600000,
      net: 10400000,
    },
  ];

  const handlePayrollReportGenerate = async () => {
    try {
      const values = await payrollForm.validateFields();
      setLoading(true);
      
      // In a real app, you would call an API to generate the report
      setTimeout(() => {
        setReportData({
          type: 'payroll',
          data: payrollSummaryData,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleEmployeeReportGenerate = async () => {
    try {
      const values = await employeeForm.validateFields();
      setLoading(true);
      
      // In a real app, you would call an API to generate the report
      setTimeout(() => {
        setReportData({
          type: 'employee',
          data: [],
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleTaxReportGenerate = async () => {
    try {
      const values = await taxForm.validateFields();
      setLoading(true);
      
      // In a real app, you would call an API to generate the report
      setTimeout(() => {
        setReportData({
          type: 'tax',
          data: [],
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div>
      <TitleComponent level={2}>Reports & Analytics</TitleComponent>
      
      <div style={{ marginBottom: 24 }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Total Employees" 
                value={125} 
                prefix={<TeamOutlined />} 
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Monthly Salary Expense" 
                value={1750000} 
                prefix={<DollarOutlined />} 
                formatter={value => `₹${value.toLocaleString()}`}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Average Salary" 
                value={14000} 
                prefix={<DollarOutlined />} 
                formatter={value => `₹${value.toLocaleString()}`}
              />
            </Col>
          </Row>
        </Card>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <BarChartOutlined />
              Payroll Reports
            </span>
          } 
          key="1"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="Generate Payroll Report">
                <Form
                  form={payrollForm}
                  layout="vertical"
                  onFinish={handlePayrollReportGenerate}
                >
                  <Form.Item
                    name="report_type"
                    label="Report Type"
                    rules={[{ required: true, message: 'Please select report type' }]}
                  >
                    <Select placeholder="Select report type">
                      <Option value="summary">Payroll Summary</Option>
                      <Option value="detailed">Detailed Payroll</Option>
                      <Option value="bank_transfer">Bank Transfer Statement</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="date_range"
                    label="Period"
                    rules={[{ required: true, message: 'Please select period' }]}
                  >
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                  
                  <Form.Item
                    name="department"
                    label="Department (Optional)"
                  >
                    <Select placeholder="Select department" allowClear>
                      <Option value="all">All Departments</Option>
                      <Option value="engineering">Engineering</Option>
                      <Option value="hr">HR</Option>
                      <Option value="finance">Finance</Option>
                      <Option value="marketing">Marketing</Option>
                      <Option value="sales">Sales</Option>
                      <Option value="operations">Operations</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      block
                    >
                      Generate Report
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={16}>
              <Card 
                title="Payroll Summary" 
                extra={
                  <Space>
                    <Button icon={<FileExcelOutlined />}>Excel</Button>
                    <Button icon={<FilePdfOutlined />}>PDF</Button>
                  </Space>
                }
              >
                {reportData && reportData.type === 'payroll' ? (
                  <Table 
                    columns={payrollSummaryColumns} 
                    dataSource={reportData.data} 
                    pagination={false}
                  />
                ) : (
                  <Empty description="Generate a report to view data" />
                )}
              </Card>
            </Col>
          </Row>
          
          <Divider />
          
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Monthly Salary Expense Trend">
                <Line 
                  data={monthlySalaryData} 
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
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Salary Distribution by Department">
                <Bar 
                  data={departmentSalaryData} 
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
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <TeamOutlined />
              Employee Reports
            </span>
          } 
          key="2"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="Generate Employee Report">
                <Form
                  form={employeeForm}
                  layout="vertical"
                  onFinish={handleEmployeeReportGenerate}
                >
                  <Form.Item
                    name="report_type"
                    label="Report Type"
                    rules={[{ required: true, message: 'Please select report type' }]}
                  >
                    <Select placeholder="Select report type">
                      <Option value="headcount">Headcount Report</Option>
                      <Option value="turnover">Turnover Report</Option>
                      <Option value="department">Department Report</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="date_range"
                    label="Period"
                    rules={[{ required: true, message: 'Please select period' }]}
                  >
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                  
                  <Form.Item
                    name="department"
                    label="Department (Optional)"
                  >
                    <Select placeholder="Select department" allowClear>
                      <Option value="all">All Departments</Option>
                      <Option value="engineering">Engineering</Option>
                      <Option value="hr">HR</Option>
                      <Option value="finance">Finance</Option>
                      <Option value="marketing">Marketing</Option>
                      <Option value="sales">Sales</Option>
                      <Option value="operations">Operations</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      block
                    >
                      Generate Report
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={16}>
              <Card 
                title="Employee Report" 
                extra={
                  <Space>
                    <Button icon={<FileExcelOutlined />}>Excel</Button>
                    <Button icon={<FilePdfOutlined />}>PDF</Button>
                  </Space>
                }
              >
                {reportData && reportData.type === 'employee' ? (
                  <div>Employee report data will be displayed here</div>
                ) : (
                  <Empty description="Generate a report to view data" />
                )}
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <PieChartOutlined />
              Salary Analysis
            </span>
          } 
          key="3"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Salary Components Distribution">
                <Pie 
                  data={salaryComponentData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right' as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                />
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Department-wise Salary Distribution">
                <Bar 
                  data={departmentSalaryData} 
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
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <LineChartOutlined />
              Tax Reports
            </span>
          } 
          key="4"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="Generate Tax Report">
                <Form
                  form={taxForm}
                  layout="vertical"
                  onFinish={handleTaxReportGenerate}
                >
                  <Form.Item
                    name="report_type"
                    label="Report Type"
                    rules={[{ required: true, message: 'Please select report type' }]}
                  >
                    <Select placeholder="Select report type">
                      <Option value="tds">TDS Report</Option>
                      <Option value="form16">Form 16</Option>
                      <Option value="tax_projection">Tax Projection</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="financial_year"
                    label="Financial Year"
                    rules={[{ required: true, message: 'Please select financial year' }]}
                  >
                    <Select placeholder="Select financial year">
                      <Option value="2023-2024">2023-2024</Option>
                      <Option value="2022-2023">2022-2023</Option>
                      <Option value="2021-2022">2021-2022</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="employee"
                    label="Employee (Optional)"
                  >
                    <Select placeholder="Select employee" allowClear>
                      <Option value="all">All Employees</Option>
                      <Option value="emp001">John Doe</Option>
                      <Option value="emp002">Jane Smith</Option>
                      <Option value="emp003">Robert Johnson</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      block
                    >
                      Generate Report
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={16}>
              <Card 
                title="Tax Report" 
                extra={
                  <Space>
                    <Button icon={<FileExcelOutlined />}>Excel</Button>
                    <Button icon={<FilePdfOutlined />}>PDF</Button>
                  </Space>
                }
              >
                {reportData && reportData.type === 'tax' ? (
                  <div>Tax report data will be displayed here</div>
                ) : (
                  <Empty description="Generate a report to view data" />
                )}
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportsPage;