# SkyBook Flight Booking - Complete Viva Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [React Fundamentals](#react-fundamentals)
3. [GraphQL Deep Dive](#graphql-deep-dive)
4. [React Router](#react-router)
5. [Context API](#context-api)
6. [Custom Hooks](#custom-hooks)
7. [Browser APIs](#browser-apis)
8. [Project Architecture](#project-architecture)
9. [Key Concepts Explained](#key-concepts-explained)
10. [Common Viva Questions](#common-viva-questions)

---

## Project Overview

### What is SkyBook?
SkyBook is a modern flight booking web application built with React and GraphQL. It allows users to:
- Search for flights by origin, destination, and date
- View available flights with details
- Book flights (requires authentication)
- View booking history
- Manage their account

### Technology Stack
- **Frontend**: React 18.2.0
- **Data Fetching**: GraphQL with Apollo Client
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App (CRA)
- **Backend**: Mock GraphQL Server (Apollo Server)

### Key Features
- **Flight Search**: Search with city autocomplete and suggestions
- **Date Range Search**: Search flights within ±3, ±7, ±14, or ±30 days from departure date
- **Advanced Filtering**: Filter by price range and airline
- **Sorting Options**: Sort by price, duration, or departure date
- **User Authentication**: Login/Register with JWT tokens
- **Booking Management**: View and cancel bookings
- **Responsive Design**: Works on all screen sizes
- **Enhanced UI**: Modern, polished interface with animations and visual feedback

---

## React Fundamentals

### What is React?
React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by Meta.

### Key React Concepts

#### 1. Components
Components are the building blocks of React applications. They are reusable pieces of code that return JSX (JavaScript XML) to describe what should appear on the screen.

**Example from our project:**
```javascript
const FlightCard = ({ flight, searchData }) => {
  return (
    <div className="flight-card">
      <h4>{flight.airline}</h4>
      <p>{flight.from} → {flight.to}</p>
    </div>
  );
};
```

**Why Components?**
- Reusability: Write once, use many times
- Maintainability: Easy to update and debug
- Separation of Concerns: Each component has a specific purpose

#### 2. JSX (JavaScript XML)
JSX is a syntax extension that allows you to write HTML-like code in JavaScript.

**Example:**
```javascript
const element = <h1>Hello, World!</h1>;
```

**Why JSX?**
- More readable than pure JavaScript
- Combines HTML structure with JavaScript logic
- React converts JSX to JavaScript function calls

#### 3. Props (Properties)
Props are how data flows from parent components to child components. They are read-only.

**Example:**
```javascript
// Parent component
<FlightCard flight={flightData} searchData={searchParams} />

// Child component receives props
const FlightCard = ({ flight, searchData }) => {
  // Use flight and searchData here
};
```

**Key Points:**
- Props are immutable (cannot be changed by child)
- Props flow down (parent → child)
- Used to pass data and functions

#### 4. State
State is data that can change over time. When state changes, React re-renders the component.

**Example:**
```javascript
const [count, setCount] = useState(0);

// count is the current value
// setCount is the function to update it
```

**State vs Props:**
- **Props**: Data passed from parent (immutable)
- **State**: Data managed within component (mutable)

#### 5. React Hooks

Hooks are functions that let you "hook into" React features. They start with `use`.

##### useState Hook
Manages component state.

```javascript
const [user, setUser] = useState(null);

// Update state
setUser({ name: "John", email: "john@example.com" });
```

**In our project:**
- `SearchFlights` uses `useState` for form data
- `AuthModal` uses `useState` for login/register data
- `FlightCard` uses `useState` for booking status

##### useEffect Hook
Performs side effects (API calls, subscriptions, DOM manipulation).

```javascript
useEffect(() => {
  // This runs after component mounts
  fetchData();

  // Cleanup function (optional)
  return () => {
    // Cleanup code
  };
}, [dependencies]); // Empty array = run once
```

**In our project:**
- `AuthContext` uses `useEffect` to load user from localStorage
- `SearchFlights` uses `useEffect` to log component lifecycle

**When does useEffect run?**
- After every render (if no dependency array)
- Once after mount (if empty array `[]`)
- When dependencies change (if array has values)

##### useContext Hook
Accesses React Context values.

```javascript
const { user, login, logout } = useAuth();
```

**In our project:**
- `Header` uses `useAuth()` to get current user
- `FlightCard` uses `useAuth()` to check authentication

#### 6. Component Lifecycle

React components have a lifecycle with three main phases:

1. **Mounting**: Component is created and inserted into DOM
2. **Updating**: Component re-renders due to state/props changes
3. **Unmounting**: Component is removed from DOM

**Lifecycle with Hooks:**
```javascript
useEffect(() => {
  // Component mounted
  console.log("Component mounted");

  return () => {
    // Component will unmount
    console.log("Component unmounting");
  };
}, []);
```

#### 7. Event Handling

React uses synthetic events (wrapper around native events).

```javascript
const handleClick = (e) => {
  e.preventDefault(); // Prevent default behavior
  console.log("Button clicked");
};

<button onClick={handleClick}>Click me</button>
```

**In our project:**
- Form submissions: `onSubmit={handleSubmit}`
- Button clicks: `onClick={handleBookClick}`
- Input changes: `onChange={handleInputChange}`

#### 8. Conditional Rendering

Display different content based on conditions.

```javascript
{isAuthenticated ? (
  <UserDashboard />
) : (
  <LoginForm />
)}
```

**In our project:**
- `Header` conditionally shows "My Bookings" link
- `FlightResults` conditionally shows loading/error/content

#### 9. Lists and Keys

Render lists of items.

```javascript
{flights.map((flight) => (
  <FlightCard key={flight.id} flight={flight} />
))}
```

**Why keys?**
- Help React identify which items changed
- Improve performance during re-renders
- Must be unique among siblings

---

## GraphQL Deep Dive

### What is GraphQL?
GraphQL is a query language for APIs and a runtime for executing those queries. It was developed by Facebook in 2012 and open-sourced in 2015.

### GraphQL vs REST API

#### REST API Problems:
1. **Over-fetching**: Get more data than needed
   - Example: Fetching user profile returns all fields even if you only need name
2. **Under-fetching**: Need multiple requests
   - Example: Get user, then get posts, then get comments (3 requests)
3. **Fixed endpoints**: Server defines what you get
   - Example: `/api/users/1` always returns same structure

#### GraphQL Solutions:
1. **Fetch exactly what you need**: Specify fields in query
2. **Single endpoint**: One request gets all related data
3. **Client defines structure**: Request only needed fields

### GraphQL Core Concepts

#### 1. Schema
Schema defines the structure of your data and operations.

```graphql
type Flight {
  id: ID!
  airline: String!
  from: String!
  to: String!
  price: Int!
}
```

**Type System:**
- `String`: Text data
- `Int`: Integer numbers
- `ID`: Unique identifier
- `!`: Required field (non-nullable)
- `[Type]`: Array of that type

#### 2. Queries
Queries are read operations (like GET in REST).

```graphql
query GetFlights($from: String, $to: String, $departureDate: String, $dateRange: Int) {
  flights(from: $from, to: $to, departureDate: $departureDate, dateRange: $dateRange) {
    id
    airline
    from
    to
    departureDate
    departureTime
    arrivalDate
    arrivalTime
    price
  }
}
```

**In our project:**
- `GET_FLIGHTS`: Fetch flights with optional filters (city, date range)
- `GET_FLIGHT`: Fetch single flight details
- `GET_USER_BOOKINGS`: Fetch user's booking history

**Query Structure:**
```graphql
query QueryName($variable: Type) {
  fieldName(argument: $variable) {
    subField1
    subField2
  }
}
```

#### 3. Mutations
Mutations are write operations (like POST/PUT/DELETE in REST).

```graphql
mutation BookFlight($flightId: ID!, $userId: ID!) {
  bookFlight(flightId: $flightId, userId: $userId) {
    id
    bookingNumber
    status
  }
}
```

**In our project:**
- `BOOK_FLIGHT`: Create a new booking
- `CANCEL_BOOKING`: Cancel an existing booking
- `LOGIN_USER`: Authenticate user
- `REGISTER_USER`: Create new user account

**Mutation Structure:**
```graphql
mutation MutationName($variable: Type!) {
  mutationName(argument: $variable) {
    returnField1
    returnField2
  }
}
```

#### 4. Resolvers
Resolvers are functions that handle GraphQL operations.

```javascript
const resolvers = {
  Query: {
    flights: (parent, args, context) => {
      // Return flights based on args
      return filterFlights(args.from, args.to);
    }
  },
  Mutation: {
    bookFlight: (parent, args, context) => {
      // Create booking
      return createBooking(args);
    }
  }
};
```

**Resolver Function Signature:**
- `parent`: Result from parent resolver
- `args`: Arguments passed to the field
- `context`: Shared context (auth, database, etc.)

### Apollo Client

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.

#### Why Apollo Client?
1. **Caching**: Automatically caches query results
2. **Loading States**: Built-in loading indicators
3. **Error Handling**: Automatic error management
4. **Optimistic Updates**: Update UI before server responds
5. **Real-time**: Subscriptions for live data

#### Apollo Client Setup

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

**Components:**
- `httpLink`: Connects to GraphQL server
- `InMemoryCache`: Stores query results
- `ApolloProvider`: Wraps app to provide client

#### Using Queries in Components

```javascript
import { useQuery } from '@apollo/client';
import { GET_FLIGHTS } from '../graphql/queries';

const FlightResults = () => {
  const { data, loading, error } = useQuery(GET_FLIGHTS, {
    variables: { from: 'New York', to: 'London' }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.flights.map(flight => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};
```

**useQuery Hook Returns:**
- `data`: Query result
- `loading`: Boolean indicating loading state
- `error`: Error object if query failed
- `refetch`: Function to manually refetch

#### Using Mutations in Components

```javascript
import { useMutation } from '@apollo/client';
import { BOOK_FLIGHT } from '../graphql/mutations';

const FlightCard = ({ flight }) => {
  const [bookFlight, { loading, error }] = useMutation(BOOK_FLIGHT, {
    onCompleted: (data) => {
      alert(`Booked! ${data.bookFlight.bookingNumber}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const handleBook = () => {
    bookFlight({
      variables: {
        flightId: flight.id,
        userId: user.id
      }
    });
  };

  return (
    <button onClick={handleBook} disabled={loading}>
      {loading ? 'Booking...' : 'Book Now'}
    </button>
  );
};
```

**useMutation Hook Returns:**
- `[mutationFunction, { loading, error, data }]`
- `mutationFunction`: Call this to execute mutation
- `loading`: Boolean indicating mutation in progress
- `error`: Error object if mutation failed
- `data`: Mutation result

#### Apollo Client Cache

Apollo Client automatically caches query results.

**Benefits:**
- Faster subsequent loads
- Offline support
- Reduced server requests

**Cache Updates:**
```javascript
const [bookFlight] = useMutation(BOOK_FLIGHT, {
  refetchQueries: ['GetUserBookings'], // Refetch after mutation
  update: (cache, { data }) => {
    // Manually update cache
    cache.writeQuery({
      query: GET_USER_BOOKINGS,
      data: { userBookings: [...existing, data.bookFlight] }
    });
  }
});
```

### GraphQL Server (Our Implementation)

Our mock server uses Apollo Server.

#### Type Definitions (Schema)

```javascript
const typeDefs = gql`
  type Flight {
    id: ID!
    airline: String!
    from: String!
    to: String!
    price: Int!
  }

  type Query {
    flights(from: String, to: String): [Flight]
  }

  type Mutation {
    bookFlight(flightId: ID!, userId: ID!): Booking
  }
`;
```

#### Resolvers

```javascript
const resolvers = {
  Query: {
    flights: (_, { from, to, departureDate, dateRange = 7 }) => {
      let filtered = [...flights];

      // Filter by city
      if (from) {
        filtered = filtered.filter(f =>
          f.from.toLowerCase().includes(from.toLowerCase())
        );
      }
      if (to) {
        filtered = filtered.filter(f =>
          f.to.toLowerCase().includes(to.toLowerCase())
        );
      }

      // Filter by date range
      if (departureDate) {
        const searchDate = new Date(departureDate);
        filtered = filtered.filter(f => {
          const flightDate = new Date(f.departureDate);
          const daysDiff = Math.abs((flightDate - searchDate) / (1000 * 60 * 60 * 24));
          return daysDiff <= dateRange;
        });
      }

      return filtered;
    }
  },
  Mutation: {
    bookFlight: (_, { flightId, userId }) => {
      // Create booking
      return createBooking(flightId, userId);
    }
  }
};
```

#### Server Setup

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['http://localhost:3000']
  }
});

server.listen(4000);
```

---

## React Router

### What is React Router?
React Router is a library for routing in React applications. It enables navigation without page refreshes (Single Page Application - SPA).

### Why React Router?
- **Client-side routing**: No full page reloads
- **URL-based navigation**: Browser back/forward buttons work
- **Nested routes**: Organize complex UIs
- **Protected routes**: Restrict access to certain pages

### Basic Setup

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Components

#### BrowserRouter
Wraps the application and enables routing.

```javascript
<BrowserRouter>
  {/* Your app */}
</BrowserRouter>
```

#### Routes
Container for Route components. Renders the first matching route.

```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

#### Route
Defines a route mapping.

```javascript
<Route path="/search" element={<SearchPage />} />
```

**Props:**
- `path`: URL path to match
- `element`: Component to render

#### Link
Navigation link (replaces `<a>` tags).

```javascript
<Link to="/search">Search Flights</Link>
```

**Why Link instead of `<a>`?**
- Prevents full page reload
- Faster navigation
- Maintains React state

#### NavLink
Link with active state styling.

```javascript
<NavLink to="/search" className={({ isActive }) =>
  isActive ? 'active' : ''
}>
  Search
</NavLink>
```

**In our project:**
- `Header` uses `NavLink` for navigation
- Active route gets highlighted

#### useNavigate Hook
Programmatic navigation.

```javascript
import { useNavigate } from 'react-router-dom';

const SearchFlights = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Navigate to search page
    navigate('/search');
  };
};
```

**In our project:**
- `SearchFlights` navigates to `/search` after form submission
- `FlightCard` navigates to `/bookings` after booking

### Route Parameters

```javascript
<Route path="/flight/:id" element={<FlightDetails />} />

// In component
import { useParams } from 'react-router-dom';

const FlightDetails = () => {
  const { id } = useParams();
  // Use id to fetch flight details
};
```

### Query Parameters

```javascript
// URL: /search?from=NYC&to=LON
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
};
```

### Protected Routes

```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Usage
<Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <BookingsPage />
    </ProtectedRoute>
  }
/>
```

---

## Context API

### What is Context API?
Context API is React's built-in solution for sharing state across multiple components without prop drilling.

### Problem: Prop Drilling

**Without Context:**
```javascript
// App.js
const [user, setUser] = useState(null);

// Header.js
<Header user={user} setUser={setUser} />

// UserMenu.js (nested in Header)
<UserMenu user={user} setUser={setUser} />

// UserProfile.js (nested in UserMenu)
<UserProfile user={user} setUser={setUser} />
```

**Problems:**
- Pass props through components that don't need them
- Hard to maintain
- Tight coupling

### Solution: Context API

**With Context:**
```javascript
// Any component can access user
const { user, setUser } = useAuth();
```

### Creating Context

```javascript
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Using Context

```javascript
// Wrap app
<AuthProvider>
  <App />
</AuthProvider>

// Use in any component
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};
```

### Context in Our Project

#### AuthContext
Manages authentication state globally.

**Provides:**
- `user`: Current user object
- `login(userData, token)`: Login function
- `logout()`: Logout function
- `isAuthenticated`: Boolean
- `loading`: Loading state

**Used in:**
- `Header`: Display user name, logout button
- `AuthModal`: Login/register
- `FlightCard`: Check if user can book
- `BookingsPage`: Check authentication

#### FlightContext
Manages flight search and booking state.

**Provides:**
- `searchData`: Current search parameters
- `selectedFlight`: Currently selected flight
- `bookings`: User's bookings
- `updateSearchData(data)`: Update search
- `selectFlight(flight)`: Select a flight
- `addBooking(booking)`: Add booking
- `removeBooking(id)`: Remove booking

**Used in:**
- `SearchFlights`: Update search data
- `SearchPage`: Access search data
- `FlightCard`: Access selected flight

### When to Use Context?

**Use Context for:**
- Global state (user, theme, language)
- Data needed by many components
- Avoiding prop drilling

**Don't use Context for:**
- Local component state
- Data that changes frequently
- Performance-critical data

---

## Custom Hooks

### What are Custom Hooks?
Custom hooks are JavaScript functions that use React hooks and can be shared between components.

### Rules of Hooks
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Custom hooks must start with `use`

### useGeolocation Hook

```javascript
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
};
```

**Usage:**
```javascript
const SearchFlights = () => {
  const { location, error, loading } = useGeolocation();

  // Use location to auto-fill "From" field
};
```

**Benefits:**
- Reusable across components
- Encapsulates complex logic
- Easy to test

### useLocalStorage Hook

```javascript
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

**Usage:**
```javascript
const [user, setUser] = useLocalStorage('user', null);
```

**Benefits:**
- Automatic localStorage sync
- Type-safe
- Handles errors gracefully

---

## Browser APIs

### What are Browser APIs?
Browser APIs are interfaces provided by web browsers to interact with browser features and device capabilities.

### Geolocation API

**Purpose:** Get user's geographical location.

**In our project:**
```javascript
const { location } = useGeolocation();

// location = { lat: 40.7128, lng: -74.0060 }
```

**Use Cases:**
- Auto-fill departure city
- Show nearby airports
- Calculate distance to destination

**Privacy:**
- Requires user permission
- HTTPS required (except localhost)

### LocalStorage API

**Purpose:** Store data in browser (persists after closing).

**In our project:**
```javascript
// Save user
localStorage.setItem('currentUser', JSON.stringify(user));

// Load user
const user = JSON.parse(localStorage.getItem('currentUser'));

// Remove user
localStorage.removeItem('currentUser');
```

**Characteristics:**
- Stores strings only (use JSON.stringify/parse)
- 5-10MB limit
- Domain-specific
- Persists until cleared

**Use Cases:**
- User authentication tokens
- User preferences
- Shopping cart
- Form drafts

### SessionStorage API

Similar to localStorage but:
- Cleared when tab closes
- Tab-specific (not shared across tabs)

### Other Browser APIs (Not in project but useful)

#### Notification API
```javascript
if (Notification.permission === 'granted') {
  new Notification('Flight booked!', {
    body: 'Your booking is confirmed'
  });
}
```

#### Web Share API
```javascript
if (navigator.share) {
  navigator.share({
    title: 'Check out this flight',
    url: window.location.href
  });
}
```

#### Fetch API
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Project Architecture

### Folder Structure

```
skybook-react-main/
├── public/
│   ├── images/          # Static images
│   └── index.html       # HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Header.js
│   │   ├── SearchFlights.js
│   │   ├── FlightCard.js
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── HomePage.js
│   │   ├── SearchPage.js
│   │   └── BookingsPage.js
│   ├── context/         # Context providers
│   │   ├── AuthContext.js
│   │   └── FlightContext.js
│   ├── graphql/         # GraphQL setup
│   │   ├── client.js
│   │   ├── queries.js
│   │   └── mutations.js
│   ├── hooks/           # Custom hooks
│   │   ├── useGeolocation.js
│   │   └── useLocalStorage.js
│   ├── utils/           # Utility functions
│   │   └── cities.js    # City data and suggestions
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
└── server/              # GraphQL server
    ├── server.js
    └── data/
```

### Data Flow

1. **User Action** → Component Event Handler
2. **Event Handler** → GraphQL Mutation/Query or Context Update
3. **GraphQL** → Server (if needed)
4. **Response** → Update Context/State
5. **State Change** → Component Re-render
6. **Re-render** → Updated UI

### Component Hierarchy

```
App
├── ApolloProvider (GraphQL)
├── AuthProvider (Context)
├── FlightProvider (Context)
├── BrowserRouter (Routing)
│   ├── Header
│   ├── Routes
│   │   ├── HomePage
│   │   │   ├── Hero
│   │   │   ├── SearchFlights
│   │   │   ├── About
│   │   │   └── Fleet
│   │   ├── SearchPage
│   │   │   ├── SearchFlights
│   │   │   ├── CityInput (autocomplete)
│   │   │   └── FlightResults
│   │   │       ├── FlightFilters
│   │   │       └── FlightCard (multiple)
│   │   └── BookingsPage
│   ├── AuthModal
│   └── Footer
```

---

## Key Concepts Explained

### Single Page Application (SPA)

**What is SPA?**
- Application that loads once
- Navigation happens without page reloads
- JavaScript updates content dynamically

**Benefits:**
- Faster navigation
- Better user experience
- Less server load

**How it works:**
- React Router manages URL changes
- Components mount/unmount based on route
- No full page refresh

### Client-Side Rendering (CSR)

**What is CSR?**
- HTML generated in browser
- JavaScript fetches data
- React renders components

**Process:**
1. Browser requests HTML
2. HTML loads (minimal content)
3. JavaScript loads
4. React renders components
5. Components fetch data (GraphQL)
6. UI updates with data

**vs Server-Side Rendering (SSR):**
- **CSR**: Fast navigation, slower initial load
- **SSR**: Faster initial load, slower navigation

### State Management

**Local State (useState):**
- Component-specific
- Not shared

**Context State:**
- Shared across components
- Global state

**Apollo Cache:**
- GraphQL query results
- Automatic caching

### Component Communication

**Parent → Child:** Props
```javascript
<ChildComponent data={data} />
```

**Child → Parent:** Callback functions
```javascript
<ChildComponent onAction={handleAction} />
```

**Any → Any:** Context
```javascript
const { data } = useContext();
```

### Performance Optimization

**React.memo:**
Prevents re-render if props haven't changed.
```javascript
const FlightCard = React.memo(({ flight }) => {
  // Component code
});
```

**useMemo:**
Memoizes expensive calculations.
```javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

**In our project:**
- `FlightResults` uses `useMemo` to memoize filtered and sorted flights
- Prevents recalculating filters on every render
- Only recalculates when flights or filters change

**useCallback:**
Memoizes functions.
```javascript
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);
```

---

## Common Viva Questions

### React Questions

**Q: What is React and why use it?**
A: React is a JavaScript library for building user interfaces. We use it because:
- Component-based architecture (reusable code)
- Virtual DOM (efficient updates)
- Large ecosystem
- Strong community support

**Q: Explain Virtual DOM.**
A: Virtual DOM is a JavaScript representation of the real DOM. React:
1. Creates virtual DOM tree
2. Compares with previous version (diffing)
3. Updates only changed parts (reconciliation)
4. Updates real DOM efficiently

**Q: What are React Hooks?**
A: Hooks are functions that let you use React features in functional components:
- `useState`: Manage state
- `useEffect`: Side effects
- `useContext`: Access context
- Custom hooks: Reusable logic

**Q: Difference between functional and class components?**
A:
- **Functional**: Use hooks, simpler syntax, recommended
- **Class**: Use lifecycle methods, `this` keyword, older approach

**Q: What is JSX?**
A: JSX is syntax extension that lets you write HTML-like code in JavaScript. React converts JSX to `React.createElement()` calls.

**Q: Explain component lifecycle.**
A: Components have three phases:
1. **Mounting**: Component created and added to DOM
2. **Updating**: Component re-renders due to state/props changes
3. **Unmounting**: Component removed from DOM

### GraphQL Questions

**Q: What is GraphQL?**
A: GraphQL is a query language and runtime for APIs. It allows clients to:
- Request exactly the data they need
- Get related data in a single request
- Use a single endpoint

**Q: GraphQL vs REST?**
A:
- **REST**: Multiple endpoints, fixed responses, over/under-fetching
- **GraphQL**: Single endpoint, flexible queries, fetch exactly what you need

**Q: What are Queries and Mutations?**
A:
- **Queries**: Read operations (like GET in REST)
- **Mutations**: Write operations (like POST/PUT/DELETE in REST)

**Q: Explain GraphQL Schema.**
A: Schema defines:
- Types (Flight, User, Booking)
- Fields on each type
- Operations (queries, mutations)
- Relationships between types

**Q: What is Apollo Client?**
A: Apollo Client is a GraphQL client that provides:
- Query/mutation hooks
- Automatic caching
- Loading/error states
- Cache management

**Q: How does Apollo Client cache work?**
A: Apollo Client:
- Stores query results in memory
- Identifies objects by ID
- Automatically updates related queries
- Can be manually updated

### React Router Questions

**Q: What is React Router?**
A: React Router enables client-side routing in React apps. It allows:
- Navigation without page reloads
- URL-based routing
- Browser history support

**Q: Difference between Link and NavLink?**
A:
- **Link**: Basic navigation link
- **NavLink**: Link with active state styling

**Q: What is useNavigate?**
A: `useNavigate` is a hook for programmatic navigation:
```javascript
const navigate = useNavigate();
navigate('/path');
```

### Context API Questions

**Q: What is Context API?**
A: Context API provides a way to share state across components without prop drilling.

**Q: When to use Context?**
A: Use Context for:
- Global state (user, theme)
- Data needed by many components
- Avoiding prop drilling

**Q: How does Context work?**
A:
1. Create context with `createContext()`
2. Provide value with `Context.Provider`
3. Consume with `useContext()` hook

### Project-Specific Questions

**Q: Explain the project architecture.**
A: Our project uses:
- **React**: UI components
- **GraphQL**: Data fetching
- **Apollo Client**: GraphQL client
- **React Router**: Navigation
- **Context API**: Global state
- **Custom Hooks**: Reusable logic

**Q: How does flight booking work?**
A:
1. User searches flights (GraphQL query)
2. Results displayed
3. User clicks "Book Now"
4. GraphQL mutation creates booking
5. Booking saved to server
6. User redirected to bookings page

**Q: How is authentication handled?**
A:
1. User logs in (GraphQL mutation)
2. Server returns JWT token
3. Token stored in localStorage
4. Token added to GraphQL requests (authLink)
5. Context provides user state globally

**Q: What Browser APIs are used?**
A:
- **Geolocation API**: Get user location
- **LocalStorage API**: Persist user data

**Q: How does the search work?**
A:
1. User fills search form with city autocomplete suggestions
2. User selects departure date and date range (±3, ±7, ±14, or ±30 days)
3. Form data stored in FlightContext
4. Navigate to `/search` page
5. SearchPage uses GraphQL query with city filters and date range
6. Server filters flights within the selected date range from departure date
7. Results displayed in FlightResults with filtering and sorting options

**Q: Explain the city autocomplete feature.**
A: The CityInput component provides:
- Real-time city suggestions as user types
- Modern UI with smooth animations and visual feedback
- Icons (airplane in input, location/popular stars for suggestions)
- Keyboard navigation (arrow keys, Enter, Escape)
- Popular destination suggestions when "To" field is empty
- Click outside to close suggestions
- Highlighted selection on hover
- Custom styled scrollbar
- Uses a cities utility file with 30+ major cities

**Q: How do filters work in search results?**
A: FlightFilters component allows users to:
- Filter by price range (min/max sliders)
- Filter by airline (dropdown selection)
- Sort by price (low to high / high to low)
- Sort by duration (shortest / longest)
- Sort by departure date (early / late)
- All filters work together and update results in real-time

**Q: How does date range search work?**
A:
1. User selects a departure date
2. User chooses a date range (±3, ±7, ±14, or ±30 days)
3. GraphQL query includes `departureDate` and `dateRange` parameters
4. Server filters flights where departure date is within the range
5. Example: If departure is Dec 20 and range is ±7 days, shows flights from Dec 13 to Dec 27
6. This allows flexible search instead of exact date matching

**Q: What is the swap cities feature?**
A: A button (⇄) next to the "From" field that:
- Swaps the "From" and "To" city values
- Useful for return trip searches
- Maintains form validation

**Q: Explain the component structure.**
A:
- **Pages**: Full page components (HomePage, SearchPage)
- **Components**: Reusable UI pieces (Header, FlightCard, CityInput, FlightFilters)
- **Context**: Global state providers
- **Hooks**: Reusable logic
- **Utils**: Helper functions (city suggestions, data processing)

**Q: How does the city autocomplete work technically?**
A:
1. CityInput component uses useState for suggestions and highlighted index
2. useEffect watches input value changes and updates suggestions
3. getCitySuggestions() filters cities based on query
4. Shows popular destinations if "To" field is empty (from getPopularDestinations())
5. Handles keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
6. Uses useRef for DOM manipulation and click-outside detection
7. CSS animations for smooth dropdown appearance
8. Custom scrollbar styling for better aesthetics
9. Visual feedback with hover states and border highlighting

**Q: Explain the filtering and sorting implementation.**
A:
1. FlightFilters component manages filter state
2. Filters applied using Array.filter() and Array.sort()
3. useMemo optimizes filtered/sorted results
4. Real-time updates as filters change
5. Supports multiple filters simultaneously
6. parseDuration() helper converts "Xh Ym" to minutes for sorting
7. Date-based sorting uses Date objects for accurate comparison
8. Server-side date range filtering reduces client-side processing

---

## Summary

### Key Takeaways

1. **React**: Component-based UI library with hooks for state and effects
2. **GraphQL**: Flexible API query language with single endpoint
3. **Apollo Client**: GraphQL client with caching and hooks
4. **React Router**: Client-side routing for SPAs
5. **Context API**: Global state management without prop drilling
6. **Custom Hooks**: Reusable component logic
7. **Browser APIs**: Native browser features (Geolocation, LocalStorage)

### Project Flow

1. User interacts with UI
2. Component handles event
3. GraphQL query/mutation or Context update
4. State changes
5. Component re-renders
6. UI updates

### Best Practices

1. **Component Structure**: Small, focused components
2. **State Management**: Local state for component, Context for global
3. **Data Fetching**: GraphQL queries for reads, mutations for writes
4. **Error Handling**: Always handle loading and error states
5. **Performance**: Use React.memo, useMemo, useCallback when needed
6. **Code Organization**: Separate concerns (components, context, hooks, graphql, utils)
7. **User Experience**: Provide autocomplete, filters, and sorting for better UX
8. **Reusability**: Create utility functions and custom hooks for common operations

### New Features Added

#### City Autocomplete
- Real-time suggestions as user types
- Modern, polished UI with smooth animations
- Visual feedback with hover states and highlighted selection
- Icons for better visual hierarchy (airplane, location, popular stars)
- Keyboard navigation support (arrow keys, Enter, Escape)
- Popular destinations based on departure city
- Click-outside to close functionality
- Custom styled scrollbar
- Uses utility function `getCitySuggestions()` for filtering

#### Advanced Filtering
- Price range filtering with min/max sliders
- Airline filtering with dropdown selection
- Multiple filters can be applied simultaneously
- Clear all filters option
- Results update in real-time

#### Sorting Options
- Sort by price (ascending/descending)
- Sort by duration (shortest/longest)
- Sort by departure date (early/late)
- Results update instantly
- Uses `useMemo` for performance optimization
- Date-based sorting for accurate chronological ordering

#### Date Range Search
- Flexible date search instead of exact date matching
- User selects departure date and date range (±3, ±7, ±14, or ±30 days)
- Server filters flights within the selected range
- GraphQL query supports `departureDate` and `dateRange` parameters
- Shows flights from multiple days, making search more flexible
- Better user experience for finding available flights

#### Additional Enhancements
- Swap cities button (⇄) for easy return trip search
- Result count display (X of Y flights)
- Expanded flight database (25 flights covering major routes with dates)
- Improved UI with filter panel and modern styling
- Better user experience with suggestions and autocomplete
- Formatted date display in flight cards (e.g., "Dec 20, 2024, 08:30 AM")
- Color-coded seat availability (red if < 10 seats, green otherwise)
- Date range selector with helpful descriptions

---

**Good luck with your viva!** 🚀

Remember:
- Explain concepts clearly
- Use examples from the project
- Show understanding of why, not just what
- Be confident in your knowledge
- Mention the new search features and how they improve UX

