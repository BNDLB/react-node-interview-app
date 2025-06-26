# EduLearn - Learning Management System

This Learning Management System (LMS) application built with React, Node.js, and TypeScript provides a platform for browsing and managing online courses. The app follows SOLID principles and Clean Code practices, showcasing a well-structured educational platform.

## Features

- Course browsing and filtering by category, level, and instructor
- Advanced search functionality with React + TypeScript
- Backend API with Express + TypeScript for course management
- Clean separation of concerns with proper component architecture
- Comprehensive test suite with Jest and React Testing Library
- Course details including duration, enrollment count, and ratings
- Mock data for educational courses across various disciplines

## Project Structure

```
edulearn-lms/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ItemCard.tsx # Course card component
│   │   │   ├── ItemList.tsx # Course list component (renamed to CourseList)
│   │   │   ├── ItemSearchPage.tsx # Course search page
│   │   │   └── SearchBar.tsx # Enhanced search with instructor and level filtering
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useItemSearch.ts
│   │   ├── services/        # API services
│   │   │   └── ItemsApiService.ts
│   │   ├── types/           # TypeScript interfaces
│   │   │   └── Item.ts
│   │   ├── utils/           # Helper utilities
│   │   └── __tests__/       # Test files
│   │       ├── components/
│   │       └── hooks/
│   └── ...
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   │   └── itemsController.ts
│   │   ├── models/          # Data models
│   │   │   └── items.ts
│   │   ├── routes/          # API routes
│   │   │   └── items.ts
│   │   ├── services/        # Business logic
│   │   │   └── itemService.ts
│   │   ├── types/           # TypeScript interfaces
│   │   │   └── item.ts
│   │   └── __tests__/       # Test files
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   └── ...
└── ...
```

## Quick Start

1. **Installation**
   ```bash
   # Install all dependencies (root, client, and server)
   npm run install:all
   ```

2. **Run in Development Mode**
   ```bash
   # Run both client and server
   npm run dev
   
   # Or run separately
   npm run client  # Frontend: http://localhost:5173
   npm run server  # Backend: http://localhost:5000
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Application Capabilities

### Learner Features
- Browse courses by category, difficulty level, and instructor
- Search courses using keywords
- View detailed course information including ratings and enrollment statistics
- Filter courses based on availability and educational level

### Instructor Features
- Add new courses to the platform
- Update course details and content
- Track enrollment statistics and ratings

### Administrative Features
- Manage course categories
- Monitor platform usage and course popularity
- Maintain instructor and learner data

## SOLID Principles Demo

This project illustrates SOLID principles:

1. **Single Responsibility Principle**
   - Each component and service has one job
   - Hooks separate UI from business logic
   
2. **Open/Closed Principle**
   - Components are designed to be extended without modification
   - Service interfaces allow for alternative implementations

3. **Liskov Substitution Principle**
   - Types are consistent and can be substituted
   
4. **Interface Segregation Principle**
   - Interfaces are specific to their use cases
   
5. **Dependency Inversion Principle**
   - High-level modules don't depend on low-level modules
   - Both depend on abstractions

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library for the frontend, and Jest with Supertest for the backend.

### Running Tests

```bash
# Run client tests
cd client
npm test

# Run server tests
cd server
npm test

# Run coverage reports
cd client
npm test -- --coverage

cd server
npm test -- --coverage
```

### Testing Structure

1. **Frontend Tests**
   - Component tests verify rendering and user interactions
   - Hook tests validate state management and API integration
   - Service tests check API communication logic

2. **Backend Tests**
   - Controller tests validate request handling
   - Route tests confirm correct API endpoints and responses
   - Service tests verify business logic

3. **Test Coverage**
   - All key components and functions have associated tests
   - Tests focus on both functionality and error handling
   - Mock data and services used to isolate test concerns

4. **Testing Best Practices**
   - Tests follow the AAA pattern (Arrange-Act-Assert)
   - Each test focuses on a single behavior
   - Clean setup and teardown for isolated tests
   - Mock external dependencies for predictable results

## Notes for Interviewers

- The application is intentionally simple to focus on code quality
- The frontend includes mock data so it can work independently of the backend
- The structure showcases knowledge of modern architecture patterns
- Interviewees can be evaluated on:
  - Code organization and structure
  - TypeScript usage
  - State management approaches
  - Component design
  - API integration
  - Error handling
