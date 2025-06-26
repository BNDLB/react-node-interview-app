import { Item } from '../types/item';

/**
 * Mock database for demonstration purposes
 * 
 * This enhanced dataset provides diverse courses across multiple categories
 * with varying properties to demonstrate filtering and sorting capabilities.
 * In a real application, this would be stored in a database.
 */
const items: Item[] = [
  {
    id: '1',
    name: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build responsive websites from scratch.',
    category: 'Web Development',
    price: 49.99,
    available: true,
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    tags: ['html', 'css', 'javascript', 'web'],
    enrollmentCount: 3452,
    rating: 4.7
  },
  {
    id: '2',
    name: 'Advanced React & Redux',
    description: 'Master React.js and Redux by building complex, real-world applications with advanced state management.',
    category: 'Web Development',
    price: 79.99,
    available: true,
    instructor: 'Michael Chen',
    duration: '10 weeks',
    level: 'Advanced',
    tags: ['react', 'redux', 'javascript', 'frontend'],
    enrollmentCount: 2187,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Data Science Fundamentals',
    description: 'An introduction to data science using Python, including data analysis, visualization, and basic machine learning.',
    category: 'Data Science',
    price: 59.99,
    available: false,
    instructor: 'Dr. Emily Rodriguez',
    duration: '12 weeks',
    level: 'Intermediate',
    tags: ['python', 'data analysis', 'machine learning', 'statistics'],
    enrollmentCount: 5671,
    rating: 4.5
  },
  {
    id: '4',
    name: 'UX/UI Design Principles',
    description: 'Learn the core principles of user experience and interface design to create intuitive, user-friendly digital products.',
    category: 'Design',
    price: 69.99,
    available: true,
    instructor: 'Alex Thompson',
    duration: '6 weeks',
    level: 'Beginner',
    tags: ['design', 'user experience', 'interface', 'wireframing'],
    enrollmentCount: 1893,
    rating: 4.6
  },
  {
    id: '5',
    name: 'DevOps & CI/CD Pipeline Implementation',
    description: 'Master the tools and practices for continuous integration and deployment in modern software development.',
    category: 'DevOps',
    price: 199.99,
    inStock: true,
    tags: ['furniture', 'office', 'ergonomic', 'comfort']
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery life',
    category: 'Audio',
    price: 79.99,
    inStock: true,
    tags: ['audio', 'portable', 'wireless', 'waterproof']
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Central control device for all your smart home appliances and systems',
    category: 'Smart Home',
    price: 149.99,
    inStock: true,
    tags: ['smart', 'home', 'automation', 'control']
  },
  {
    id: '8',
    name: 'Gaming Console',
    description: 'Next-generation gaming console with 4K graphics and 1TB storage',
    category: 'Electronics',
    price: 499.99,
    inStock: false,
    tags: ['gaming', 'entertainment', 'electronics', '4K']
  },
  {
    id: '9',
    name: 'LED Desk Lamp',
    description: 'Adjustable desk lamp with multiple brightness settings and color temperatures',
    category: 'Office',
    price: 45.99,
    inStock: true,
    tags: ['office', 'lighting', 'adjustable', 'LED']
  },
  {
    id: '10',
    name: 'Fitness Tracker',
    description: 'Wearable device that monitors activity, sleep, and heart rate',
    category: 'Wearables',
    price: 129.99,
    inStock: true,
    tags: ['fitness', 'health', 'wearable', 'smart']
  },
  {
    id: '11',
    name: 'E-Reader',
    description: 'Lightweight e-reader with paper-like display and weeks of battery life',
    category: 'Electronics',
    price: 119.99,
    inStock: true,
    tags: ['reading', 'books', 'portable', 'e-ink']
  },
  {
    id: '12',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours',
    category: 'Kitchen',
    price: 35.99,
    inStock: true,
    tags: ['kitchen', 'hydration', 'eco-friendly', 'insulated']
  }
];

export default items;
