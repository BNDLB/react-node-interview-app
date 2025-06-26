import { FC } from 'react';
import { useItemSearch } from '../hooks/useItemSearch';
import SearchBar from './SearchBar';
import CourseList from './ItemList';
import styles from './ItemSearchPage.module.css';

/**
 * Main course search page component that coordinates the search functionality
 */
const ItemSearchPage: FC = () => {
  const {
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
    levels
  } = useItemSearch();
  
  return (
    <div className={styles.searchPage}>
      <h1 className={styles.searchTitle}>Browse Courses</h1>
      <p className={styles.searchSubtitle}>Discover courses taught by industry experts</p>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        levels={levels}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        instructorSearch={instructorSearch}
        onInstructorSearchChange={setInstructorSearch}
      />
      
      <CourseList 
        items={items} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default ItemSearchPage;
