import { Item } from '../types/Item';

export const API_URL = 'http://localhost:5000/api';

/**
 * Service for handling API requests related to items
 * Following the Single Responsibility Principle
 * 
 * Using functional approach for better composition and testability
 */

/**
 * Fetch all courses with optional search parameters
 * 
 * @param searchTerm - Optional text to filter courses by name, description, or tags
 * @param category - Optional category to filter courses by
 * @param level - Optional difficulty level to filter courses by
 * @param instructor - Optional instructor name to filter courses by
 * @returns Promise resolving to array of filtered courses
 */
export const getItems = async (
  searchTerm?: string, 
  category?: string, 
  level?: string, 
  instructor?: string
): Promise<Item[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.append('search', searchTerm);
    }
    
    if (category) {
      queryParams.append('category', category);
    }
    
    if (level) {
      queryParams.append('level', level);
    }
    
    if (instructor) {
      queryParams.append('instructor', instructor);
    }
    
    const response = await fetch(`${API_URL}/items?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    // For now, return mock data for development with client-side filtering
    let filteredItems = MOCK_ITEMS;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (level) {
      filteredItems = filteredItems.filter(item => 
        item.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    if (instructor) {
      filteredItems = filteredItems.filter(item => 
        item.instructor.toLowerCase().includes(instructor.toLowerCase())
      );
    }
    
    return filteredItems;
  }
};

/**
 * Fetch a single item by id
 * 
 * @param id - The unique identifier of the item to retrieve
 * @returns Promise resolving to the item if found, or null if not found
 */
export const getItemById = async (id: string): Promise<Item | null> => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    // For development, return a mock item
    return MOCK_ITEMS.find(item => item.id === id) || null;
  }
};

// Mock data for development and initial testing
/**
 * This enhanced mock data provides a diverse set of courses across multiple categories
 * with varying properties to test filtering, sorting, and display components
 */
const MOCK_ITEMS: Item[] = [
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
    price: 89.99,
    available: true,
    instructor: 'James Wilson',
    duration: '8 weeks',
    level: 'Advanced',
    tags: ['devops', 'docker', 'kubernetes', 'jenkins', 'aws'],
    enrollmentCount: 1245,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile applications for iOS and Android using Google\'s Flutter framework.',
    category: 'Mobile Development',
    price: 59.99,
    available: true,
    instructor: 'Priya Patel',
    duration: '9 weeks',
    level: 'Intermediate',
    tags: ['flutter', 'dart', 'mobile', 'ios', 'android'],
    enrollmentCount: 2876,
    rating: 4.7
  },
  {
    id: '7',
    name: 'Cybersecurity Essentials',
    description: 'Learn fundamental security concepts and practices to protect systems and networks from common threats.',
    category: 'Security',
    price: 69.99,
    available: true,
    instructor: 'Robert Santiago',
    duration: '10 weeks',
    level: 'Intermediate',
    tags: ['security', 'network', 'encryption', 'threats'],
    enrollmentCount: 3217,
    rating: 4.8
  },
  {
    id: '8',
    name: 'Blockchain Development',
    description: 'Comprehensive guide to blockchain technology and developing decentralized applications with Ethereum and Solidity.',
    category: 'Blockchain',
    price: 99.99,
    available: false,
    instructor: 'David Kim',
    duration: '12 weeks',
    level: 'Advanced',
    tags: ['blockchain', 'ethereum', 'solidity', 'web3'],
    enrollmentCount: 982,
    rating: 4.4
  },
  {
    id: '9',
    name: 'AI & Machine Learning',
    description: 'In-depth exploration of artificial intelligence algorithms and machine learning models using Python and TensorFlow.',
    category: 'Data Science',
    price: 99.99,
    available: true,
    instructor: 'Dr. Lisa Montgomery',
    duration: '14 weeks',
    level: 'Advanced',
    tags: ['ai', 'machine learning', 'python', 'tensorflow'],
    enrollmentCount: 4328,
    rating: 4.9
  },
  {
    id: '10',
    name: 'SQL for Data Analysis',
    description: 'Master SQL for effective data querying, manipulation, and analysis in business environments.',
    category: 'Database',
    price: 39.99,
    available: true,
    instructor: 'Thomas Jenkins',
    duration: '4 weeks',
    level: 'Beginner',
    tags: ['sql', 'database', 'data analysis', 'business'],
    enrollmentCount: 5912,
    rating: 4.5
  },
  {
    id: '11',
    name: 'Cloud Architecture on AWS',
    description: 'Design, implement and manage scalable cloud infrastructure using Amazon Web Services.',
    category: 'Cloud Computing',
    price: 79.99,
    available: true,
    instructor: 'Maria Garcia',
    duration: '10 weeks',
    level: 'Intermediate',
    tags: ['aws', 'cloud', 'architecture', 'devops'],
    enrollmentCount: 2345,
    rating: 4.7
  },
  {
    id: '12',
    name: 'NodeJS Backend Development',
    description: 'Build robust, scalable backend services and APIs using Node.js, Express, and MongoDB.',
    category: 'Web Development',
    price: 59.99,
    available: true,
    instructor: 'Daniel Brown',
    duration: '8 weeks',
    level: 'Intermediate',
    tags: ['nodejs', 'express', 'mongodb', 'backend'],
    enrollmentCount: 3178,
    rating: 4.6
  }
];
