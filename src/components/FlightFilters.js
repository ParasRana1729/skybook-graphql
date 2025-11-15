import React, { useState } from 'react';

const FlightFilters = ({ flights, onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    airline: '',
    sortBy: 'price'
  });

  const airlines = [...new Set(flights.map(f => f.airline))].sort();
  const maxPrice = Math.max(...flights.map(f => f.price), 0);
  const minPrice = Math.min(...flights.map(f => f.price), 0);

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      airline: '',
      sortBy: 'price'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="flight-filters" style={{
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: '#f1f5f9', fontWeight: '600' }}>Filters & Sort</h4>
        <button
          onClick={clearFilters}
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #475569 0%, #334155 100%)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Clear All
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#cbd5e1' }}>
            Min Price: ${filters.minPrice || minPrice}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.minPrice || minPrice}
            onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#60a5fa'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#cbd5e1' }}>
            Max Price: ${filters.maxPrice || maxPrice}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.maxPrice || maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#60a5fa'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#cbd5e1' }}>
            Airline
          </label>
          <select
            value={filters.airline}
            onChange={(e) => handleFilterChange('airline', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '2px solid #475569',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
              color: '#e2e8f0',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#475569';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>All Airlines</option>
            {airlines.map(airline => (
              <option key={airline} value={airline} style={{ background: '#1e293b', color: '#e2e8f0' }}>{airline}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#cbd5e1' }}>
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '2px solid #475569',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
              color: '#e2e8f0',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#475569';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="price" style={{ background: '#1e293b', color: '#e2e8f0' }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: '#1e293b', color: '#e2e8f0' }}>Price: High to Low</option>
            <option value="duration" style={{ background: '#1e293b', color: '#e2e8f0' }}>Duration: Shortest</option>
            <option value="duration-desc" style={{ background: '#1e293b', color: '#e2e8f0' }}>Duration: Longest</option>
            <option value="departure" style={{ background: '#1e293b', color: '#e2e8f0' }}>Departure: Early</option>
            <option value="departure-desc" style={{ background: '#1e293b', color: '#e2e8f0' }}>Departure: Late</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FlightFilters;

