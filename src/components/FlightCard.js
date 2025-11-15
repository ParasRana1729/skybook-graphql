import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useAuth } from "../context/AuthContext";
import { BOOK_FLIGHT } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const FlightCard = ({ flight, searchData }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(false);

  const [bookFlight, { loading }] = useMutation(BOOK_FLIGHT, {
    onCompleted: (data) => {
      setBooking(false);
      alert(
        `Flight booked successfully!\n\n` +
          `Booking Number: ${data.bookFlight.bookingNumber}\n` +
          `Flight: ${flight.airline}\n` +
          `Route: ${flight.from} → ${flight.to}\n` +
          `Total Price: $${data.bookFlight.totalPrice}\n\n` +
          `Thank you for choosing SkyBook!`
      );
      navigate("/bookings");
    },
    onError: (error) => {
      setBooking(false);
      alert(`Booking failed: ${error.message}`);
    },
  });

  const handleBookClick = () => {
    if (!isAuthenticated) {
      alert("Please login to book a flight");
      return;
    }

    if (!searchData) {
      alert("Please search for flights first");
      return;
    }

    setBooking(true);
    bookFlight({
      variables: {
        flightId: flight.id,
        userId: user.id,
        passengers: parseInt(searchData.passengers) || 1,
        class: searchData.class || "economy",
        departureDate: searchData.departure,
      },
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return '';
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flight-card">
      <div className="flight-info">
        <h4>{flight.airline}</h4>
        <div className="flight-details">
          <p>
            <strong>{flight.from}</strong> → <strong>{flight.to}</strong>
          </p>
          {flight.departureDate && flight.departureTime && (
            <p style={{ margin: '8px 0' }}>
              <strong>Departure:</strong> {formatDateTime(flight.departureDate, flight.departureTime)}
            </p>
          )}
          {flight.arrivalDate && flight.arrivalTime && (
            <p style={{ margin: '8px 0' }}>
              <strong>Arrival:</strong> {formatDateTime(flight.arrivalDate, flight.arrivalTime)}
            </p>
          )}
          <p style={{ margin: '8px 0' }}>
            <strong>Duration:</strong> {flight.duration}
          </p>
          {flight.availableSeats && (
            <p style={{ margin: '8px 0', color: flight.availableSeats < 10 ? '#dc3545' : '#28a745' }}>
              <strong>Available Seats:</strong> {flight.availableSeats}
            </p>
          )}

          {searchData && (
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#6c757d' }}>
              Passengers: {searchData.passengers} | Class: {searchData.class}
            </p>
          )}
        </div>
      </div>

      <div className="flight-booking">
        <div className="flight-price" style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
          ${flight.price}
        </div>
        <button
          className="book-btn"
          onClick={handleBookClick}
          disabled={loading || booking}
        >
          {loading || booking ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
