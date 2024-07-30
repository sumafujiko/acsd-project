import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/landing.scss";
import { destinationsData } from "./destinationsData";
import heroImage from "../../images/landing-hero-background.jpg";

// Component to render individual destination cards
const DestinationCard = ({ destination }) => (
  <div className="landing-page__destination-card">
    <div className="landing-page__destination-image">
      <img src={destination.imagePath} alt={destination.name} />
      {/* Display image credit information */}
      <div className="image-credit">{destination.credit}</div>
    </div>
    <div className="landing-page__destination-content">
      <h3>{destination.name}</h3>
      <p>{destination.description}</p>
    </div>
  </div>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?city=${searchQuery}`);
  };

  return (
    <div className="landing-page">
      {/* Hero section */}
      <section
        className="landing-page__hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="landing-page__hero-content">
          <h1>Discover Your Next Adventure</h1>
          <p>Explore the world with ease</p>
          {/* Search form */}
          <form className="landing-page__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter a city or country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        {/* Hero image credit */}
        <div className="landing-page__hero-credit">
          Image by Christo Anestev from Pixabay {/* Got rid of the credit links because I dont know how to do effectively do it from extracting destinationData :(( */}
        </div>
      </section>

      {/* Popular destinations section */}
      <section className="landing-page__destinations">
        <h2>Popular Destinations</h2>
        <div className="landing-page__destinations-grid">
          {/* Map through destinationsData to create destinationCard components */}
          {destinationsData.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </section>

      {/* Why Choose Us section */}
      <section className="landing-page__why-us">
        <div className="landing-page__why-us-content">
          <h2>Why Choose Us</h2>
          <h3>Best Prices</h3>
          <p>
            We offer competitive rates and great deals on flights, hotels, and
            vacation packages.
          </p>
          <h3>24/7 Support</h3>
          <p>
            Our dedicated customer service team is available round the clock to
            assist you.
          </p>
          <h3>Flexible Booking</h3>
          <p>
            Enjoy peace of mind with our flexible booking options and easy
            cancellation policies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
