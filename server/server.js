const { ApolloServer, gql } = require('apollo-server');
const flights = require('./data/flights.json');
const { v4: uuidv4 } = require('uuid');

let users = [];
let bookings = [];

const typeDefs = gql`
  type Flight {
    id: ID!
    airline: String!
    from: String!
    to: String!
    departure: String!
    arrival: String!
    departureTime: String!
    arrivalTime: String!
    departureDate: String!
    arrivalDate: String!
    duration: String!
    price: Int!
    availableSeats: Int!
    aircraft: Aircraft
  }

  type Aircraft {
    model: String!
    capacity: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Booking {
    id: ID!
    bookingNumber: String!
    status: String!
    flight: Flight!
    totalPrice: Int!
    bookingDate: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Query {
    flights(from: String, to: String, departureDate: String, dateRange: Int): [Flight]
    flight(id: ID!): Flight
    userBookings(userId: ID!): [Booking]
    airlines: [Airline]
  }

  type Airline {
    id: ID!
    name: String!
    code: String!
    logo: String
  }

  type Mutation {
    bookFlight(
      flightId: ID!
      userId: ID!
      passengers: Int!
      class: String!
      departureDate: String!
    ): Booking
    cancelBooking(bookingId: ID!): Booking
    login(email: String!, password: String!): AuthResponse
    register(name: String!, email: String!, password: String!): AuthResponse
  }
`;

const resolvers = {
  Query: {
    flights: (_, { from, to, departureDate, dateRange = 7 }) => {
      let filtered = [...flights];

      if (from && from.trim() !== '') {
        filtered = filtered.filter(f =>
          f.from.toLowerCase().includes(from.toLowerCase())
        );
      }

      if (to && to.trim() !== '') {
        filtered = filtered.filter(f =>
          f.to.toLowerCase().includes(to.toLowerCase())
        );
      }

      if (departureDate && departureDate.trim() !== '') {
        const searchDate = new Date(departureDate);
        if (!isNaN(searchDate.getTime())) {
          const rangeDays = dateRange || 7;

          filtered = filtered.filter(f => {
            const flightDate = new Date(f.departureDate);
            if (isNaN(flightDate.getTime())) return false;
            const daysDiff = Math.abs((flightDate - searchDate) / (1000 * 60 * 60 * 24));
            return daysDiff <= rangeDays;
          });
        }
      }

      return filtered.map(f => ({
        ...f,
        departure: `${f.departureDate} ${f.departureTime}`,
        arrival: `${f.arrivalDate} ${f.arrivalTime}`
      }));
    },
    flight: (_, { id }) => {
      const flight = flights.find(f => f.id === id);
      if (flight) {
        return {
          ...flight,
          departure: `${flight.departureDate} ${flight.departureTime}`,
          arrival: `${flight.arrivalDate} ${flight.arrivalTime}`,
          aircraft: {
            model: "Boeing 787",
            capacity: 300
          }
        };
      }
      return null;
    },
    userBookings: (_, { userId }) => {
      return bookings.filter(b => b.userId === userId);
    },
    airlines: () => {
      const uniqueAirlines = [...new Set(flights.map(f => f.airline))];
      return uniqueAirlines.map((airline, index) => ({
        id: String(index + 1),
        name: airline,
        code: airline.substring(0, 3).toUpperCase(),
        logo: null
      }));
    }
  },
  Mutation: {
    bookFlight: (_, { flightId, userId, passengers, class: travelClass, departureDate }) => {
      const flight = flights.find(f => f.id === flightId);
      if (!flight) {
        throw new Error('Flight not found');
      }

      const booking = {
        id: uuidv4(),
        bookingNumber: `BK${Date.now()}`,
        status: 'CONFIRMED',
        userId,
        flight,
        totalPrice: flight.price * passengers,
        bookingDate: new Date().toISOString(),
        passengers,
        class: travelClass,
        departureDate
      };

      bookings.push(booking);
      return booking;
    },
    cancelBooking: (_, { bookingId }) => {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
      booking.status = 'CANCELLED';
      return booking;
    },
    login: (_, { email, password }) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const token = `token_${uuidv4()}`;
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    },
    register: (_, { name, email, password }) => {
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = {
        id: uuidv4(),
        name,
        email,
        password
      };
      users.push(user);
      const token = `token_${uuidv4()}`;
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
  console.log(`📊 GraphQL Playground available at ${url}`);
});

