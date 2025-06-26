import request from 'supertest';
import app from '../index';

// Mock the routes
jest.mock('../routes/items', () => {
  const express = require('express');
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Mock items route' });
  });
  
  return router;
});

describe('Server', () => {
  test('health check endpoint returns status ok', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message', 'Server is running');
  });

  test('items route is working', async () => {
    const response = await request(app).get('/api/items');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Mock items route');
  });

  test('non-existent route returns 404', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
  });
});
