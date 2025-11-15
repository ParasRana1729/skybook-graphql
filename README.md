# ✈️ SkyBook - Flight Booking Application

A modern, responsive flight booking web application built with React. SkyBook allows users to search for flights, view available options, and explore airline information with an elegant and intuitive user interface.

https://skybook-graphql.vercel.app/

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Components](#components)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Flight Search**: Search for flights by origin, destination, date, and passenger count
- **Real-time Results**: View available flights with details including:
  - Airline information
  - Departure and arrival times
  - Flight duration
  - Pricing
- **User Authentication**: Login/Register functionality with local storage persistence
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Fleet Information**: Browse the airline's fleet with detailed aircraft information
- **About Section**: Learn more about the airline and its services
- **Smooth Navigation**: Seamless scrolling and user-friendly interface

## 🎮 Demo

The application features several sections:
- **Hero Section**: Eye-catching landing page with call-to-action
- **Search Flights**: Interactive search form with validation
- **Flight Results**: Dynamic display of available flights based on search criteria
- **About Us**: Information about the airline
- **Our Fleet**: Showcase of available aircraft

## 🛠 Technologies Used

- **React 18.2.0** - Frontend library for building user interfaces
- **React Hooks** - useState, useEffect for state management
- **CSS3** - Modern styling with flexbox and grid layouts
- **Local Storage** - Client-side data persistence for user sessions
- **React Scripts 5.0.1** - Build tooling and development server

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skybook-react.git
```

2. Navigate to the project directory:
```bash
cd skybook-react
```

3. Install dependencies:
```bash
npm install
```
or if you're using yarn:
```bash
yarn install
```

### Running the Application

1. Start the development server:
```bash
npm start
```
or
```bash
yarn start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

The application will automatically reload if you make changes to the code.

## 📁 Project Structure

```
skybook-react/
├── public/
│   ├── images/          # Image assets
│   └── index.html       # HTML template
├── src/
│   ├── components/      # React components
│   │   ├── About.js
│   │   ├── AuthModal.js
│   │   ├── Fleet.js
│   │   ├── FlightCard.js
│   │   ├── FlightResults.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   └── SearchFlights.js
│   ├── App.js           # Main application component
│   ├── App.css          # Application styles
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```

## 🧩 Components

### Core Components

- **Header**: Navigation bar with logo and authentication controls
- **Hero**: Landing section with hero image and main headline
- **SearchFlights**: Flight search form with input validation
- **FlightResults**: Displays filtered flight results
- **FlightCard**: Individual flight information card
- **AuthModal**: Login/Register modal dialog
- **About**: Company information section
- **Fleet**: Aircraft fleet showcase
- **Footer**: Footer with links and copyright information

### State Management

The application uses React hooks for state management:
- `currentUser` - Stores logged-in user information
- `flights` - Stores flight search results
- `searchData` - Stores current search parameters
- `showResults` - Controls visibility of results section
- `showAuthModal` - Controls authentication modal visibility

## 💡 Usage

### Searching for Flights

1. Enter your departure city in the "From" field
2. Enter your destination city in the "To" field
3. Select your departure date
4. Choose the number of passengers
5. Click "Search Flights"
6. Browse the results displayed below

### User Authentication

1. Click "Login" in the header
2. Choose between Login or Register tabs
3. Enter your credentials
4. Submit the form
5. Your session will be saved to local storage

### Available Flight Routes

The application currently includes sample flights for the following routes:
- New York ↔ London
- London ↔ Paris
- Paris ↔ Tokyo

## 🔮 Future Enhancements

- [ ] Backend API integration for real flight data
- [ ] Payment gateway integration
- [ ] Booking history and user dashboard
- [ ] Email confirmation for bookings
- [ ] Advanced filters (price range, airlines, stops)
- [ ] Multi-city and round-trip booking options
- [ ] Seat selection interface
- [ ] Real-time price updates
- [ ] Integration with third-party flight APIs
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- All contributors who help improve this project
- Icons and images from various free resources

---

**Note**: This is a demo application for educational purposes. Flight data is simulated and not connected to real booking systems.

For questions or support, please open an issue on GitHub.
