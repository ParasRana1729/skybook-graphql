export const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Los Angeles",
  "Dubai",
  "Singapore",
  "Hong Kong",
  "Bangkok",
  "Mumbai",
  "Delhi",
  "Shanghai",
  "Beijing",
  "Seoul",
  "Frankfurt",
  "Amsterdam",
  "Rome",
  "Madrid",
  "Berlin",
  "Vienna",
  "Zurich",
  "Toronto",
  "Vancouver",
  "Mexico City",
  "São Paulo",
  "Buenos Aires",
  "Cairo",
  "Johannesburg",
  "Istanbul"
];

export const getCitySuggestions = (query) => {
  if (!query || query.length < 1) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return cities
    .filter(city => city.toLowerCase().includes(lowerQuery))
    .slice(0, 5);
};

export const getPopularDestinations = (fromCity) => {
  const popularRoutes = {
    "New York": ["London", "Paris", "Los Angeles", "Tokyo", "Dubai"],
    "London": ["Paris", "New York", "Dubai", "Tokyo", "Amsterdam"],
    "Paris": ["London", "New York", "Rome", "Madrid", "Dubai"],
    "Tokyo": ["New York", "Seoul", "Singapore", "Sydney", "Los Angeles"],
    "Sydney": ["Tokyo", "Los Angeles", "Singapore", "Dubai", "London"],
    "Los Angeles": ["New York", "Tokyo", "London", "Sydney", "Paris"]
  };

  return popularRoutes[fromCity] || ["London", "Paris", "New York", "Tokyo", "Dubai"];
};

