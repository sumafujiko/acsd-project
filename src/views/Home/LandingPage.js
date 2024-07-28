import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/landing.scss";
import parisImage from "../../images/landing-destinations-paris.jpg";
import tokyoImage from "../../images/landing-destinations-tokyo.jpg";
import newYorkImage from "../../images/landing-destinations-newyork.jpg";
import heroImage from "../../images/landing-hero-background.jpg";

// Destination data array (AI Generated descriptions)
const destinationsData = [
  {
    name: "Paris",
    imagePath: parisImage,
    credit: 'Image by <a href="https://pixabay.com/users/dnovac-485744/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4011964">Dan Novac</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4011964">Pixabay</a>',
    description: "Experience the romance and charm of the City of Light. From the iconic Eiffel Tower to the artistic Louvre, Paris offers a perfect blend of history, culture, and cuisine."
  },
  {
    name: "Tokyo",
    imagePath: tokyoImage,
    credit: 'Image by <a href="https://pixabay.com/users/pharaoh_ezypt-3065661/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5664836">Pharaoh_EZYPT</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5664836">Pixabay</a>',
    description: "Dive into the futuristic metropolis of Tokyo. A city where ancient traditions meet cutting-edge technology, offering visitors a unique blend of cultural experiences and modern attractions."
  },
  {
    name: "New York",
    imagePath: newYorkImage,
    credit: 'Image by <a href="https://pixabay.com/users/wiggijo-3628174/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1778564">Jo Wiggijo</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1778564">Pixabay</a>',
    description: "Explore the Big Apple, a melting pot of cultures and dreams. From Broadway shows to Central Park, New York City offers endless entertainment and iconic landmarks at every turn."
  }
];

// Reusable component for destination cards
const DestinationCard = ({ destination }) => (
  <div className="landing-page__destination-card">
    <div className="landing-page__destination-image">
      <img src={destination.imagePath} alt={destination.name} />
      <small className="image-credit" dangerouslySetInnerHTML={{ __html: destination.credit }}></small>
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

  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?city=${searchQuery}`);
  };

  return (
    <div className="landing-page">
      {/* Hero section */}
      <section className="landing-page__hero" style={{backgroundImage: `url(${heroImage})`}}>
        <div className="landing-page__hero-content">
          <h1>Discover Your Next Adventure</h1>
          <p>Explore the world with ease</p>
          {/* Will have to change to actually have search functionality, placeholder currently */}
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
          Image by <a href="https://pixabay.com/users/anestiev-2736923/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7429725">Christo Anestev</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7429725">Pixabay</a>
        </div>
      </section>

      {/* Popular destinations section */}
      <section className="landing-page__destinations">
        <h2>Popular Destinations</h2>
        <div className="landing-page__destinations-grid">
          {destinationsData.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </section>

      {/* Why Choose Us section */}
      <section className="landing-page__why-us">
        <div className="landing-page__why-us-content">
          <h2>Why Choose Us</h2>
          <ul>
            {["Best Prices", "24/7 Support", "Flexible Booking"].map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;