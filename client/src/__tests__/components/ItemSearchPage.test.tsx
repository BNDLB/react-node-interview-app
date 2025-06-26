import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemSearchPage from '../../components/ItemSearchPage';
import * as itemsApiModule from '../../services/ItemsApiService';

// Mock the API service
jest.mock('../../services/ItemsApiService');

describe('ItemSearchPage', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Test Item 1',
      description: 'Test description 1',
      category: 'Test Category',
      price: 10.99,
      inStock: true,
      tags: ['test', 'item']
    },
    {
      id: '2',
      name: 'Test Item 2',
      description: 'Test description 2',
      category: 'Another Category',
      price: 20.99,
      inStock: false,
      tags: ['test', 'another']
    }
  ];

  beforeEach(() => {
    // Mock the getItems function to return our test data
    jest.spyOn(itemsApiModule, 'getItems').mockResolvedValue(mockItems);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search page with title', async () => {
    render(<ItemSearchPage />);
    
    // Check if the title is rendered
    expect(screen.getByText('Item Search')).toBeInTheDocument();
    
    // Wait for items to load
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    });
  });

  test('filters items when search term is entered', async () => {
    const user = userEvent.setup();
    render(<ItemSearchPage />);
    
    // Wait for items to load
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    });
    
    // Type in search input
    const searchInput = screen.getByPlaceholderText(/search items/i);
    await user.type(searchInput, 'Test Item 1');
    
    // Check if API was called with the correct parameters
    await waitFor(() => {
      expect(itemsApiModule.getItems).toHaveBeenCalledWith('Test Item 1', '');
    });
  });

  test('filters items when category is selected', async () => {
    const user = userEvent.setup();
    render(<ItemSearchPage />);
    
    // Wait for items to load
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    });
    
    // Select a category
    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'Test Category');
    
    // Check if API was called with the correct parameters
    await waitFor(() => {
      expect(itemsApiModule.getItems).toHaveBeenCalledWith('', 'Test Category');
    });
  });
});
