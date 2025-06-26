import { FC, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  levels?: string[];
  selectedLevel?: string;
  onLevelChange?: (level: string) => void;
  instructorSearch?: string;
  onInstructorSearchChange?: (instructor: string) => void;
}

/**
 * SearchBar component for filtering courses
 */
const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  levels = [],
  selectedLevel = '',
  onLevelChange = () => {},
  instructorSearch = '',
  onInstructorSearchChange = () => {},
}) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.categoryFilterContainer}>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.advancedSearchToggle}>
        <button 
          className={styles.advancedSearchBtn}
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          {showAdvancedSearch ? 'Hide' : 'Show'} Advanced Search
        </button>
      </div>
      
      {showAdvancedSearch && (
        <div className={styles.advancedSearchContainer}>
          <div className={styles.instructorSearchContainer}>
            <input
              type="text"
              placeholder="Search by instructor..."
              value={instructorSearch}
              onChange={(e) => onInstructorSearchChange(e.target.value)}
              className={styles.instructorSearchInput}
            />
          </div>
          
          <div className={styles.levelFilterContainer}>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              className={styles.levelSelect}
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
