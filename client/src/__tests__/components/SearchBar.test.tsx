import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  const mockProps = {
    searchTerm: '',
    onSearchChange: jest.fn(),
    categories: ['Web Development', 'Data Science', 'Design', 'Business'],
    selectedCategory: '',
    onCategoryChange: jest.fn(),
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    selectedLevel: '',
    onLevelChange: jest.fn(),
    instructorSearch: '',
    onInstructorSearchChange: jest.fn()
  };

  beforeEach(() => {
    // Reset mock functions before each test
    jest.clearAllMocks();
  });

  test('renders search input and category select', () => {
    render(<SearchBar {...mockProps} />);
    
    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText('Search courses...');
    expect(searchInput).toBeInTheDocument();
    
    // Check if the category select is rendered with options
    const categorySelect = screen.getByRole('combobox');
    expect(categorySelect).toBeInTheDocument();
    
    // Check if the "All Categories" option is rendered
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    
    // Check if all category options are rendered
    mockProps.categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
    
    // Check if advanced search button is rendered
    expect(screen.getByText(/Show Advanced Search/)).toBeInTheDocument();
  });

  test('calls onSearchChange when typing in search input', async () => {
    const user = userEvent.setup();
    render(<SearchBar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search courses...');
    await user.type(searchInput, 'test search');
    
    // Check if onSearchChange is called with correct value
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test search');
  });

  test('calls onCategoryChange when selecting a category', () => {
    render(<SearchBar {...mockProps} />);
    
    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    
    // Check if onCategoryChange is called with correct value
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('Electronics');
  });

  test('displays current searchTerm and selectedCategory values', () => {
    const props = {
      ...mockProps,
      searchTerm: 'laptop',
      selectedCategory: 'Electronics'
    };
    
    render(<SearchBar {...props} />);
    
    // Check if the search input shows the current searchTerm
    const searchInput = screen.getByPlaceholderText('Search items...') as HTMLInputElement;
    expect(searchInput.value).toBe('laptop');
    
    // Check if the category select shows the current selectedCategory
    const categorySelect = screen.getByRole('combobox') as HTMLSelectElement;
    expect(categorySelect.value).toBe('Electronics');
  });
});
