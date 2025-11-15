import React, { createContext, useContext, useState } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookings, setBookings] = useState([]);

  const updateSearchData = (data) => {
    setSearchData(data);
  };

  const selectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const removeBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const value = {
    searchData,
    selectedFlight,
    bookings,
    updateSearchData,
    selectFlight,
    addBooking,
    removeBooking
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
};

