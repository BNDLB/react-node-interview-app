// filepath: /Users/ben.dalby/interviews/react-node-interview-app/server/src/__tests__/examples/ServerTestPatterns.md
# Server-Side Testing Patterns & Best Practices

This document demonstrates recommended testing patterns for the Node.js backend in the interview application.

## Controller Testing

### 1. Basic Controller Test

```typescript
// Testing a controller function
describe('itemsController', () => {
  let mockRequest;
  let mockResponse;
  
  beforeEach(() => {
    // ARRANGE: Set up mock request and response
    mockRequest = {
      params: {},
      query: {},
      body: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });
  
  test('getItems returns all items', () => {
    // ACT: Call controller function
    getItems(mockRequest, mockResponse);
    
    // ASSERT: Verify response
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
```

### 2. Controller with Query Parameters

```typescript
// Testing controller with query parameters
test('getItems filters by search term', () => {
  // ARRANGE: Set up request with query params
  mockRequest.query = { search: 'laptop' };
  
  // ACT: Call controller function
  getItems(mockRequest, mockResponse);
  
  // ASSERT: Verify filtered response
  expect(mockResponse.status).toHaveBeenCalledWith(200);
  const responseData = mockResponse.json.mock.calls[0][0];
  expect(responseData.length).toBeGreaterThan(0);
  expect(responseData.every(item => 
    item.name.toLowerCase().includes('laptop') ||
    item.description.toLowerCase().includes('laptop') ||
    item.tags.some(tag => tag.toLowerCase().includes('laptop'))
  )).toBeTruthy();
});
```

### 3. Controller Error Handling

```typescript
// Testing error handling in controllers
test('handles errors appropriately', () => {
  // ARRANGE: Force an error by mocking a service
  jest.spyOn(itemService, 'getItems').mockImplementation(() => {
    throw new Error('Service error');
  });
  
  // ACT: Call controller function
  getItems(mockRequest, mockResponse);
  
  // ASSERT: Verify error response
  expect(mockResponse.status).toHaveBeenCalledWith(500);
  expect(mockResponse.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.any(String),
      error: expect.any(Error)
    })
  );
});
```

## Route Testing

### 1. Route Test with Supertest

```typescript
// Testing API routes with supertest
import request from 'supertest';
import app from '../app';

describe('Item Routes', () => {
  test('GET /api/items returns all items', async () => {
    // ACT: Make request to the endpoint
    const response = await request(app).get('/api/items');
    
    // ASSERT: Verify response
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  
  test('GET /api/items/:id returns a specific item', async () => {
    // ACT: Make request to the endpoint
    const response = await request(app).get('/api/items/1');
    
    // ASSERT: Verify response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
  });
  
  test('POST /api/items creates a new item', async () => {
    // ARRANGE: Create test data
    const newItem = {
      name: 'Test Item',
      description: 'Test description',
      price: 99.99
    };
    
    // ACT: Make request to the endpoint
    const response = await request(app)
      .post('/api/items')
      .send(newItem)
      .set('Accept', 'application/json');
    
    // ASSERT: Verify response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Item');
    expect(response.body).toHaveProperty('id');
  });
});
```

## Service Testing

### 1. Service Function Test

```typescript
// Testing service functions
describe('itemService', () => {
  test('searchItems returns filtered items', async () => {
    // ARRANGE: Set up test data (mock database if needed)
    
    // ACT: Call service function
    const result = await itemService.searchItems('laptop', 'Electronics');
    
    // ASSERT: Verify result
    expect(result).toBeInstanceOf(Array);
    expect(result.every(item => 
      item.category === 'Electronics' && 
      (item.name.includes('laptop') || 
       item.description.includes('laptop') || 
       item.tags.includes('laptop'))
    )).toBe(true);
  });
});
```

## Testing Best Practices for Node.js

1. **Isolate the unit under test** - Mock dependencies and external services
2. **Test the public API** - Focus on testing the interface, not implementation details
3. **Use dependency injection** - Makes it easier to substitute real implementations with mocks
4. **Clean up after tests** - Reset any global state modifications
5. **Test both success and failure paths** - Ensure proper error handling
6. **Use meaningful test data** - Test data should represent real-world scenarios
7. **Categorize tests** - Unit tests, integration tests, end-to-end tests
8. **Test middleware separately** - Middleware often contains complex logic
9. **Mock external dependencies** - Database, file system, network requests
10. **Use fixtures for test data** - Reusable test data keeps tests DRY

## Patterns for Mocking in Node.js

### 1. Mocking a Database

```typescript
// Mocking database interactions
jest.mock('../database', () => ({
  query: jest.fn().mockImplementation((sql, values) => {
    if (sql.includes('SELECT')) {
      return Promise.resolve([{ id: 1, name: 'Test Item' }]);
    }
    return Promise.resolve({ insertId: 1 });
  })
}));
```

### 2. Mocking File System

```typescript
// Mocking fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockImplementation((path) => {
    if (path.includes('config.json')) {
      return JSON.stringify({ key: 'value' });
    }
    throw new Error('File not found');
  }),
  existsSync: jest.fn().mockImplementation((path) => {
    return path.includes('config.json');
  })
}));
```

### 3. Testing Express Middleware

```typescript
// Testing middleware
const mockRequest = {};
const mockResponse = {};
const nextFunction = jest.fn();

test('middleware performs expected action', () => {
  // ARRANGE: Set up request, response, and next
  
  // ACT: Call middleware
  authMiddleware(mockRequest, mockResponse, nextFunction);
  
  // ASSERT: Verify middleware behavior
  expect(nextFunction).toHaveBeenCalled();
  expect(mockRequest).toHaveProperty('user');
});
```
