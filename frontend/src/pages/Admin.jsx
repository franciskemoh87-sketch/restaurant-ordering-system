import { useState } from 'react';

const sampleData = {
  totalSales: 15890,
  totalOrders: 23,
  totalCustomers: 18,
  topProducts: [
    { name: 'MacBook Pro M3', sold: 8, revenue: 10392 },
    { name: 'iPhone 15 Pro', sold: 12, revenue: 11988 },
    { name: 'Samsung Galaxy S24', sold: 6, revenue: 4794 },
    { name: 'iPad Air', sold: 4, revenue: 2396 },
    { name: 'AirPods Pro', sold: 10, revenue: 2490 },
  ],
  recentOrders: [
    { id: '#001', customer: 'John Doe', total: 1299, status: 'delivered' },
    { id: '#002', customer: 'Jane Smith', total: 999, status: 'confirmed' },
    { id: '#003', customer: 'Bob Johnson', total: 799, status: 'pending' },
    { id: '#004', customer: 'Alice Brown', total: 249, status: 'delivered' },
    { id: '#005', customer: 'Charlie Wilson', total: 599, status: 'confirmed' },
  ]
};

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const statusColor = (status) => {
    if (status === 'delivered') return '#4caf50';
    if (status === 'confirmed') return '#2196f3';
    return '#ff9800';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ Admin Dashboard</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{...styles.tab, 
          background: activeTab === 'dashboard' ? '#1a1a2e' : '#eee',
          color: activeTab === 'dashboard' ? 'white' : '#333'}}
          onClick={() => setActiveTab('dashboard')}>
          📊 Overview
        </button>
        <button style={{...styles.tab,
          background: activeTab === 'orders' ? '#1a1a2e' : '#eee',
          color: activeTab === 'orders' ? 'white' : '#333'}}
          onClick={() => setActiveTab('orders')}>
          📦 Orders
        </button>
        <button style={{...styles.tab,
          background: activeTab === 'products' ? '#1a1a2e' : '#eee',
          color: activeTab === 'products' ? 'white' : '#333'}}
          onClick={() => setActiveTab('products')}>
          💻 Products
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={styles.cards}>
            <div style={styles.card}>
              <h3 style={styles.cardLabel}>💰 Total Sales</h3>
              <p style={styles.cardValue}>${sampleData.totalSales.toLocaleString()}</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardLabel}>📦 Total Orders</h3>
              <p style={styles.cardValue}>{sampleData.totalOrders}</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardLabel}>👥 Customers</h3>
              <p style={styles.cardValue}>{sampleData.totalCustomers}</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardLabel}>📈 Avg Order</h3>
              <p style={styles.cardValue}>
                ${Math.round(sampleData.totalSales / sampleData.totalOrders)}
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div style={styles.chart}>
            <h3 style={styles.chartTitle}>Top Products by Revenue</h3>
            {sampleData.topProducts.map((p, i) => (
              <div key={i} style={styles.barRow}>
                <span style={styles.barLabel}>{p.name}</span>
                <div style={styles.barBg}>
                  <div style={{
                    ...styles.bar,
                    width: `${(p.revenue / 12000) * 100}%`
                  }} />
                </div>
                <span style={styles.barValue}>${p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={styles.table}>
          <h3 style={styles.chartTitle}>Recent Orders</h3>
          <table style={styles.tableEl}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.recentOrders.map((order, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{order.customer}</td>
                  <td style={styles.td}>${order.total}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: statusColor(order.status)
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={styles.table}>
          <h3 style={styles.chartTitle}>Top Selling Products</h3>
          <table style={styles.tableEl}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Units Sold</th>
                <th style={styles.th}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.topProducts.map((p, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.sold}</td>
                  <td style={styles.td}>${p.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' },
  title: { color: '#1a1a2e', marginBottom: '1.5rem' },
  tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' },
  tab: { padding: '0.6rem 1.2rem', border: 'none', borderRadius: '5px',
         cursor: 'pointer', fontWeight: 'bold' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
           gap: '1rem', marginBottom: '2rem' },
  card: { background: 'white', padding: '1.5rem', borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' },
  cardLabel: { color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem' },
  cardValue: { color: '#1a1a2e', fontSize: '2rem', fontWeight: 'bold', margin: 0 },
  chart: { background: 'white', padding: '1.5rem', borderRadius: '10px',
           boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  chartTitle: { color: '#1a1a2e', marginBottom: '1rem' },
  barRow: { display: 'flex', alignItems: 'center', marginBottom: '0.8rem' },
  barLabel: { width: '160px', fontSize: '0.85rem', color: '#444' },
  barBg: { flex: 1, background: '#f0f0f0', borderRadius: '5px',
           height: '20px', margin: '0 1rem' },
  bar: { height: '100%', background: '#00d4ff', borderRadius: '5px',
         transition: 'width 0.5s ease' },
  barValue: { width: '70px', fontSize: '0.85rem', fontWeight: 'bold',
              color: '#1a1a2e', textAlign: 'right' },
  table: { background: 'white', padding: '1.5rem', borderRadius: '10px',
           boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  tableEl: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#1a1a2e', color: 'white' },
  th: { padding: '0.8rem', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: '0.8rem' },
  badge: { color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px',
           fontSize: '0.8rem', fontWeight: 'bold' }
};

export default Admin;