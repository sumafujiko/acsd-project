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

const RefinementForm = ({ initialLocation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...initialFormData,
    location: initialLocation,
    priceRange: [0, 1000], // Price range slider can be changed here
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      priceRange: [0, value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search criteria:", formData);
    navigate("/flights", { state: { searchCriteria: formData } });
  };

  return (
    <form onSubmit={handleSubmit} className="refinement-page__form">
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

        {/* Wrap date inputs in a container for better alignment */}
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

        {/* Adjust the guest inputs container */}
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

      <button type="submit" className="search-button">
        Search Flights
      </button>
    </form>
  );
};

export default RefinementForm;
