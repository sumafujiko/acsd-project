import React from "react";

/**
 * FAQ Component
 *
 * This component displays a list of frequently asked questions and their answers.
 */
const FAQ = () => {
  // Array of FAQ objects, each containing a question and an answer
  const faqs = [
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel up to 24 hours before your trip for a full refund.",
    },
    {
      question: "How do I change my booking?",
      answer:
        "You can modify your booking through our 'Manage Booking' section using your booking ID.",
    },
    {
      question: "What if my flight is delayed?",
      answer:
        "Our transfer providers monitor flight delays. They will wait for you or reschedule as necessary.",
    },
  ];

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      {/* Map through the faqs array to render each FAQ item */}
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
