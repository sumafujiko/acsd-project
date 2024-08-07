import React from "react";
import PropTypes from "prop-types";

import "../../sass/transferResults.scss";

/**
 * TransferResults component
 * Displays a list of available transfer options and allows selection
 *
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of transfer options
 * @param {Function} props.onSelect - Callback function when a transfer is selected
 */
const TransferResults = ({ results, onSelect }) => {
  // Check if results array is empty
  if (!results || results.length === 0) {
    return (
      <p className="transfer-results__empty">No transfer options available.</p>
    );
  }

  return (
    <div className="transfer-results">
      <h2 className="transfer-results__title">Available Transfers</h2>
      <div className="transfer-results__list">
        {results.map((transfer, index) => (
          <div key={transfer.id || index} className="transfer-option">
            <h3 className="transfer-option__type">{transfer.vehicle}</h3>
            <p className="transfer-option__detail">
              From: {transfer.vehicleDesc}
            </p>
            <p className="transfer-option__detail">
              Date: {new Date(transfer.startDateTime).toLocaleDateString()}
            </p>
            <p className="transfer-option__price">Price: €{transfer.price}</p>
            <button
              className="transfer-option__select-btn"
              onClick={() => onSelect(transfer)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes for type checking
TransferResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      start: PropTypes.string,
      vehicle: PropTypes.string,
      vehicleDesc: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TransferResults;
