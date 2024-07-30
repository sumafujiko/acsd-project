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
} from "./RefinementData"; // Is this the best way to import this data? Cleaner way to do it?

const RefinementForm = ({ initialLocation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...initialFormData,
    location: initialLocation,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateDates(formData.departureDate, formData.returnDate)) {
      newErrors.dates = "Return date must be after departure date";
    }

    if (
      !validatePassengers(formData.adults, formData.children, formData.infants)
    ) {
      newErrors.passengers = "Invalid passenger configuration";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Search criteria:", formData);
      navigate("/flights", { state: { searchCriteria: formData } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="refinement-page__form">
      <div className="form-group">
        <label htmlFor="location">Location:</label>
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

      <div className="form-group">
        <label htmlFor="departureDate">Departure Date:</label>
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

      <div className="form-group">
        <label htmlFor="returnDate">Return Date:</label>
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

      <div className="form-group">
        <label>Passengers:</label>
        <div className="passenger-inputs">
          {passengerTypes.map((type) => (
            <div key={type.name}>
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

      <div className="form-group">
        <label>Price Range:</label>
        <input
          type="range"
          name="priceRange"
          value={formData.priceRange[1]}
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "priceRange",
                value: [priceRangeConfig.min, parseInt(e.target.value)],
              },
            })
          }
          min={priceRangeConfig.min}
          max={priceRangeConfig.max}
          step={priceRangeConfig.step}
        />
        <span>
          ${formData.priceRange[0]} - ${formData.priceRange[1]}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={formData.sortBy}
          onChange={handleInputChange}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(errors).map(([key, value]) => (
        <p key={key} className="error-message">
          {value}
        </p>
      ))}

      <button type="submit" className="search-button">
        Search Flights
      </button>
    </form>
  );
};

export default RefinementForm;
