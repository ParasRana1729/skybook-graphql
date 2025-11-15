import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER_BOOKINGS } from '../graphql/queries';
import { CANCEL_BOOKING } from '../graphql/mutations';

const BookingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId: user?.id || '' },
    skip: !isAuthenticated || !user?.id
  });

  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    onCompleted: () => {
      refetch();
      alert('Booking cancelled successfully');
    },
    onError: (err) => {
      alert(`Error cancelling booking: ${err.message}`);
    }
  });

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking({ variables: { bookingId } });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Please login to view your bookings</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading your bookings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error loading bookings: {error.message}</h2>
      </div>
    );
  }

  const bookings = data?.userBookings || [];

  return (
    <section className="bookings-section" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>You have no bookings yet.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card" style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3>Booking #{booking.bookingNumber}</h3>
                  <p><strong>Flight:</strong> {booking.flight.airline}</p>
                  <p><strong>Route:</strong> {booking.flight.from} → {booking.flight.to}</p>
                  <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                </div>
                {booking.status !== 'CANCELLED' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingsPage;

