import { renderHook, act, waitFor } from '@testing-library/react';
import { useItemSearch } from '../../hooks/useItemSearch';
import * as itemsApiModule from '../../services/ItemsApiService';

// Mock the API service
jest.mock('../../services/ItemsApiService');

describe('useItemSearch', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Test Item 1',
      description: 'Test description 1',
      category: 'Category A',
      price: 10.99,
      inStock: true,
      tags: ['test', 'item']
    },
    {
      id: '2',
      name: 'Test Item 2',
      description: 'Test description 2',
      category: 'Category B',
      price: 20.99,
      inStock: false,
      tags: ['test', 'another']
    },
    {
      id: '3',
      name: 'Another Item',
      description: 'Another description',
      category: 'Category A',
      price: 15.99,
      inStock: true,
      tags: ['test', 'different']
    }
  ];

  beforeEach(() => {
    // Mock the getItems function to return our test data
    jest.spyOn(itemsApiModule, 'getItems').mockResolvedValue(mockItems);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch items on mount', async () => {
    const { result } = renderHook(() => useItemSearch());
    
    // Initially, we should have an empty array and loading should be true
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(true);
    
    // Wait for the items to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual(mockItems);
    });
    
    // Verify API was called with empty parameters initially
    expect(itemsApiModule.getItems).toHaveBeenCalledWith('', '');
  });

  test('should update searchTerm and fetch items', async () => {
    const { result } = renderHook(() => useItemSearch());
    
    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Update search term
    act(() => {
      result.current.setSearchTerm('Test');
    });
    
    // Should trigger loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for the items to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Verify API was called with updated search term
    expect(itemsApiModule.getItems).toHaveBeenCalledWith('Test', '');
  });

  test('should update selectedCategory and fetch items', async () => {
    const { result } = renderHook(() => useItemSearch());
    
    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Update selected category
    act(() => {
      result.current.setSelectedCategory('Category A');
    });
    
    // Should trigger loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for the items to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Verify API was called with updated category
    expect(itemsApiModule.getItems).toHaveBeenCalledWith('', 'Category A');
  });

  test('should extract unique categories from items', async () => {
    const { result } = renderHook(() => useItemSearch());
    
    // Wait for the items to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check if categories are correctly extracted
    expect(result.current.categories).toContain('Category A');
    expect(result.current.categories).toContain('Category B');
    expect(result.current.categories.length).toBe(2); // Only unique categories
  });
});
