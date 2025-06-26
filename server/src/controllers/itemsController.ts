import { Request, Response } from 'express';
import itemsModel from '../models/items';
import { Item } from '../types/item';

// Single Responsibility Principle: Each controller method has one responsibility

/**
 * Get all courses, with optional filtering
 */
export const getItems = (req: Request, res: Response): void => {
  try {
    const { search, category, level, instructor } = req.query;
    let filteredItems = [...itemsModel];
    
    // Filter by search term if provided
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        item.instructor.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by category if provided
    if (category && typeof category === 'string') {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by level if provided
    if (level && typeof level === 'string') {
      filteredItems = filteredItems.filter(item => 
        item.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    // Filter by instructor if provided
    if (instructor && typeof instructor === 'string') {
      filteredItems = filteredItems.filter(item => 
        item.instructor.toLowerCase().includes(instructor.toLowerCase())
      );
    }
    
    res.status(200).json(filteredItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error });
  }
};

/**
 * Get a single item by id
 */
export const getItemById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const item = itemsModel.find(item => item.id === id);
    
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving item', error });
  }
};

/**
 * Create a new course
 */
export const createItem = (req: Request, res: Response): void => {
  try {
    // This would be replaced with actual database insertion in a real app
    const newItem: Item = {
      id: String(itemsModel.length + 1),
      ...req.body
    };
    
    // Validate required fields
    if (!newItem.name || !newItem.price || !newItem.instructor || !newItem.category || !newItem.description || !newItem.level || !newItem.duration) {
      res.status(400).json({ 
        message: 'Required fields are missing', 
        required: ['name', 'price', 'instructor', 'category', 'description', 'level', 'duration']
      });
      return;
    }
    
    // Set defaults for optional fields
    newItem.tags ??= [];
    newItem.available ??= true;
    newItem.enrollmentCount ??= 0;
    newItem.rating ??= 0;
    
    // Add to our "database"
    itemsModel.push(newItem);
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};
