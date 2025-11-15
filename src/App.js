import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client";
import { AuthProvider } from "./context/AuthContext";
import { FlightProvider } from "./context/FlightContext";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <FlightProvider>
          <BrowserRouter>
            <div className="App">
              <Header setShowAuthModal={setShowAuthModal} />

              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/bookings" element={<BookingsPage />} />
                </Routes>
              </main>

              <AuthModal
                show={showAuthModal}
                onClose={() => setShowAuthModal(false)}
              />

              <Footer />
            </div>
          </BrowserRouter>
        </FlightProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
