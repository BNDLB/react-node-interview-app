import { FC } from 'react';
import { Item } from '../types/Item';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  item: Item;
}

/**
 * CourseCard component for displaying individual course details
 */
const ItemCard: FC<ItemCardProps> = ({ item }) => {
  // Determine if this is a highly-rated course (4.5+ rating)
  const isHighlyRated = item.rating && item.rating >= 4.5;
  
  return (
    <div className={`${styles.itemCard} ${isHighlyRated ? styles.highlyRated : ''}`}>
      {isHighlyRated && <div className={styles.topRatedBadge}>Top Rated</div>}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.instructor}>By {item.instructor}</p>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.price}>${item.price.toFixed(2)}</span>
          <span className={item.available ? styles.available : styles.notAvailable}>
            {item.available ? 'Open for Enrollment' : 'Currently Closed'}
          </span>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <p className={styles.description}>{item.description}</p>
        
        <div className={styles.metaContainer}>
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category:</span>
              <span className={styles.metaValue}>{item.category}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Level:</span>
              <span className={styles.metaValue}>{item.level}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Duration:</span>
              <span className={styles.metaValue}>{item.duration}</span>
            </div>
          </div>
          
          <div className={styles.metaRow}>
            {item.rating && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Rating:</span>
                <span className={`${styles.metaValue} ${styles.rating}`}>{item.rating.toFixed(1)}/5</span>
              </div>
            )}
            {item.enrollmentCount && (
              <div className={`${styles.metaItem} ${styles.enrollmentCount}`}>
                <span className={styles.metaLabel}>Enrollment:</span>
                <span className={styles.metaValue}>
                  <span className={styles.enrollmentNumber}>{item.enrollmentCount.toLocaleString()}</span> students
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
