import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Key } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Popconfirm,
  Tag
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';

import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../lib/supabase-client';
import { Database } from '../types/database.types';

import './EmployeesPage.css';

const { Title } = Typography;
const { Option } = Select;

type Employee = Database['public']['Tables']['employees']['Row'];

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {   
      const { data, error } = await fetchEmployees();
      if (error) {
        throw error;
      }
      setEmployees(data || []);
    } catch (error) {
      console.error('Error loading employees:', error);
      message.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setEditingEmployee(null);
    form.resetFields();
    setModalVisible(true);
  };

  const showEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      ...employee,
      date_of_birth: employee.date_of_birth ? employee.date_of_birth : undefined,
      date_of_joining: employee.date_of_joining,
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Handle conversion for date if using Dayjs or Moment
      if (values.date_of_joining && typeof values.date_of_joining !== 'string') {
        values.date_of_joining = values.date_of_joining.format('YYYY-MM-DD');
      }
      if (editingEmployee) {
        // Update
        const { error } = await updateEmployee(editingEmployee.id, values);
        if (error) throw error;
        message.success('Employee updated successfully');
      } else {
        // Create
        const { error } = await createEmployee(values);
        if (error) throw error;
        message.success('Employee added successfully');
      }
      setModalVisible(false);
      loadEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      message.error('Failed to save employee');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await deleteEmployee(id);
      if (error) throw error;
      message.success('Employee deleted successfully');
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      message.error('Failed to delete employee');
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Employee> = [
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
      sorter: (a, b) => a.employee_id.localeCompare(b.employee_id),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
      sorter: (a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: Array.from(new Set(employees.map(e => e.department))).map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value: boolean | Key, record) => record.department === value.toString(),
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'inactive') color = 'volcano';
        else if (status === 'on_leave') color = 'geekblue';
        else if (status === 'terminated') color = 'red';

        return <Tag color={color}>{status.toUpperCase().replace('_', ' ')}</Tag>;
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'On Leave', value: 'on_leave' },
        { text: 'Terminated', value: 'terminated' },
      ],
      onFilter: (value: boolean | Key, record) => record.status === value.toString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="employees-page-container">
      <div className="employees-page-header">
        <Title level={2}>Employees</Title>
        <Space>
          <Input
            className="employee-search-input"
            placeholder="Search employees"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="employee-add-btn"
            onClick={showAddModal}
          >
            Add Employee
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredEmployees}
        rowKey="id"
        loading={loading}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="employee_id"
            label="Employee ID"
            rules={[{ required: true, message: 'Please enter employee ID' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="EMP001" />
          </Form.Item>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department">
              <Option value="Engineering">Engineering</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: true, message: 'Please enter designation' }]}
          >
            <Input placeholder="Software Engineer" />
          </Form.Item>
          <Form.Item
            name="date_of_joining"
            label="Date of Joining"
            rules={[{ required: true, message: 'Please select joining date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="on_leave">On Leave</Option>
              <Option value="terminated">Terminated</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesPage;
