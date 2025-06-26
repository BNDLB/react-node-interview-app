# Interview Tasks & Questions

This document provides a series of tasks and questions to ask candidates during the interview, based on the React + Node.js interview application.

## Front-End Tasks

### 1. Search Implementation
*Task*: The current search functionality is partially implemented. Complete the implementation to allow searching by name, description, or tags.
*Evaluation Points*:
- Understanding of React hooks
- State management
- UI/UX considerations
- Error handling

### 2. Filter Enhancement
*Task*: Add the ability to filter items by price range using a slider or min/max inputs.
*Evaluation Points*:
- Component design
- Form handling
- Props and state management
- User experience decisions

### 3. Item Details View
*Task*: Create a new route and page to show detailed information about an item when clicked.
*Evaluation Points*:
- React Router usage
- Passing data between components
- Clean code organization

### 4. Styling & Responsive Design
*Task*: Enhance the UI of the application to make it more visually appealing and responsive.
*Evaluation Points*:
- CSS knowledge
- Responsive design principles
- Attention to detail

## Back-End Tasks

### 1. API Integration
*Task*: Connect the front-end to the provided Node.js API endpoints instead of using mock data.
*Evaluation Points*:
- Async/await knowledge
- Error handling
- API consumption patterns

### 2. Pagination
*Task*: Implement pagination on the server-side API and client-side list.
*Evaluation Points*:
- RESTful API design
- Query parameter handling
- State management with pagination

### 3. New API Endpoint
*Task*: Add a new API endpoint to create an item, and implement the form on the front-end.
*Evaluation Points*:
- Express route handling
- Input validation
- Form submission and error handling

### 4. Filtering & Sorting
*Task*: Implement server-side filtering and sorting capabilities in the API.
*Evaluation Points*:
- Query building
- Efficient filtering algorithms
- API design

### 5. Data Update Functionality
*Task*: Implement functionality to create, update, and delete items through the API.
*Evaluation Points*:
- HTTP method knowledge
- State management after mutations
- Optimistic UI updates

## Testing Tasks

### 1. Unit Testing
*Task*: Add comprehensive unit tests for a component or function that is missing tests.
*Evaluation Points*:
- Testing methodology
- Jest and Testing Library knowledge
- Test case design
- Mocking and isolation

### 2. Integration Testing
*Task*: Create integration tests for the search functionality that test the full flow from UI to API.
*Evaluation Points*:
- Understanding of integration testing
- Mock service workers or API mocks
- Test organization
- Edge case handling

### 3. Performance Testing
*Task*: Identify and fix performance issues in the item list rendering with a large dataset.
*Evaluation Points*:
- Profiling skills
- React optimization techniques
- Code refactoring for performance

### 4. Test-Driven Development
*Task*: Implement a new feature using TDD methodology.
*Evaluation Points*:
- TDD understanding
- Test-first approach
- Refactoring skills
- Incremental development

## Technical Questions

1. How would you optimize the performance of the search functionality?
2. Explain how you would handle authentication and authorization in this application.
3. What improvements would you make to the current code structure?
4. How would you handle API errors and present them to the user?
5. Explain the SOLID principles and identify where they are used in this codebase.
6. How would you handle form validation in React?
7. What approaches would you take to make this application accessible?
8. How would you implement caching for API requests?
9. Explain your strategy for state management in a larger application.
10. How would you organize a more complex version of this application?

## Code Review Questions

Present a section of the existing code and ask:
1. What problems do you see with this code?
2. How would you refactor this to improve it?
3. Are there any potential bugs or edge cases not handled here?
4. How would you make this code more maintainable?

## Follow-Up Discussion

After completing tasks, discuss:
1. What was challenging about the implementation?
2. What design decisions did you make and why?
3. How would you extend this application for production use?
4. What would you do differently if you had more time?
