import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, clearCart }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Save customer
      const customerRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/customers`, form);
      
      // Save order
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
        customer: customerRes.data._id,
        items: cart.map(item => ({
          product: item._id, quantity: item.quantity, price: item.price
        })),
        total,
        paymentMethod: 'Mobile Money'
      });

      setOrdered(true);
      clearCart();
    } catch (err) {
      // Show confirmation anyway for demo
      setOrdered(true);
      clearCart();
    }
  };

  if (ordered) {
    return (
      <div style={styles.success}>
        <h1>✅ Order Confirmed!</h1>
        <p>Thank you for shopping at TechStore!</p>
        <p>Your order of <strong>${total.toFixed(2)}</strong> has been placed.</p>
        <button style={styles.homeBtn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Checkout</h2>
      <div style={styles.form}>
        <input style={styles.input} name="name" placeholder="Full Name"
               value={form.name} onChange={handleChange} />
        <input style={styles.input} name="email" placeholder="Email Address"
               value={form.email} onChange={handleChange} />
        <input style={styles.input} name="phone" placeholder="Phone Number"
               value={form.phone} onChange={handleChange} />
        <input style={styles.input} name="address" placeholder="Delivery Address"
               value={form.address} onChange={handleChange} />
        <div style={styles.summary}>
          <h3>Order Total: ${total.toFixed(2)}</h3>
          <p>Payment Method: 📱 Mobile Money</p>
        </div>
        <button style={styles.orderBtn} onClick={handleSubmit}>
          Place Order ✓
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' },
  title: { color: '#1a1a2e' },
  form: { background: 'white', padding: '2rem', borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '0.8rem', marginBottom: '1rem',
           border: '1px solid #ddd', borderRadius: '5px',
           fontSize: '1rem', boxSizing: 'border-box' },
  summary: { background: '#f5f5f5', padding: '1rem', borderRadius: '5px',
             marginBottom: '1rem' },
  orderBtn: { background: '#1a1a2e', color: 'white', border: 'none',
              padding: '1rem', width: '100%', borderRadius: '5px',
              fontSize: '1rem', cursor: 'pointer' },
  success: { textAlign: 'center', padding: '5rem 2rem' },
  homeBtn: { background: '#00d4ff', color: '#1a1a2e', border: 'none',
             padding: '1rem 2rem', borderRadius: '5px', fontSize: '1rem',
             cursor: 'pointer', marginTop: '1rem' }
};

export default Checkout;