import { gql } from '@apollo/client';

export const GET_FLIGHTS = gql`
  query GetFlights($from: String, $to: String, $departureDate: String, $dateRange: Int) {
    flights(from: $from, to: $to, departureDate: $departureDate, dateRange: $dateRange) {
      id
      airline
      from
      to
      departure
      arrival
      departureTime
      arrivalTime
      departureDate
      arrivalDate
      duration
      price
      availableSeats
    }
  }
`;

export const GET_FLIGHT = gql`
  query GetFlight($id: ID!) {
    flight(id: $id) {
      id
      airline
      from
      to
      departure
      arrival
      duration
      price
      availableSeats
      aircraft {
        model
        capacity
      }
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($userId: ID!) {
    userBookings(userId: $userId) {
      id
      bookingNumber
      flight {
        id
        airline
        from
        to
        departure
        price
      }
      bookingDate
      status
      totalPrice
    }
  }
`;

export const GET_AIRLINES = gql`
  query GetAirlines {
    airlines {
      id
      name
      code
      logo
    }
  }
`;

