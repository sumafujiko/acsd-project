
import React from 'react';
import { Link } from 'react-router-dom';
import '../../sass/transport.scss';

/**
 * BookingConfirmation component
 * Displays a confirmation message after a successful booking and provides options to view itinerary and add to calendar
 * 
 * @param {Object} props - Component props
 * @param {Object} props.confirmation - Object containing booking confirmation details
 * @param {string} props.confirmation.bookingId - Unique identifier for the booking
 * @param {string} props.confirmation.status - Current status of the booking
 * @param {string} props.confirmation.startDate - Start date of the booking (YYYY-MM-DD format)
 * @param {string} props.confirmation.endDate - End date of the booking (YYYY-MM-DD format)
 */
const BookingConfirmation = ({ confirmation }) => {
  // Error handling: Check if confirmation object exists
  if (!confirmation) {
    return <div className="booking-confirmation__error">Booking information not available.</div>;
  }

  // Destructure confirmation object with default values for error handling
  const { bookingId = 'N/A', status = 'Unknown', startDate = '', endDate = '' } = confirmation;

  /**
   * Generates an .ics file content for calendar event
   * @returns {string} ICS file content
   */
  const generateICSContent = () => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Travel Booking ${bookingId}`,
      `DTSTART:${startDate.replace(/-/g, '')}`,
      `DTEND:${endDate.replace(/-/g, '')}`,
      `DESCRIPTION:Booking ID: ${bookingId}, Status: ${status}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    return event;
  };

  /**
   * Handles adding the event to calendar
   */
  const handleAddToCalendar = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `booking_${bookingId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="booking-confirmation">
      <h2 className="booking-confirmation__title">Booking Confirmed</h2>
      <p className="booking-confirmation__detail">Booking ID: {bookingId}</p>
      <p className="booking-confirmation__detail">Status: {status}</p>
      <Link to={`/confirmation/${bookingId}`} className="booking-confirmation__link">
        View Full Itinerary
      </Link>
      <button onClick={handleAddToCalendar} className="booking-confirmation__calendar-button">
        Add to Calendar
      </button>
    </div>
  );
};

export default BookingConfirmation;