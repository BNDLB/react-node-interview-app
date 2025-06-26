import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCard from '../../components/ItemCard';

describe('ItemCard', () => {
  const mockItem = {
    id: '1',
    name: 'Test Item',
    description: 'Test description for item',
    category: 'Test Category',
    price: 99.99,
    inStock: true,
    tags: ['test', 'sample', 'mock']
  };

  test('renders item details correctly', () => {
    render(<ItemCard item={mockItem} />);
    
    // Check if the name is rendered
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('Test description for item')).toBeInTheDocument();
    
    // Check if the price is rendered with correct format
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    // Check if the category is rendered
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    
    // Check if the stock status is rendered
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    
    // Check if the tags are rendered
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('sample')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
  });

  test('renders out of stock status correctly', () => {
    const outOfStockItem = {
      ...mockItem,
      inStock: false
    };
    
    render(<ItemCard item={outOfStockItem} />);
    
    // Check if the out of stock status is rendered
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    
    // Check that the out of stock class is applied
    const stockElement = screen.getByText('Out of Stock');
    expect(stockElement).toHaveClass('out-of-stock');
    expect(stockElement).not.toHaveClass('in-stock');
  });

  test('formats price with two decimal places', () => {
    const itemWithUnformattedPrice = {
      ...mockItem,
      price: 10
    };
    
    render(<ItemCard item={itemWithUnformattedPrice} />);
    
    // Price should be formatted with two decimal places
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });
});
