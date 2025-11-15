import React, { useState, useRef, useEffect } from 'react';
import { getCitySuggestions, getPopularDestinations } from '../utils/cities';

const CityInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  fromCity = null
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (value && value.length > 0) {
      const citySuggestions = getCitySuggestions(value);
      setSuggestions(citySuggestions);
      setShowSuggestions(citySuggestions.length > 0);
    } else {
      if (fromCity && name === 'to') {
        const popular = getPopularDestinations(fromCity);
        setSuggestions(popular);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }, [value, fromCity, name]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    onChange(e);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (city) => {
    const syntheticEvent = {
      target: {
        name,
        value: city
      }
    };
    onChange(syntheticEvent);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const isPopular = fromCity && name === 'to' && !value;

  const inputBorderColor = error
    ? '#dc3545'
    : name === 'from'
      ? '#60a5fa'
      : '#475569';

  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label htmlFor={id} style={{
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#cbd5e1',
        fontSize: '0.95rem'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0 || (fromCity && name === 'to')) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
          required
          autoComplete="off"
          style={{
            width: '100%',
            padding: '14px 16px',
            paddingRight: name === 'from' ? '50px' : '45px',
            border: error ? '2px solid #dc3545' : `2px solid ${inputBorderColor}`,
            borderRadius: '10px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
            color: '#e2e8f0',
            fontWeight: '500'
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.2), 0 4px 12px rgba(96, 165, 250, 0.15)';
              e.target.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)';
              e.target.style.transform = 'translateY(-1px)';
            }
            if (suggestions.length > 0 || (fromCity && name === 'to')) {
              setShowSuggestions(true);
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = inputBorderColor;
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        />
        {name !== 'from' && (
          <span style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#60a5fa',
            pointerEvents: 'none',
            fontSize: '18px'
          }}>
            ✈️
          </span>
        )}
      </div>
      {error && (
        <span className="error-message" style={{
          display: 'block',
          color: '#dc3545',
          fontSize: '14px',
          marginTop: '6px',
          fontWeight: '500'
        }}>
          {error}
        </span>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="city-suggestions"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            marginTop: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            listStyle: 'none',
            padding: '6px 0',
            margin: 0,
            animation: 'slideDown 0.2s ease-out'
          }}
        >
          {isPopular && (
            <div style={{
              padding: '10px 16px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '4px',
              backgroundColor: '#334155'
            }}>
              Popular Destinations
            </div>
          )}
          {suggestions.map((city, index) => (
            <div
              key={city}
              onClick={() => handleSuggestionClick(city)}
              style={{
                padding: '14px 20px',
                cursor: 'pointer',
                backgroundColor: index === highlightedIndex ? '#334155' : '#1e293b',
                borderLeft: index === highlightedIndex ? '4px solid #60a5fa' : '4px solid transparent',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              <span style={{
                fontSize: '18px',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center'
              }}>
                📍
              </span>
              <span style={{
                fontSize: '15px',
                color: index === highlightedIndex ? '#f1f5f9' : '#cbd5e1',
                fontWeight: index === highlightedIndex ? '600' : '500'
              }}>
                {city}
              </span>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .city-suggestions::-webkit-scrollbar {
          width: 6px;
        }
        .city-suggestions::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .city-suggestions::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .city-suggestions::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default CityInput;
