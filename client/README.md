# React + TypeScript Interview App Client

This is the React frontend for the interview application. It provides a searchable item list interface designed to test candidate's React and TypeScript skills.

## Structure

- `components/`: React UI components
- `hooks/`: Custom React hooks
- `services/`: API service layers
- `types/`: TypeScript interfaces and types
- `utils/`: Utility functions

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Features

- Item search interface
- Filtering by category
- Clean component architecture following SOLID principles
- TypeScript for type safety

## Getting Started

The main component to focus on is `ItemSearchPage.tsx`, which coordinates the search functionality.

### Main Components:

1. `SearchBar`: For inputting search terms and filtering by category
2. `ItemList`: Displays the filtered items
3. `ItemCard`: Shows individual item details

### Custom Hooks:

- `useItemSearch`: Manages search state and logic

### Services: 

- `ItemsApiService`: Handles API communication (mock data for now)

## Tasks for Interview Candidates

Possible tasks to implement:

1. Connect to the API instead of using mock data
2. Add sorting functionality
3. Implement pagination
4. Create a detailed item view route
5. Add form validation for new items
