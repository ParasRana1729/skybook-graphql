import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlight } from "../context/FlightContext";
import { useGeolocation } from "../hooks/useGeolocation";
import CityInput from "./CityInput";

const SearchFlights = () => {
  const navigate = useNavigate();
  const { searchData, updateSearchData } = useFlight();
  const { location } = useGeolocation();
  const [formData, setFormData] = useState({
    from: searchData?.from || "",
    to: searchData?.to || "",
    departure: searchData?.departure || "",
    return: searchData?.return || "",
    dateRange: searchData?.dateRange || "7",
    passengers: searchData?.passengers || "",
    class: searchData?.class || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (searchData) {
      setFormData({
        from: searchData.from || "",
        to: searchData.to || "",
        departure: searchData.departure || "",
        return: searchData.return || "",
        dateRange: searchData.dateRange || "7",
        passengers: searchData.passengers || "",
        class: searchData.class || "",
      });
    }
  }, [searchData]);

  useEffect(() => {
    console.log("SearchFlights component mounted");

    return () => {
      console.log("SearchFlights component will unmount");
    };
  }, []);

  useEffect(() => {
    if (formData.departure) {
      console.log("Departure date changed:", formData.departure);
    }
  }, [formData.departure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.from.trim()) {
      newErrors.from = "Departure city is required";
    } else if (data.from.trim().length < 2) {
      newErrors.from = "City name must be at least 2 characters";
    }

    if (!data.to.trim()) {
      newErrors.to = "Destination city is required";
    } else if (data.to.trim().length < 2) {
      newErrors.to = "City name must be at least 2 characters";
    }

    if (
      data.from.trim().toLowerCase() === data.to.trim().toLowerCase() &&
      data.from.trim() !== ""
    ) {
      newErrors.to = "Destination must be different from departure city";
    }

    if (!data.departure) {
      newErrors.departure = "Departure date is required";
    } else {
      const departureDate = new Date(data.departure);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (departureDate < today) {
        newErrors.departure = "Departure date cannot be in the past";
      }
    }

    if (data.return) {
      const returnDate = new Date(data.return);
      const departureDate = new Date(data.departure);

      if (returnDate <= departureDate) {
        newErrors.return = "Return date must be after departure date";
      }
    }

    if (!data.passengers) {
      newErrors.passengers = "Number of passengers is required";
    }

    if (!data.class) {
      newErrors.class = "Travel class is required";
    }

    return newErrors;
  };

  const handleSwapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Submitting search with data:', formData);
    updateSearchData(formData);
    navigate("/search");
    setErrors({});
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="search" className="search-section">
      <div className="container">
        <h3>Search Flights</h3>

        <form onSubmit={handleSubmit} className="flight-form">
          <div style={{ position: 'relative' }}>
            <CityInput
              id="from"
              name="from"
              label="From"
              placeholder="Departure city"
              value={formData.from}
              onChange={handleInputChange}
              error={errors.from}
            />

            <button
              type="button"
              onClick={handleSwapCities}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#60a5fa',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                marginTop: '20px',
                zIndex: 10,
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#60a5fa';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }}
              title="Swap cities"
            >
              ⇄
            </button>
          </div>

          <CityInput
            id="to"
            name="to"
            label="To"
            placeholder="Destination city"
            value={formData.to}
            onChange={handleInputChange}
            error={errors.to}
            fromCity={formData.from}
          />

          <div className="form-group">
            <label htmlFor="departure">Departure Date</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                id="departure"
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
                min={today}
                required
                style={{
                  paddingRight: '45px',
                  colorScheme: 'dark'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                pointerEvents: 'none',
                fontSize: '18px',
                zIndex: 1
              }}>
                📅
              </span>
            </div>
            {errors.departure && (
              <span className="error-message">{errors.departure}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateRange">Search Range (Days)</label>
            <select
              id="dateRange"
              name="dateRange"
              value={formData.dateRange}
              onChange={handleInputChange}
              style={{ colorScheme: 'dark' }}
            >
              <option value="3" style={{ background: '#1e293b', color: '#e2e8f0' }}>±3 days</option>
              <option value="7" style={{ background: '#1e293b', color: '#e2e8f0' }}>±7 days (Recommended)</option>
              <option value="14" style={{ background: '#1e293b', color: '#e2e8f0' }}>±14 days</option>
              <option value="30" style={{ background: '#1e293b', color: '#e2e8f0' }}>±30 days</option>
            </select>
            <small style={{
              display: 'block',
              marginTop: '6px',
              color: '#94a3b8',
              fontSize: '13px',
              fontStyle: 'italic'
            }}>
              Show flights within this range from your departure date
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="return">Return Date (Optional)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                id="return"
                name="return"
                value={formData.return}
                onChange={handleInputChange}
                min={formData.departure || today}
                style={{
                  paddingRight: '45px',
                  colorScheme: 'dark'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                pointerEvents: 'none',
                fontSize: '18px',
                zIndex: 1
              }}>
                📅
              </span>
            </div>
            {errors.return && (
              <span className="error-message">{errors.return}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="passengers">Passengers</label>
            <select
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              required
              style={{ colorScheme: 'dark' }}
            >
              <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>Select passengers</option>
              <option value="1" style={{ background: '#1e293b', color: '#e2e8f0' }}>1 Passenger</option>
              <option value="2" style={{ background: '#1e293b', color: '#e2e8f0' }}>2 Passengers</option>
              <option value="3" style={{ background: '#1e293b', color: '#e2e8f0' }}>3 Passengers</option>
              <option value="4" style={{ background: '#1e293b', color: '#e2e8f0' }}>4 Passengers</option>
              <option value="5" style={{ background: '#1e293b', color: '#e2e8f0' }}>5+ Passengers</option>
            </select>
            {errors.passengers && (
              <span className="error-message">{errors.passengers}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              required
              style={{ colorScheme: 'dark' }}
            >
              <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>Select class</option>
              <option value="economy" style={{ background: '#1e293b', color: '#e2e8f0' }}>Economy</option>
              <option value="business" style={{ background: '#1e293b', color: '#e2e8f0' }}>Business</option>
              <option value="first" style={{ background: '#1e293b', color: '#e2e8f0' }}>First Class</option>
            </select>
            {errors.class && (
              <span className="error-message">{errors.class}</span>
            )}
          </div>

          <button type="submit" className="search-btn">
            Search Flights
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchFlights;
