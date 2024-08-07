import React from "react";

const TransferDetails = ({ transfer }) => {
  return (
    <div className="transfer-details">
      <p>
        <strong>Transport Type:</strong> {transfer.vehicleType}
      </p>
      <p>
        <strong>Vehicle Desc:</strong> {transfer.vehicleDesc}
      </p>
      <p>
        <strong>Price:</strong> ${transfer.price * 10}
      </p>
    </div>
  );
};

export default TransferDetails;
