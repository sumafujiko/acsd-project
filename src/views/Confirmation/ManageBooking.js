
import React, { useState } from 'react';

/**
 * ManageBooking Component
 * 
 * This component provides an interface for users to manage their booking,
 * specifically to request their booking details via email.
 * 
 * @param {Object} props - Component props
 * @param {string} props.bookingId - The ID of the booking to be managed
 */
const ManageBooking = ({ bookingId }) => {
  // State to store the email input
  const [email, setEmail] = useState('');

  /**
   * Handles the form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Sending booking details for ID ${bookingId} to ${email}`);
  };

  return (
    <div className="manage-booking">
      <h2>Manage Your Booking</h2>
      <p>Your Booking ID: {bookingId}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email your booking details:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address for booking details"
        />
        <button type="submit">Send Details</button>
      </form>
    </div>
  );
};

export default ManageBooking;