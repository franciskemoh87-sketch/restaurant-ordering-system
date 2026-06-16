import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => {
        // Use sample products if API not available
        setProducts([
          { _id: '1', name: 'MacBook Pro M3', category: 'Laptop', 
            price: 1299, description: 'Apple M3 chip, 16GB RAM',
            image: 'https://via.placeholder.com/200?text=MacBook' },
          { _id: '2', name: 'iPhone 15 Pro', category: 'Phone', 
            price: 999, description: '6.1 inch, 256GB Storage',
            image: 'https://via.placeholder.com/200?text=iPhone' },
          { _id: '3', name: 'Samsung Galaxy S24', category: 'Phone', 
            price: 799, description: '6.2 inch, 128GB Storage',
            image: 'https://via.placeholder.com/200?text=Samsung' },
          { _id: '4', name: 'iPad Air', category: 'Tablet', 
            price: 599, description: 'M1 chip, 10.9 inch display',
            image: 'https://via.placeholder.com/200?text=iPad' },
          { _id: '5', name: 'AirPods Pro', category: 'Accessory', 
            price: 249, description: 'Active Noise Cancellation',
            image: 'https://via.placeholder.com/200?text=AirPods' },
          { _id: '6', name: 'Dell XPS 15', category: 'Laptop', 
            price: 1099, description: 'Intel i7, 16GB RAM, 512GB SSD',
            image: 'https://via.placeholder.com/200?text=Dell' },
        ]);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>⚡ Welcome to TechStore</h1>
        <p style={styles.heroSub}>Best Gadgets & Laptops at Amazing Prices</p>
      </div>
      <h2 style={styles.sectionTitle}>Our Products</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f5f5f5' },
  hero: { background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          color: 'white', padding: '3rem 2rem', textAlign: 'center' },
  heroTitle: { fontSize: '2.5rem', margin: '0 0 1rem 0' },
  heroSub: { fontSize: '1.2rem', color: '#00d4ff' },
  sectionTitle: { textAlign: 'center', padding: '2rem', color: '#1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem', padding: '0 2rem 2rem' }
};

export default Home;