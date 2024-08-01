import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialFormData,
  passengerTypes,
  travelClasses,
  sortOptions,
  priceRangeConfig,
  getMinDepartureDate,
  getMinReturnDate,
  validateDates,
  validatePassengers,
} from "./RefinementData";

// RefinementForm component receives initialLocation as a prop from the parent component
const RefinementForm = ({ initialLocation }) => {
  const navigate = useNavigate();

  // Initialise form data with default values and the initial location
  const [formData, setFormData] = useState({
    ...initialFormData,
    location: initialLocation,
    priceRange: [0, 1000], // Initial price range
  });

  // State for storing validation errors
  const [errors, setErrors] = useState({});

  // Generic handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Specific handler for price range changes
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      priceRange: [0, value],
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = {};
    if (!validateDates(formData.departureDate, formData.returnDate)) {
      validationErrors.dates = "Invalid date range";
    }
    if (
      !validatePassengers(formData.adults, formData.children, formData.infants)
    ) {
      validationErrors.passengers = "Invalid passenger configuration";
    }

    // If there are validation errors, update the errors state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any existing errors
    setErrors({});

    // Logging search criteria just for testing
    console.log("Search criteria:", formData);

    // This should pass the search criteria to the flights page maybe?
    navigate("/flights", { state: { searchCriteria: formData } });
  };

  return (
    <form onSubmit={handleSubmit} className="refinement-page__form">
      {/* Location Section */}
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

        {/* Date Selection Section */}
        <div className="date-inputs-container">
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

        {/* Passengers Section */}
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
        </div>
      </div>

      {/* Price Range Section */}
      <div className="form-section">
        <div className="form-group">
          <label>Price Range:</label>
          <div className="price-range">
            <input
              type="range"
              name="priceRange"
              value={formData.priceRange[1]}
              onChange={handlePriceRangeChange}
              min={0}
              max={1000}
              step={10}
            />
            <span className="price-display">
              €0 - €{formData.priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Error display section */}
      {Object.keys(errors).length > 0 && (
        <div className="error-section">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="search-button">
        Search Flights
      </button>
    </form>
  );
};

export default RefinementForm;
