import { useState, useEffect, useCallback } from 'react';
import { Item } from '../types/Item';
import { getItems } from '../services/ItemsApiService';

/**
 * Custom hook for course searching and filtering
 * Follows the Single Responsibility Principle by handling only search logic
 * 
 * This hook encapsulates the state and logic for searching and filtering courses.
 * It uses the ItemsApiService to fetch data and provides a clean interface
 * for components to interact with the search functionality.
 */
export const useItemSearch = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [instructorSearch, setInstructorSearch] = useState<string>('');

  // Extract unique categories from items
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  // Extract unique levels from items
  const levels = Array.from(new Set(items.map(item => item.level)));

  /**
   * Fetch courses based on current search parameters
   * Using useCallback to prevent unnecessary re-renders
   */
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getItems(searchTerm, selectedCategory, selectedLevel, instructorSearch);
      setItems(data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedLevel, instructorSearch]);

  // Fetch items on mount and when search params change
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    instructorSearch,
    setInstructorSearch,
    categories,
    levels,
    refreshItems: fetchItems
  };
};
