import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Key } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Typography, 
  Card, 
  Steps, 
  Modal, 
  Form, 
  DatePicker, 
  Input, 
  Select, 
  message,
  Popconfirm,
  Tag,
  Divider,
  Statistic,
  Row,
  Col,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { fetchPayrollPeriods, fetchPayslips } from '../lib/supabase-client';
import { Database } from '../types/database.types';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;
const { RangePicker } = DatePicker;

type PayrollPeriod = Database['public']['Tables']['payroll_periods']['Row'];
type Payslip = Database['public']['Tables']['payslips']['Row'];

const PayrollPage: React.FC = () => {
  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [payrollModalVisible, setPayrollModalVisible] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PayrollPeriod | null>(null);
  const [payrollForm] = Form.useForm();

  useEffect(() => {
    loadPayrollPeriods();
  }, []);

  const loadPayrollPeriods = async () => {
    setLoading(true);
    try {
      const { data, error } = await fetchPayrollPeriods();
      if (error) throw error;
      setPayrollPeriods(data || []);
    } catch (error) {
      console.error('Error loading payroll periods:', error);
      message.error('Failed to load payroll periods');
    } finally {
      setLoading(false);
    }
  };

  const loadPayslips = async (periodId: string) => {
    try {
      const { data, error } = await fetchPayslips(periodId);
      if (error) throw error;
      setPayslips(data || []);
    } catch (error) {
      console.error('Error loading payslips:', error);
      message.error('Failed to load payslips');
    }
  };

  const showAddPayrollModal = () => {
    payrollForm.resetFields();
    setPayrollModalVisible(true);
  };

  const handlePayrollCancel = () => {
    setPayrollModalVisible(false);
  };

  const handlePayrollSubmit = async () => {
    try {
      const values = await payrollForm.validateFields();
      
      // In a real app, you would call an API to create the payroll period
      message.success('Payroll period created successfully');
      
      setPayrollModalVisible(false);
      loadPayrollPeriods();
    } catch (error) {
      console.error('Error creating payroll period:', error);
      message.error('Failed to create payroll period');
    }
  };

  const handleViewPayslips = (period: PayrollPeriod) => {
    setSelectedPeriod(period);
    loadPayslips(period.id);
  };

  const handleRunPayroll = (period: PayrollPeriod) => {
    // In a real app, you would call an API to run the payroll
    message.success('Payroll processing started');
  };

  const handleApprovePayroll = (period: PayrollPeriod) => {
    // In a real app, you would call an API to approve the payroll
    message.success('Payroll approved successfully');
  };

  const handlePayPayroll = (period: PayrollPeriod) => {
    // In a real app, you would call an API to mark the payroll as paid
    message.success('Payroll marked as paid');
  };

  const getStepStatus = (period: PayrollPeriod, step: number) => {
    const statusMap = {
      'draft': 0,
      'processing': 1,
      'approved': 2,
      'paid': 3
    };
    
    const currentStep = statusMap[period.status];
    
    if (step < currentStep) return 'finish';
    if (step === currentStep) return 'process';
    return 'wait';
  };

const payrollColumns: ColumnsType<PayrollPeriod> = [
  {
    title: 'Period',
    dataIndex: 'period_name',
    key: 'period_name',
    sorter: (a, b) => a.period_name.localeCompare(b.period_name),
  },
  {
    title: 'Start Date',
    dataIndex: 'period_start',
    key: 'period_start',
    render: (_, record) => new Date(record.period_start).toLocaleDateString(),
  },
  {
    title: 'End Date',
    dataIndex: 'period_end',
    key: 'period_end',
    render: (_, record) => new Date(record.period_end).toLocaleDateString(),
  },
  {
    title: 'Payment Date',
    dataIndex: 'payment_date',
    key: 'payment_date',
    render: (_, record) => new Date(record.payment_date).toLocaleDateString(),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = 'default';
      if (status === 'processing') color = 'blue';
      else if (status === 'approved') color = 'green';
      else if (status === 'paid') color = 'purple';

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
    filters: [
      { text: 'Draft', value: 'draft' },
      { text: 'Processing', value: 'processing' },
      { text: 'Approved', value: 'approved' },
      { text: 'Paid', value: 'paid' },
    ],
    onFilter: (value: boolean | Key, record) => record.status === value.toString(),
  },
  {
    title: 'Progress',
    key: 'progress',
    render: (_, record) => (
      <Steps size="small" current={
        record.status === 'draft' ? 0 :
        record.status === 'processing' ? 1 :
        record.status === 'approved' ? 2 : 3
      }>
        <Step title="Draft" status={getStepStatus(record, 0)} />
        <Step title="Processing" status={getStepStatus(record, 1)} />
        <Step title="Approved" status={getStepStatus(record, 2)} />
        <Step title="Paid" status={getStepStatus(record, 3)} />
      </Steps>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="small">
        <Button 
          type="primary" 
          size="small" 
          onClick={() => handleViewPayslips(record)}
        >
          View Payslips
        </Button>

        {record.status === 'draft' && (
          <Button 
            type="default" 
            size="small" 
            onClick={() => handleRunPayroll(record)}
          >
            Run Payroll
          </Button>
        )}

        {record.status === 'processing' && (
          <Button 
            type="default" 
            size="small" 
            onClick={() => handleApprovePayroll(record)}
          >
            Approve
          </Button>
        )}

        {record.status === 'approved' && (
          <Button 
            type="default" 
            size="small" 
            onClick={() => handlePayPayroll(record)}
          >
            Mark as Paid
          </Button>
        )}

        {record.status === 'draft' && (
          <Popconfirm
            title="Are you sure you want to delete this payroll period?"
            onConfirm={() => message.success('Payroll period deleted')}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              size="small"
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        )}
      </Space>
    ),
  },
];

  const payslipColumns = [
    {
      title: 'Employee',
      key: 'employee',
      render: (text: string, record: any) => 
        `${record.employees?.first_name || ''} ${record.employees?.last_name || ''}`,
    },
    {
      title: 'Employee ID',
      render: (text: string, record: any) => record.employees?.employee_id || '',
    },
    {
      title: 'Base Salary',
      dataIndex: 'base_salary',
      key: 'base_salary',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Gross Earnings',
      dataIndex: 'gross_earnings',
      key: 'gross_earnings',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Deductions',
      dataIndex: 'total_deductions',
      key: 'total_deductions',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Net Salary',
      dataIndex: 'net_salary',
      key: 'net_salary',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status: string) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Payslip) => (
        <Space size="small">
          <Tooltip title="Download PDF">
            <Button 
              type="text" 
              icon={<FilePdfOutlined />} 
              onClick={() => message.success('Downloading PDF...')} 
            />
          </Tooltip>
          <Tooltip title="Send Email">
            <Button 
              type="text" 
              icon={<MailOutlined />} 
              onClick={() => message.success('Email sent!')} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Payroll Management</Title>
      
      <div style={{ marginBottom: 24 }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Total Payroll Periods" 
                value={payrollPeriods.length} 
                prefix={<CalendarOutlined />} 
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Pending Payments" 
                value={payrollPeriods.filter(p => p.status === 'approved').length} 
                prefix={<DollarOutlined />} 
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title="Completed Payments" 
                value={payrollPeriods.filter(p => p.status === 'paid').length} 
                prefix={<CheckCircleOutlined />} 
                valueStyle={{ color: '#3f8600' }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Payroll Periods</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddPayrollModal}
        >
          Create Payroll Period
        </Button>
      </div>
      
      <Table 
        columns={payrollColumns} 
        dataSource={payrollPeriods} 
        rowKey="id"
        loading={loading}
      />
      
      {selectedPeriod && (
        <>
          <Divider />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Title level={4}>
              Payslips for {selectedPeriod.period_name}
            </Title>
            <Space>
              <Button 
                icon={<FileExcelOutlined />}
                onClick={() => message.success('Exporting to Excel...')}
              >
                Export to Excel
              </Button>
              <Button 
                icon={<MailOutlined />}
                onClick={() => message.success('Sending emails...')}
              >
                Email All Payslips
              </Button>
            </Space>
          </div>
          
          <Table 
            columns={payslipColumns} 
            dataSource={payslips} 
            rowKey="id"
            loading={loading}
          />
        </>
      )}

      {/* Create Payroll Period Modal */}
      <Modal
        title="Create Payroll Period"
        open={payrollModalVisible}
        onOk={handlePayrollSubmit}
        onCancel={handlePayrollCancel}
        width={600}
      >
        <Form
          form={payrollForm}
          layout="vertical"
        >
          <Form.Item
            name="period_name"
            label="Period Name"
            rules={[{ required: true, message: 'Please enter period name' }]}
          >
            <Input placeholder="e.g., July 2023" />
          </Form.Item>

          <Form.Item
            name="date_range"
            label="Period Date Range"
            rules={[{ required: true, message: 'Please select date range' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="payment_date"
            label="Payment Date"
            rules={[{ required: true, message: 'Please select payment date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PayrollPage;