
import React from 'react';
import PropTypes from 'prop-types';

/**
 * SelectedTransferDetails component
 * Displays details of the selected transfer and provides a booking option
 * 
 * @param {Object} props - Component props
 * @param {Object} props.transfer - Details of the selected transfer
 * @param {Function} props.onBook - Callback function to handle booking
 */
const SelectedTransferDetails = ({ transfer, onBook }) => {
  // Check if transfer object is provided
  if (!transfer) {
    return <p className="selected-transfer__error">No transfer selected.</p>;
  }

  return (
    <div className="selected-transfer">
      <h2 className="selected-transfer__title">Selected Transfer Details</h2>
      <div className="selected-transfer__details">
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">Transfer Type:</span> 
          {transfer.type}
        </p>
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">From:</span> 
          {transfer.origin}
        </p>
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">To:</span> 
          {transfer.destination}
        </p>
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">Date:</span> 
          {transfer.date}
        </p>
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">Time:</span> 
          {transfer.time}
        </p>
        <p className="selected-transfer__item">
          <span className="selected-transfer__label">Passengers:</span> 
          {transfer.passengers}
        </p>
        <p className="selected-transfer__price">
          <span className="selected-transfer__label">Total Price:</span> 
          ${transfer.price.toFixed(2)}
        </p>
      </div>
      <button className="selected-transfer__book-btn" onClick={onBook}>Book Now</button>
    </div>
  );
};

// PropTypes for type checking
SelectedTransferDetails.propTypes = {
  transfer: PropTypes.shape({
    type: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    passengers: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }),
  onBook: PropTypes.func.isRequired
};

export default SelectedTransferDetails;