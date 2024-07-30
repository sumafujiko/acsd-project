import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/refinement.scss";

const Refinement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { city: initialCity } = location.state || {};

  const [formData, setFormData] = useState({
    city: initialCity || "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    priceRange: [0, 5000],
    sortBy: "price",
  });

  useEffect(() => {
    if (initialCity) {
      setFormData((prevState) => ({ ...prevState, city: initialCity }));
    }
  }, [initialCity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (values) => {
    setFormData((prevState) => ({
      ...prevState,
      priceRange: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search criteria:", formData);
    navigate("/flights", { state: { searchCriteria: formData } });
  };

  return (
    <div className="refinement-page">
      <div className="refinement-page__container">
        <h1 className="refinement-page__title">Refine Your Search</h1>
        <form onSubmit={handleSubmit} className="refinement-page__form">
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter a city or country"
                required
              />
              <span className="icon">🔍</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="departureDate">Departure:</label>
            <div className="input-with-icon">
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                required
              />
              <span className="icon">📅</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">Return:</label>
            <div className="input-with-icon">
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                required
              />
              <span className="icon">📅</span>
            </div>
          </div>

          <div className="form-group">
            <label>Guests:</label>
            <div className="guest-inputs">
              <div>
                <label>Adults</label>
                <input
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label>Children</label>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label>Infants</label>
                <input
                  type="number"
                  name="infants"
                  value={formData.infants}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Price Range:</label>
            <div className="price-range-slider">
              <input
                type="range"
                min="0"
                max="5000"
                value={formData.priceRange[1]}
                onChange={(e) =>
                  handlePriceRangeChange([
                    formData.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
              />
              <span>
                ${formData.priceRange[0]} - ${formData.priceRange[1]}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              name="sortBy"
              value={formData.sortBy}
              onChange={handleInputChange}
            >
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <button type="submit" className="search-button">
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
};

export default Refinement;
