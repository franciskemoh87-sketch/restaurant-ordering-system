import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', image: '' });
  const [adding, setAdding] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.price) return alert('Name and price are required');
    setAdding(true);
    try {
      const res = await fetch(`${API}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) })
      });
      if (res.ok) {
        setForm({ name: '', price: '', description: '', category: '', image: '' });
        fetchProducts();
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      alert('Error adding product');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`${API}/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ Admin Dashboard</h2>

      <div style={styles.tabs}>
        {['products', 'add'].map(tab => (
          <button key={tab} style={{
            ...styles.tab,
            background: activeTab === tab ? '#1a1a2e' : '#eee',
            color: activeTab === tab ? 'white' : '#333'
          }} onClick={() => setActiveTab(tab)}>
            {tab === 'products' ? '💻 Products' : '➕ Add Product'}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>All Products ({products.length})</h3>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && products.length === 0 && (
            <p style={{ color: '#666' }}>No products yet. Go to "Add Product" to add some!</p>
          )}
          <div style={styles.grid}>
            {products.map(p => (
              <div key={p._id} style={styles.card}>
                {p.image && <img src={p.image} alt={p.name} style={styles.img} />}
                <h4 style={styles.productName}>{p.name}</h4>
                <p style={styles.price}>${p.price}</p>
                {p.category && <p style={styles.category}>{p.category}</p>}
                {p.description && <p style={styles.desc}>{p.description}</p>}
                <button style={styles.deleteBtn} onClick={() => handleDelete(p._id)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Add New Product</h3>
          <div style={styles.form}>
            {[
              { key: 'name', label: 'Product Name *', placeholder: 'e.g. MacBook Pro' },
              { key: 'price', label: 'Price *', placeholder: 'e.g. 1299' },
              { key: 'category', label: 'Category', placeholder: 'e.g. Laptops' },
              { key: 'image', label: 'Image URL', placeholder: 'https://...' },
            ].map(field => (
              <div key={field.key} style={styles.field}>
                <label style={styles.label}>{field.label}</label>
                <input
                  style={styles.input}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                />
              </div>
            ))}
            <div style={styles.field}>
              <label style={styles.label}>Description</label>
              <textarea
                style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                placeholder="Product description..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button style={styles.addBtn} onClick={handleAdd} disabled={adding}>
              {adding ? 'Adding...' : '➕ Add Product'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' },
  title: { color: '#1a1a2e', marginBottom: '1.5rem' },
  tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' },
  tab: { padding: '0.6rem 1.2rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  section: { background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  sectionTitle: { color: '#1a1a2e', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' },
  card: { border: '1px solid #eee', borderRadius: '8px', padding: '1rem', textAlign: 'center' },
  img: { width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px', marginBottom: '0.5rem' },
  productName: { margin: '0 0 0.3rem', color: '#1a1a2e' },
  price: { color: '#00d4ff', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 0.3rem' },
  category: { color: '#888', fontSize: '0.8rem', margin: '0 0 0.3rem' },
  desc: { color: '#666', fontSize: '0.8rem', margin: '0 0 0.5rem' },
  deleteBtn: { background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold' },
  form: { maxWidth: '500px' },
  field: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', color: '#333' },
  input: { width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', boxSizing: 'border-box' },
  addBtn: { background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', padding: '0.8rem 2rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
};

export default Admin;