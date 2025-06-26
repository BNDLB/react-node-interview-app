import express from 'express';
import { getItems, getItemById, createItem } from '../controllers/itemsController';

const router = express.Router();

// Define routes
router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', createItem);

export default router;
