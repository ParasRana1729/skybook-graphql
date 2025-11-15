import React, { useState, useMemo } from "react";
import FlightCard from "./FlightCard";
import FlightFilters from "./FlightFilters";

const FlightResults = ({ flights, searchData, show, loading, error }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    airline: '',
    sortBy: 'price'
  });

  const parseDuration = (durationStr) => {
    const match = durationStr.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };

  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights];

    if (filters.airline) {
      result = result.filter(f => f.airline === filters.airline);
    }

    if (filters.minPrice) {
      result = result.filter(f => f.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      result = result.filter(f => f.price <= filters.maxPrice);
    }

    switch (filters.sortBy) {
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        result.sort((a, b) => {
          const aDuration = parseDuration(a.duration);
          const bDuration = parseDuration(b.duration);
          return aDuration - bDuration;
        });
        break;
      case 'duration-desc':
        result.sort((a, b) => {
          const aDuration = parseDuration(a.duration);
          const bDuration = parseDuration(b.duration);
          return bDuration - aDuration;
        });
        break;
      case 'departure':
        result.sort((a, b) => {
          const dateA = new Date(a.departureDate || a.departure);
          const dateB = new Date(b.departureDate || b.departure);
          return dateA - dateB;
        });
        break;
      case 'departure-desc':
        result.sort((a, b) => {
          const dateA = new Date(a.departureDate || a.departure);
          const dateB = new Date(b.departureDate || b.departure);
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    return result;
  }, [flights, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  if (!show) {
    return null;
  }

  if (loading) {
    return (
      <section id="results" className="results-section">
        <div className="container">
          <h3>Searching Flights...</h3>
          <div style={{ textAlign: "center", padding: "2rem", color: '#cbd5e1' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Please wait while we search for available flights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('FlightResults Error Details:', {
      message: error.message,
      networkError: error.networkError,
      graphQLErrors: error.graphQLErrors,
      stack: error.stack
    });
    return (
      <section id="results" className="results-section">
        <div className="container">
          <h3>Error</h3>
          <div className="no-results" style={{ color: '#cbd5e1' }}>
            <h4 style={{ color: '#f1f5f9' }}>Unable to fetch flights</h4>
            <p style={{ color: '#94a3b8' }}>{error.message}</p>
            {error.networkError && (
              <p style={{ marginTop: '1rem', color: '#e74c3c' }}>
                Network Error: {error.networkError.message || 'Please check if the GraphQL server is running on port 4000'}
              </p>
            )}
            {error.graphQLErrors && error.graphQLErrors.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                {error.graphQLErrors.map((err, idx) => (
                  <p key={idx} style={{ color: '#e74c3c' }}>
                    GraphQL Error: {err.message}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="results" className="results-section">
      <div className="container">
        <h3>Available Flights {flights.length > 0 && `(${filteredAndSortedFlights.length} of ${flights.length})`}</h3>

        {flights.length > 0 && (
          <FlightFilters
            flights={flights}
            onFilterChange={handleFilterChange}
          />
        )}

        <div className="flight-results">
          {filteredAndSortedFlights.length === 0 ? (
            <div className="no-results" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#cbd5e1'
            }}>
              <h4 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>No flights found</h4>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                {flights.length === 0
                  ? `No flights available from ${searchData?.from} to ${searchData?.to} on the selected date.`
                  : 'No flights match your filters. Try adjusting your search criteria.'}
              </p>
            </div>
          ) : (
            filteredAndSortedFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                searchData={searchData}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FlightResults;
