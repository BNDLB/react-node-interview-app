import request from 'supertest';
import express from 'express';
import itemsRouter from '../../routes/items';
import * as itemsController from '../../controllers/itemsController';

// Mock the controllers
jest.mock('../../controllers/itemsController', () => ({
  getItems: jest.fn((req, res) => res.json({ message: 'getItems called' })),
  getItemById: jest.fn((req, res) => res.json({ message: 'getItemById called', id: req.params.id })),
  createItem: jest.fn((req, res) => res.status(201).json({ message: 'createItem called', ...req.body }))
}));

describe('Items Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    // Set up the Express app
    app = express();
    app.use(express.json());
    app.use('/api/items', itemsRouter);
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/items', () => {
    test('should call getItems controller', async () => {
      const response = await request(app).get('/api/items');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'getItems called' });
      expect(itemsController.getItems).toHaveBeenCalledTimes(1);
    });

    test('should pass query parameters to the controller', async () => {
      await request(app).get('/api/items?search=laptop&category=Electronics');
      
      const controllerCall = (itemsController.getItems as jest.Mock).mock.calls[0][0];
      expect(controllerCall.query).toEqual({
        search: 'laptop',
        category: 'Electronics'
      });
    });
  });

  describe('GET /api/items/:id', () => {
    test('should call getItemById controller with correct ID', async () => {
      const response = await request(app).get('/api/items/123');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'getItemById called', id: '123' });
      expect(itemsController.getItemById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/items', () => {
    test('should call createItem controller with request body', async () => {
      const newItem = {
        name: 'New Item',
        description: 'New item description',
        price: 29.99
      };
      
      const response = await request(app)
        .post('/api/items')
        .send(newItem)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ 
        message: 'createItem called',
        name: 'New Item',
        description: 'New item description',
        price: 29.99
      });
      expect(itemsController.createItem).toHaveBeenCalledTimes(1);
      
      const controllerCall = (itemsController.createItem as jest.Mock).mock.calls[0][0];
      expect(controllerCall.body).toEqual(newItem);
    });
  });
});
