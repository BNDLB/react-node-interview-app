import { Request, Response } from 'express';
import { getItems, getItemById, createItem } from '../../controllers/itemsController';
import itemsModel from '../../models/items';

// Mock the items model
jest.mock('../../models/items', () => [
  {
    id: '1',
    name: 'Test Item 1',
    description: 'Test description 1',
    category: 'Test Category',
    price: 10.99,
    inStock: true,
    tags: ['test', 'item']
  },
  {
    id: '2',
    name: 'Another Item',
    description: 'Another description',
    category: 'Another Category',
    price: 20.99,
    inStock: false,
    tags: ['another', 'test']
  }
]);

describe('itemsController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObj = {};

  beforeEach(() => {
    // Reset mock response object
    responseObj = {};
    
    // Setup mock request and response
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((data) => {
        responseObj = data;
        return mockResponse;
      })
    };
  });

  describe('getItems', () => {
    test('should return all items when no query parameters are provided', () => {
      mockRequest.query = {};
      
      getItems(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObj).toEqual(itemsModel);
    });

    test('should filter items by search term', () => {
      mockRequest.query = { search: 'Test' };
      
      getItems(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(Array.isArray(responseObj)).toBeTruthy();
      expect((responseObj as any[]).length).toBe(1);
      expect((responseObj as any[])[0].id).toBe('1');
    });

    test('should filter items by category', () => {
      mockRequest.query = { category: 'Another Category' };
      
      getItems(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(Array.isArray(responseObj)).toBeTruthy();
      expect((responseObj as any[]).length).toBe(1);
      expect((responseObj as any[])[0].id).toBe('2');
    });

    test('should combine search and category filters', () => {
      mockRequest.query = { 
        search: 'test',
        category: 'Test Category'
      };
      
      getItems(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(Array.isArray(responseObj)).toBeTruthy();
      expect((responseObj as any[]).length).toBe(1);
      expect((responseObj as any[])[0].id).toBe('1');
    });
  });

  describe('getItemById', () => {
    test('should return a specific item when valid ID is provided', () => {
      mockRequest.params = { id: '1' };
      
      getItemById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect((responseObj as any).id).toBe('1');
    });

    test('should return 404 when invalid ID is provided', () => {
      mockRequest.params = { id: 'invalid-id' };
      
      getItemById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect((responseObj as any).message).toBe('Item not found');
    });
  });

  describe('createItem', () => {
    test('should create a new item when valid data is provided', () => {
      const newItemData = {
        name: 'New Item',
        description: 'New description',
        category: 'New Category',
        price: 15.99,
        inStock: true,
        tags: ['new', 'item']
      };
      
      mockRequest.body = newItemData;
      
      createItem(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect((responseObj as any).name).toBe('New Item');
      expect((responseObj as any).id).toBeDefined();
    });

    test('should return 400 when required fields are missing', () => {
      mockRequest.body = {
        description: 'Missing required fields'
      };
      
      createItem(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect((responseObj as any).message).toContain('required');
    });
  });
});
