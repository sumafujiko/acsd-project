import React from 'react';

const TransferDetails = ({ transfer }) => {
  return (
    <div className="transfer-details">
      <p><strong>From:</strong> {transfer.origin}</p>
      <p><strong>To:</strong> {transfer.destination}</p>
      <p><strong>Date:</strong> {transfer.date}</p>
      <p><strong>Time:</strong> {transfer.time}</p>
      <p><strong>Passengers:</strong> {transfer.passengers}</p>
      <p><strong>Transfer Type:</strong> {transfer.type}</p>
      <p><strong>Price:</strong> ${transfer.price}</p>
    </div>
  );
};

export default TransferDetails;