import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import { ItemSearchPage } from './components'

/**
 * Main Application Component 
 * 
 * This component serves as the entry point for the application and sets up the
 * basic structure including routing, header, main content area, and footer.
 * 
 * Following SOLID principles:
 * - Single Responsibility: App component only handles application structure and routing
 * - Open/Closed: New routes can be added without modifying existing code
 * - Dependency Inversion: Components are imported and composed (not tightly coupled)
 * 
 * The application uses React Router for client-side routing, with a simple structure
 * that can be expanded to include more pages and features as the application grows.
 */
function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <header className={styles.appHeader}>
          <h1>EduLearn - Online Course Platform</h1>
          <p className={styles.subtitle}>A learning management system built with React + Node.js</p>
        </header>
        
        <main className={styles.appContent}>
          <Routes>
            {/* Main page with item search functionality */}
            <Route path="/" element={<ItemSearchPage />} />
            
            {/* Additional routes can be added here as the application grows
                e.g., <Route path="/item/:id" element={<ItemDetailPage />} />  */}
          </Routes>
        </main>
        
        <footer className={styles.appFooter}>
          <p>Built with React, TypeScript, and Node.js</p>
          <p>
            Interview task: Implement search functionality and connect to the Node.js API
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
