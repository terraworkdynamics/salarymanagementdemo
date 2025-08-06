import React, { useState, useEffect, useRef } from 'react';
import { Input, Dropdown, List, Avatar, Tag, Spin, Button } from 'antd';
import { SearchOutlined, UserOutlined, DollarOutlined, FileTextOutlined, CreditCardOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { searchService, SearchResult } from '../../services/searchService';
import './SearchBar.css';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  placeholder = "Search employees, payrolls, salary structures..." 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        const results = searchService.search(searchQuery);
        const searchSuggestions = searchService.getSearchSuggestions(searchQuery);
        
        setSearchResults(results);
        setSuggestions(searchSuggestions);
        setIsLoading(false);
        setIsDropdownVisible(true);
      }, 300);
    } else {
      setSearchResults([]);
      setSuggestions([]);
      setIsDropdownVisible(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleResultClick = (result: SearchResult) => {
    setIsDropdownVisible(false);
    setSearchQuery('');
    
    // Navigate based on result type
    switch (result.type) {
      case 'employee':
        navigate(`/employees?search=${encodeURIComponent(result.data.employee_id)}`);
        break;
      case 'salary_structure':
        navigate(`/salary-structure?search=${encodeURIComponent(result.data.name)}`);
        break;
      case 'salary_component':
        navigate(`/salary-structure?component=${encodeURIComponent(result.data.name)}`);
        break;
      case 'payroll_period':
        navigate(`/payroll?period=${encodeURIComponent(result.data.id)}`);
        break;
      case 'payslip':
        navigate(`/payroll?payslip=${encodeURIComponent(result.data.id)}`);
        break;
      default:
        navigate('/dashboard');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    const results = searchService.search(suggestion);
    setSearchResults(results);
    setIsDropdownVisible(true);
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

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="search-loading">
          <Spin size="small" />
          <span>Searching...</span>
        </div>
      );
    }

    if (searchResults.length === 0 && searchQuery.trim()) {
      return (
        <div className="search-no-results">
          <SearchOutlined />
          <span>No results found for "{searchQuery}"</span>
        </div>
      );
    }

    return (
      <div className="search-results-container">
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            <div className="search-section-title">Suggestions</div>
            <List
              size="small"
              dataSource={suggestions}
              renderItem={(suggestion) => (
                <List.Item
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SearchOutlined />
                  <span>{suggestion}</span>
                </List.Item>
              )}
            />
          </div>
        )}

                {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <div className="search-section-title">
              Results ({searchResults.length})
            </div>
            <List
              size="small"
              dataSource={searchResults.slice(0, 5)} // Show only first 5 results
              renderItem={(result) => (
                <List.Item
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="search-result-content">
                    <div className="search-result-icon">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="search-result-details">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-subtitle">{result.subtitle}</div>
                      <div className="search-result-description">{result.description}</div>
                    </div>
                    <div className="search-result-meta">
                      <Tag color={getTypeColor(result.type)}>
                        {getTypeLabel(result.type)}
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            {searchResults.length > 5 && (
              <div className="search-view-all">
                <Button 
                  type="link" 
                  onClick={() => {
                    setIsDropdownVisible(false);
                    setSearchQuery('');
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  View all {searchResults.length} results
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const dropdownOverlay = (
    <div className="search-dropdown">
      {renderSearchResults()}
    </div>
  );

  return (
    <div className={`search-bar-container ${className}`}>
      <Dropdown
        overlay={dropdownOverlay}
        trigger={['click']}
        open={isDropdownVisible}
        onOpenChange={setIsDropdownVisible}
        placement="bottomLeft"
        overlayClassName="search-dropdown-overlay"
      >
        <Input
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined className="search-icon" />}
          allowClear
          onFocus={() => {
            if (searchQuery.trim()) {
              setIsDropdownVisible(true);
            }
          }}
          onBlur={() => {
            // Delay hiding dropdown to allow clicks on results
            setTimeout(() => setIsDropdownVisible(false), 200);
          }}
        />
      </Dropdown>
    </div>
  );
};

export default SearchBar; 