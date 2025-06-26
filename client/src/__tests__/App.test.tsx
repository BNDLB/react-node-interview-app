import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the ItemSearchPage component
jest.mock('../components/ItemSearchPage', () => {
  return function MockItemSearchPage() {
    return <div data-testid="mock-item-search-page">Mock Item Search Page</div>;
  };
});

describe('App', () => {
  test('renders header with title', () => {
    render(<App />);
    
    const headerElement = screen.getByText('Interview App - Item Search');
    expect(headerElement).toBeInTheDocument();
    
    const subtitleElement = screen.getByText('A simple React + Node.js application for technical interviews');
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders ItemSearchPage component', () => {
    render(<App />);
    
    const itemSearchPage = screen.getByTestId('mock-item-search-page');
    expect(itemSearchPage).toBeInTheDocument();
  });

  test('renders footer with correct text', () => {
    render(<App />);
    
    expect(screen.getByText('Built with React, TypeScript, and Node.js')).toBeInTheDocument();
    expect(screen.getByText('Interview task: Implement search functionality and connect to the Node.js API')).toBeInTheDocument();
  });
});
