import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
      <h2>Terms and Conditions</h2>
      <p>By completing this booking, you agree to the following terms:</p>
      <ul>
        <li>All prices are in USD and include applicable taxes and fees.</li>
        <li>Cancellations made less than 24 hours before the scheduled service are non-refundable.</li>
        <li>We are not responsible for missed flights or connections due to traffic or unforeseen circumstances.</li>
        <li>Luggage allowance may vary depending on the transfer type selected.</li>
      </ul>
      <p>For full terms and conditions, please visit our website.</p>
    </div>
  );
};

export default TermsAndConditions;