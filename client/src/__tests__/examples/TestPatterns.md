// filepath: /Users/ben.dalby/interviews/react-node-interview-app/client/src/__tests__/examples/TestPatterns.md
# Testing Patterns & Best Practices

This document demonstrates recommended testing patterns for the React + Node interview application.

## Component Testing

### 1. Component Rendering Test

```tsx
// Basic pattern for testing component rendering
describe('ComponentName', () => {
  test('renders correctly', () => {
    // ARRANGE: Set up props and environment
    const props = { /* required props */ };
    
    // ACT: Render the component
    render(<ComponentName {...props} />);
    
    // ASSERT: Verify expected elements are in the document
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

### 2. User Interaction Testing

```tsx
// Testing user interactions
test('handles user interactions', async () => {
  // ARRANGE: Set up component with mock functions
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  // ACT: Simulate user interaction
  await userEvent.click(screen.getByRole('button', { name: /click me/i }));
  
  // ASSERT: Verify the expected outcome
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 3. Async Component Testing

```tsx
// Testing components with async operations
test('loads data asynchronously', async () => {
  // ARRANGE: Mock API call
  jest.spyOn(apiService, 'fetchData').mockResolvedValue([{ id: 1, name: 'Item' }]);
  
  // ACT: Render component that triggers API call
  render(<AsyncComponent />);
  
  // Initial loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // ASSERT: Verify final state after data loads
  await waitFor(() => {
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
```

## Hook Testing

### 1. Custom Hook Test

```tsx
// Testing custom hooks
test('custom hook behaves as expected', () => {
  // ARRANGE: Mock any dependencies
  
  // ACT: Render the hook
  const { result } = renderHook(() => useCustomHook(initialValue));
  
  // ASSERT: Verify initial state
  expect(result.current.value).toBe(initialValue);
  
  // ACT: Update state through hook method
  act(() => {
    result.current.updateValue('new value');
  });
  
  // ASSERT: Verify updated state
  expect(result.current.value).toBe('new value');
});
```

## Service Testing

### 1. API Service Test

```tsx
// Testing API services
test('service makes correct API call', async () => {
  // ARRANGE: Mock fetch or axios
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ data: 'test' })
  });
  
  // ACT: Call the service
  const result = await apiService.getData();
  
  // ASSERT: Verify the API was called correctly
  expect(fetch).toHaveBeenCalledWith('expected/url', expect.any(Object));
  expect(result).toEqual({ data: 'test' });
});
```

## Mocking Patterns

### 1. Component Dependency Mocking

```tsx
// Mocking child components for isolation
jest.mock('../ChildComponent', () => {
  return function MockedChild(props) {
    return <div data-testid="mocked-child">{props.content}</div>;
  };
});

test('parent renders with mocked child', () => {
  render(<ParentComponent />);
  expect(screen.getByTestId('mocked-child')).toBeInTheDocument();
});
```

### 2. Context Mocking

```tsx
// Mocking React Context
const mockContextValue = { user: { name: 'Test User' } };

test('component uses context values', () => {
  render(
    <UserContext.Provider value={mockContextValue}>
      <ComponentUsingContext />
    </UserContext.Provider>
  );
  
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

## Testing Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Keep tests isolated** - Each test should be independent and not rely on other tests
3. **Use meaningful test descriptions** - Describe what you're testing, not just the component name
4. **Follow AAA pattern** - Arrange, Act, Assert
5. **Test edge cases** - Empty states, error states, loading states
6. **Use data-testid sparingly** - Prefer using accessible roles, labels, and text content
7. **Mock external dependencies** - API calls, timers, etc.
8. **Clean up after tests** - Reset mocks, clear rendered components
9. **Avoid overusing snapshots** - They can be brittle and don't explain intent
10. **Test one thing per test** - Each test should verify a specific behavior
