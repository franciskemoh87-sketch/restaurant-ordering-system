import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty!</p>
          <Link to="/" style={styles.shopBtn}>Continue Shopping</Link>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={styles.item}>
              <img src={item.image || 'https://via.placeholder.com/80'} 
                   alt={item.name} style={styles.image} />
              <div style={styles.info}>
                <h3>{item.name}</h3>
                <p style={styles.price}>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button style={styles.removeBtn} 
                      onClick={() => removeFromCart(item._id)}>
                ✕ Remove
              </button>
            </div>
          ))}
          <div style={styles.total}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout" style={styles.checkoutBtn}>
              Proceed to Checkout →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
  title: { color: '#1a1a2e', marginBottom: '1.5rem' },
  empty: { textAlign: 'center', padding: '3rem' },
  shopBtn: { background: '#1a1a2e', color: 'white', padding: '0.8rem 2rem',
             borderRadius: '5px', textDecoration: 'none', marginTop: '1rem',
             display: 'inline-block' },
  item: { display: 'flex', alignItems: 'center', background: 'white',
          padding: '1rem', borderRadius: '10px', marginBottom: '1rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  image: { width: '80px', height: '80px', objectFit: 'contain' },
  info: { flex: 1, marginLeft: '1rem' },
  price: { color: '#00d4ff', fontWeight: 'bold' },
  removeBtn: { background: '#ff4444', color: 'white', border: 'none',
               padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' },
  total: { background: 'white', padding: '1.5rem', borderRadius: '10px',
           textAlign: 'right', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  checkoutBtn: { background: '#00d4ff', color: '#1a1a2e', padding: '0.8rem 2rem',
                 borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold',
                 display: 'inline-block', marginTop: '1rem' }
};

export default Cart;