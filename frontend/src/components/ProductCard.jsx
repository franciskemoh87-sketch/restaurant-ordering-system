function ProductCard({ product, addToCart }) {
  return (
    <div style={styles.card}>
      <img src={product.image || 'https://via.placeholder.com/200'} 
           alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.category}>{product.category}</p>
      <p style={styles.price}>${product.price}</p>
      <p style={styles.desc}>{product.description}</p>
      <button style={styles.button} onClick={() => addToCart(product)}>
        Add to Cart 🛒
      </button>
    </div>
  );
}

const styles = {
  card: { background: 'white', borderRadius: '10px', padding: '1rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' },
  image: { width: '100%', height: '180px', objectFit: 'contain' },
  name: { fontSize: '1rem', fontWeight: 'bold', margin: '0.5rem 0' },
  category: { color: '#666', fontSize: '0.8rem' },
  price: { color: '#00d4ff', fontSize: '1.2rem', fontWeight: 'bold' },
  desc: { fontSize: '0.8rem', color: '#888', margin: '0.5rem 0' },
  button: { background: '#1a1a2e', color: 'white', border: 'none',
            padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer',
            width: '100%', marginTop: '0.5rem' }
};

export default ProductCard;