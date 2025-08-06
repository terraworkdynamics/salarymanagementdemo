import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, List, Tag, Button, Select, Input, Space, Typography, Empty, Spin } from 'antd';
import { 
  UserOutlined, 
  DollarOutlined, 
  FileTextOutlined, 
  CreditCardOutlined, 
  SettingOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { searchService, SearchResult } from '../services/searchService';
import './SearchResultsPage.css';

const { Title, Text } = Typography;
const { Option } = Select;

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    types: [] as string[],
    departments: [] as string[],
    status: [] as string[]
  });

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, filters]);

  const performSearch = () => {
    setIsLoading(true);
    const results = searchService.search(searchQuery, filters);
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ q: value });
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'employee':
        return <UserOutlined style={{ color: '#1890ff' }} />;
      case 'salary_structure':
        return <SettingOutlined style={{ color: '#52c41a' }} />;
      case 'salary_component':
        return <DollarOutlined style={{ color: '#faad14' }} />;
      case 'payroll_period':
        return <FileTextOutlined style={{ color: '#722ed1' }} />;
      case 'payslip':
        return <CreditCardOutlined style={{ color: '#eb2f96' }} />;
      default:
        return <SearchOutlined />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employee':
        return 'blue';
      case 'salary_structure':
        return 'green';
      case 'salary_component':
        return 'orange';
      case 'payroll_period':
        return 'purple';
      case 'payslip':
        return 'magenta';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'employee':
        return 'Employee';
      case 'salary_structure':
        return 'Salary Structure';
      case 'salary_component':
        return 'Salary Component';
      case 'payroll_period':
        return 'Payroll Period';
      case 'payslip':
        return 'Payslip';
      default:
        return type;
    }
  };

  const getQuickStats = () => {
    const stats = searchService.getQuickStats();
    return stats;
  };

  const renderSearchFilters = () => (
    <Card className="search-filters-card">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div className="filter-section">
          <Text strong>Search Type</Text>
          <Select
            mode="multiple"
            placeholder="Select types to filter"
            value={filters.types}
            onChange={(values) => handleFilterChange('types', values)}
            style={{ width: '100%' }}
          >
            <Option value="employee">Employees</Option>
            <Option value="salary_structure">Salary Structures</Option>
            <Option value="salary_component">Salary Components</Option>
            <Option value="payroll_period">Payroll Periods</Option>
            <Option value="payslip">Payslips</Option>
          </Select>
        </div>

        <div className="filter-section">
          <Text strong>Department</Text>
          <Select
            mode="multiple"
            placeholder="Select departments"
            value={filters.departments}
            onChange={(values) => handleFilterChange('departments', values)}
            style={{ width: '100%' }}
          >
            <Option value="Engineering">Engineering</Option>
            <Option value="HR">HR</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="Sales">Sales</Option>
          </Select>
        </div>

        <div className="filter-section">
          <Text strong>Status</Text>
          <Select
            mode="multiple"
            placeholder="Select status"
            value={filters.status}
            onChange={(values) => handleFilterChange('status', values)}
            style={{ width: '100%' }}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="on_leave">On Leave</Option>
            <Option value="terminated">Terminated</Option>
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="approved">Approved</Option>
          </Select>
        </div>
      </Space>
    </Card>
  );

  const renderSearchResults = () => (
    <Card className="search-results-card">
      <div className="search-results-header">
        <Title level={4}>
          Search Results for "{searchQuery}"
          {searchResults.length > 0 && (
            <Text type="secondary"> ({searchResults.length} results)</Text>
          )}
        </Title>
      </div>

      {isLoading ? (
        <div className="search-loading">
          <Spin size="large" />
          <Text>Searching...</Text>
        </div>
      ) : searchResults.length === 0 ? (
        <Empty
          description={
            <span>
              No results found for "<Text code>{searchQuery}</Text>"
            </span>
          }
        />
      ) : (
        <List
          dataSource={searchResults}
          renderItem={(result) => (
            <List.Item className="search-result-item">
              <Card className="result-card" size="small">
                <div className="result-content">
                  <div className="result-icon">
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="result-details">
                    <div className="result-title">{result.title}</div>
                    <div className="result-subtitle">{result.subtitle}</div>
                    <div className="result-description">{result.description}</div>
                    <div className="result-meta">
                      <Tag color={getTypeColor(result.type)}>
                        {getTypeLabel(result.type)}
                      </Tag>
                      <Text type="secondary">Relevance: {result.relevance}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Card>
  );

  const renderQuickStats = () => {
    const stats = getQuickStats();
    return (
      <Card className="quick-stats-card">
        <Title level={5}>System Overview</Title>
        <div className="stats-grid">
          <div className="stat-item">
            <Text strong>{stats.employees}</Text>
            <Text type="secondary">Total Employees</Text>
          </div>
          <div className="stat-item">
            <Text strong>{stats.activeEmployees}</Text>
            <Text type="secondary">Active Employees</Text>
          </div>
          <div className="stat-item">
            <Text strong>{stats.salaryStructures}</Text>
            <Text type="secondary">Salary Structures</Text>
          </div>
          <div className="stat-item">
            <Text strong>{stats.salaryComponents}</Text>
            <Text type="secondary">Salary Components</Text>
          </div>
          <div className="stat-item">
            <Text strong>{stats.payrollPeriods}</Text>
            <Text type="secondary">Payroll Periods</Text>
          </div>
          <div className="stat-item">
            <Text strong>{stats.payslips}</Text>
            <Text type="secondary">Payslips</Text>
          </div>
        </div>
      </Card>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="search-results-page">
      <div className="search-header">
        <Title level={2}>
          <SearchOutlined /> Search Results
        </Title>
        <Input.Search
          placeholder="Search employees, payrolls, salary structures..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          size="large"
          style={{ maxWidth: 500 }}
        />
      </div>

      <div className="search-content">
        <div className="search-sidebar">
          {renderSearchFilters()}
          {renderQuickStats()}
        </div>
        <div className="search-main">
          {renderSearchResults()}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage; 