import { FC } from 'react';
import { Item } from '../types/Item';
import ItemCard from './ItemCard';
import styles from './ItemList.module.css';

interface CourseListProps {
  items: Item[];
  loading: boolean;
  error: string | null;
}

/**
 * CourseList component to display a collection of courses
 */
const CourseList: FC<CourseListProps> = ({ items, loading, error }) => {
  if (loading) {
    return <div className={styles.loading}>Loading courses...</div>;
  }
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  if (items.length === 0) {
    return <div className={styles.noItems}>No courses found. Try another search.</div>;
  }
  
  return (
    <div className={styles.courseList}>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CourseList;
