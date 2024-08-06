
import React from 'react';

/**
 * TransportTips component
 * Displays a list of travel tips related to transportation
 */
const TransportTips = () => {
  // Array of travel tips
  const tips = [
    { id: 1, text: "Book your transfer in advance to ensure availability" },
    { id: 2, text: "Check the luggage allowance for your chosen transfer option" },
    { id: 3, text: "Have your booking confirmation readily available" },
    { id: 4, text: "Arrive at the pickup location a few minutes early" },
    { id: 5, text: "Keep local emergency numbers handy" },
    { id: 6, text: "Familiarize yourself with local transportation options at your destination" },
    { id: 7, text: "Consider travel insurance for added peace of mind" }
  ];

  return (
    <div className="transport-tips">
      <h2 className="transport-tips__title">Travel Tips</h2>
      <ul className="transport-tips__list">
        {tips.map((tip) => (
          <li key={tip.id} className="transport-tips__item">{tip.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransportTips;