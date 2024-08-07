// Initial form data
export const initialFormData = {
  location: "",
  departureDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  infants: 0,
  priceRange: [0, 1000],
};

// Passenger type definitions
export const passengerTypes = [
  { name: "adults", label: "Adults", min: 1, max: 9 },
  { name: "children", label: "Children", min: 0, max: 8 },
  { name: "infants", label: "Infants", min: 0, max: 4 },
];

// Passenger limit constants
const MAX_TOTAL_PASSENGERS = 9;
const MIN_ADULTS = 1;

// Price range configuration
export const priceRangeConfig = {
  min: 0,
  max: 1000, // Maximum price range
  step: 100,
};

// Function to format date for input fields
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Function to get minimum date for departure (today)
export const getMinDepartureDate = () => {
  return formatDate(new Date());
};

// Function to get minimum return date (day after departure)
export const getMinReturnDate = (departureDate) => {
  if (!departureDate) return getMinDepartureDate();
  const nextDay = new Date(departureDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return formatDate(nextDay);
};

// Validation function for dates
export const validateDates = (departureDate, returnDate) => {
  if (!departureDate || !returnDate) return true;
  return new Date(returnDate) > new Date(departureDate);
};

// Validation function for passengers
export const validatePassengers = (adults, children, infants) => {
  const totalPassengers = adults + children + infants;

  if (adults < MIN_ADULTS) {
    return {
      valid: false,
      message: `There must be at least ${MIN_ADULTS} adult passenger.`,
    };
  }

  if (totalPassengers > MAX_TOTAL_PASSENGERS) {
    return {
      valid: false,
      message: `Total passengers cannot exceed ${MAX_TOTAL_PASSENGERS}.`,
    };
  }

  if (infants > adults) {
    return {
      valid: false,
      message: "The number of infants cannot exceed the number of adults.",
    };
  }

  for (const type of passengerTypes) {
    const count =
      type.name === "adults"
        ? adults
        : type.name === "children"
        ? children
        : infants;
    if (count < type.min || count > type.max) {
      return {
        valid: false,
        message: `Invalid number of ${type.label.toLowerCase()}.`,
      };
    }
  }

  return { valid: true };
};
