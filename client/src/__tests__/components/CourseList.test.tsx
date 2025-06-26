import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from '../../components/ItemList';

// Mock the ItemCard component
jest.mock('../../components/ItemCard', () => {
  return function MockItemCard({ item }) {
    return <div data-testid={`item-card-${item.id}`}>{item.name}</div>;
  };
});

describe('CourseList', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development',
      category: 'Web Development',
      price: 10.99,
      available: true,
      instructor: 'Dr. Sarah Johnson',
      duration: '8 weeks',
      level: 'Beginner',
      tags: ['html', 'css', 'javascript'],
      enrollmentCount: 3452,
      rating: 4.7
    },
    {
      id: '2',
      name: 'Advanced Data Science',
      description: 'Master data analysis techniques',
      category: 'Data Science',
      price: 20.99,
      available: false,
      instructor: 'Prof. Michael Chen',
      duration: '10 weeks',
      level: 'Advanced',
      tags: ['python', 'machine learning', 'statistics'],
      enrollmentCount: 1250,
      rating: 4.9
    }
  ];

  test('renders loading state when loading is true', () => {
    render(<CourseList items={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
    expect(screen.queryByTestId('item-card-1')).not.toBeInTheDocument();
  });

  test('renders error state when error is present', () => {
    const errorMessage = 'Failed to load courses';
    render(<CourseList items={[]} loading={false} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId('item-card-1')).not.toBeInTheDocument();
  });

  test('renders empty state when no items are found', () => {
    render(<CourseList items={[]} loading={false} error={null} />);
    expect(screen.getByText('No courses found. Try another search.')).toBeInTheDocument();
    expect(screen.queryByTestId('item-card-1')).not.toBeInTheDocument();
  });

  test('renders courses when they are available', () => {
    render(<CourseList items={mockItems} loading={false} error={null} />);
    expect(screen.getByTestId('item-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-card-2')).toBeInTheDocument();
    expect(screen.queryByText('Loading courses...')).not.toBeInTheDocument();
    expect(screen.queryByText('No courses found. Try another search.')).not.toBeInTheDocument();
  });

  test('renders the correct number of ItemCards', () => {
    render(<CourseList items={mockItems} loading={false} error={null} />);
    // Check that exactly 2 ItemCards are rendered
    expect(screen.getAllByTestId(/item-card-\d+/).length).toBe(2);
  });
});
