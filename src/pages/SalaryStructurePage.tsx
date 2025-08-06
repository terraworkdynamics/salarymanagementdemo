import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Card,
  Tabs,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  message,
  Popconfirm,
  Tag,
  Divider
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BankOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import { fetchSalaryStructures, fetchSalaryComponents } from '../lib/supabase-client';
import { Database } from '../types/database.types';

import './SalaryStructurePage.css'; // custom styles here!

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

type SalaryStructure = Database['public']['Tables']['salary_structures']['Row'];
type SalaryComponent = Database['public']['Tables']['salary_components']['Row'];

const SalaryStructurePage: React.FC = () => {
  const [structures, setStructures] = useState<SalaryStructure[]>([]);
  const [components, setComponents] = useState<SalaryComponent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [structureModalVisible, setStructureModalVisible] = useState<boolean>(false);
  const [componentModalVisible, setComponentModalVisible] = useState<boolean>(false);
  const [editingStructure, setEditingStructure] = useState<SalaryStructure | null>(null);
  const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
  const [structureForm] = Form.useForm();
  const [componentForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState<string>('1');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load salary structures
      const { data: structuresData, error: structuresError } = await fetchSalaryStructures();
      if (structuresError) throw structuresError;
      setStructures(structuresData || []);

      // Load salary components
      const { data: componentsData, error: componentsError } = await fetchSalaryComponents();
      if (componentsError) throw componentsError;
      setComponents(componentsData || []);
    } catch (error) {
      console.error('Error loading salary data:', error);
      message.error('Failed to load salary data');
    } finally {
      setLoading(false);
    }
  };

  // Structure Modal Handlers
  const showAddStructureModal = () => {
    setEditingStructure(null);
    structureForm.resetFields();
    setStructureModalVisible(true);
  };

  const showEditStructureModal = (structure: SalaryStructure) => {
    setEditingStructure(structure);
    structureForm.setFieldsValue(structure);
    setStructureModalVisible(true);
  };

  const handleStructureCancel = () => {
    setStructureModalVisible(false);
  };

  const handleStructureSubmit = async () => {
    try {
      const values = await structureForm.validateFields();

      if (editingStructure) {
        // Update existing structure (mock)
        // Call your API here
        message.success('Salary structure updated successfully');
      } else {
        // Create new structure (mock)
        // Call your API here
        message.success('Salary structure added successfully');
      }

      setStructureModalVisible(false);
      loadData();
    } catch (error) {
      console.error('Error saving salary structure:', error);
      message.error('Failed to save salary structure');
    }
  };

  // Component Modal Handlers
  const showAddComponentModal = () => {
    setEditingComponent(null);
    componentForm.resetFields();
    setComponentModalVisible(true);
  };

  const showEditComponentModal = (component: SalaryComponent) => {
    setEditingComponent(component);
    componentForm.setFieldsValue(component);
    setComponentModalVisible(true);
  };

  const handleComponentCancel = () => {
    setComponentModalVisible(false);
  };

  const handleComponentSubmit = async () => {
    try {
      const values = await componentForm.validateFields();

      if (editingComponent) {
        // Update existing component (mock)
        // Call your API here
        message.success('Salary component updated successfully');
      } else {
        // Create new component (mock)
        // Call your API here
        message.success('Salary component added successfully');
      }

      setComponentModalVisible(false);
      loadData();
    } catch (error) {
      console.error('Error saving salary component:', error);
      message.error('Failed to save salary component');
    }
  };

  // Structure Table Columns
  const structureColumns: ColumnsType<SalaryStructure> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || '-',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_, record) => (
        <Tag color={record.is_active ? 'green' : 'red'}>
          {record.is_active ? 'Active' : 'Inactive'}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value: boolean | Key, record) => record.is_active === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => showEditStructureModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this structure?"
            onConfirm={() => message.success('Structure deleted')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const componentColumns: ColumnsType<SalaryComponent> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'component_type',
      key: 'component_type',
      render: (type) => (
        <Tag color={type === 'earning' ? 'green' : 'red'}>
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Earning', value: 'earning' },
        { text: 'Deduction', value: 'deduction' },
      ],
      onFilter: (value: boolean | Key, record) => record.component_type === value.toString(),
    },
    {
      title: 'Calculation',
      key: 'calculation',
      render: (_, record) => (
        <span>
          {record.calculation_type === 'fixed'
            ? `Fixed: ${record.calculation_value}`
            : `${record.calculation_value}% of ${record.calculation_basis || 'Base'}`}
        </span>
      ),
    },
    {
      title: 'Taxable',
      dataIndex: 'taxable',
      key: 'taxable',
      render: (taxable) => (
        <Tag color={taxable ? 'blue' : 'default'}>
          {taxable ? 'Taxable' : 'Non-Taxable'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => showEditComponentModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this component?"
            onConfirm={() => message.success('Component deleted')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="salary-structure-page-main">
      <Title level={2}>Salary Structure Management</Title>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Salary Structures" key="1">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddStructureModal}
            >
              Add Structure
            </Button>
          </div>

          <Table
            columns={structureColumns}
            dataSource={structures}
            rowKey="id"
            loading={loading && activeTab === '1'}
          />
        </TabPane>

        <TabPane tab="Salary Components" key="2">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddComponentModal}
            >
              Add Component
            </Button>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Card>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <Title level={5} style={{ color: 'green' }}>
                    <PlusCircleOutlined /> Earnings
                  </Title>
                  <ul>
                    {components
                      .filter(c => c.component_type === 'earning' && c.is_active)
                      .map(c => (
                        <li key={c.id}>{c.name}</li>
                      ))
                    }
                  </ul>
                </div>
                <Divider type="vertical" style={{ height: 'auto' }} />
                <div>
                  <Title level={5} style={{ color: 'red' }}>
                    <MinusCircleOutlined /> Deductions
                  </Title>
                  <ul>
                    {components
                      .filter(c => c.component_type === 'deduction' && c.is_active)
                      .map(c => (
                        <li key={c.id}>{c.name}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <Table
            columns={componentColumns}
            dataSource={components}
            rowKey="id"
            loading={loading && activeTab === '2'}
          />
        </TabPane>
      </Tabs>

      {/* Structure Modal */}
      <Modal
        title={editingStructure ? 'Edit Salary Structure' : 'Add Salary Structure'}
        open={structureModalVisible}
        onOk={handleStructureSubmit}
        onCancel={handleStructureCancel}
        width={600}
      >
        <Form
          form={structureForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Structure Name"
            rules={[{ required: true, message: 'Please enter structure name' }]}
          >
            <Input prefix={<BankOutlined />} placeholder="Standard Salary Structure" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={4} placeholder="Description of the salary structure" />
          </Form.Item>

          <Form.Item
            name="is_active"
            label="Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Component Modal */}
      <Modal
        title={editingComponent ? 'Edit Salary Component' : 'Add Salary Component'}
        open={componentModalVisible}
        onOk={handleComponentSubmit}
        onCancel={handleComponentCancel}
        width={600}
      >
        <Form
          form={componentForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Component Name"
            rules={[{ required: true, message: 'Please enter component name' }]}
          >
            <Input placeholder="Basic Salary" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={2} placeholder="Description of the component" />
          </Form.Item>

          <Form.Item
            name="component_type"
            label="Component Type"
            rules={[{ required: true, message: 'Please select component type' }]}
          >
            <Select placeholder="Select type">
              <Option value="earning">Earning</Option>
              <Option value="deduction">Deduction</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="calculation_type"
            label="Calculation Type"
            rules={[{ required: true, message: 'Please select calculation type' }]}
          >
            <Select placeholder="Select calculation type">
              <Option value="fixed">Fixed Amount</Option>
              <Option value="percentage">Percentage</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="calculation_value"
            label="Value"
            rules={[{ required: true, message: 'Please enter value' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Amount or percentage" />
          </Form.Item>

          <Form.Item
            name="calculation_basis"
            label="Calculation Basis (for percentage)"
          >
            <Input placeholder="e.g., Basic Salary" />
          </Form.Item>

          <Form.Item
            name="taxable"
            label="Taxable"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="is_active"
            label="Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalaryStructurePage;
