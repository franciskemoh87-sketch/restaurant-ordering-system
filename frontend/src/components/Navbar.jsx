import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>⚡ TechStore</Link>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>
          🛒 Cart ({cartCount})
        </Link>
        <Link to="/admin" style={styles.adminLink}>
          ⚙️ Admin
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '1rem 2rem',
        background: '#1a1a2e', color: 'white' },
  logo: { color: '#00d4ff', fontSize: '1.5rem',
          fontWeight: 'bold', textDecoration: 'none' },
  link: { color: 'white', marginLeft: '1.5rem', textDecoration: 'none' },
  adminLink: { color: '#00d4ff', marginLeft: '1.5rem', 
               textDecoration: 'none', fontWeight: 'bold' }
};

export default Navbar;