import { gql } from '@apollo/client';

export const BOOK_FLIGHT = gql`
  mutation BookFlight($flightId: ID!, $userId: ID!, $passengers: Int!, $class: String!, $departureDate: String!) {
    bookFlight(
      flightId: $flightId
      userId: $userId
      passengers: $passengers
      class: $class
      departureDate: $departureDate
    ) {
      id
      bookingNumber
      status
      flight {
        id
        airline
        from
        to
        price
      }
      totalPrice
      bookingDate
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      status
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

