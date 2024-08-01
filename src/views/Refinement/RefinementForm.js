import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialFormData,
  passengerTypes,
  priceRangeConfig,
  getMinDepartureDate,
  getMinReturnDate,
  validatePassengers,
} from "../../utils/RefinementData";

// RefinementForm component receives initialLocation as a prop from the parent component
const RefinementForm = ({ initialLocation }) => {
  const navigate = useNavigate();

  // Initialize form data with default values and the initial location
  const [formData, setFormData] = useState({
    ...initialFormData,
    location: initialLocation,
    priceRange: [priceRangeConfig.min, priceRangeConfig.max],
  });

  // State for storing validation errors
  const [errors, setErrors] = useState({});

  // Generic handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "adults" || name === "children" || name === "infants"
          ? parseInt(value) || 0 // Ensure passenger counts are numbers
          : value,
    }));
  };

  // Specific handler for price range changes
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      priceRange: [priceRangeConfig.min, value],
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passengers (Logic in RefinementData.js)
    const passengerValidation = validatePassengers(
      formData.adults,
      formData.children,
      formData.infants
    );

    // If passenger configuration is invalid, set error and stop submission
    if (!passengerValidation.valid) {
      setErrors({ passengers: passengerValidation.message });
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Navigate to the FlightPage with the form data
    navigate("/flights", { state: { searchCriteria: formData } });
  };

  return (
    <form onSubmit={handleSubmit} className="refinement-page__form">
      {/* Location input */}
      <div className="form-section">
        <div className="form-group form-group--city">
          <label htmlFor="location">City:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter a city or country"
            required
          />
        </div>

        {/* Date inputs */}
        <div className="form-section">
          <div className="form-date-container">
            <div className="form-group form-group--date">
              <label htmlFor="departureDate">Departure:</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                min={getMinDepartureDate()}
                required
              />
            </div>

            <div className="form-group form-group--date">
              <label htmlFor="returnDate">Return:</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                min={getMinReturnDate(formData.departureDate)}
                required
              />
            </div>
          </div>
        </div>

        {/* Passenger inputs */}
        <div className="form-group guest-section">
          <label>Guests:</label>
          <div className="guest-inputs">
            {passengerTypes.map((type) => (
              <div key={type.name} className="form-group form-group--guest">
                <label>{type.label}</label>
                <input
                  type="number"
                  name={type.name}
                  value={formData[type.name]}
                  onChange={handleInputChange}
                  min={type.min}
                  max={type.max}
                />
              </div>
            ))}
          </div>
          {/* Display passenger validation error if it pops up */}
          {errors.passengers && (
            <span className="error-message">{errors.passengers}</span>
          )}
        </div>
      </div>

      {/* Price range slider */}
      <div className="form-section">
        <div className="form-group">
          <label>Price Range:</label>
          <div className="price-range">
            <input
              type="range"
              name="priceRange"
              value={formData.priceRange[1]}
              onChange={handlePriceRangeChange}
              min={priceRangeConfig.min}
              max={priceRangeConfig.max}
              step={priceRangeConfig.step}
            />
            <span className="price-display">
              €{formData.priceRange[0]} - €{formData.priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="search-button">
        Search Flights
      </button>
    </form>
  );
};

export default RefinementForm;
