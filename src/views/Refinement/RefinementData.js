// Initial form data

// These forms have been copy and pasted from forums and a
export const initialFormData = {
  location: "",
  departureDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  infants: 0,
  travelClass: "economy",
  priceRange: [0, 5000],
  sortBy: "price",
};

// Passenger types configuration
export const passengerTypes = [
  { name: "adults", label: "Adults", min: 1, max: 10 },
  { name: "children", label: "Children (2-11)", min: 0, max: 10 },
  { name: "infants", label: "Infants (under 2)", min: 0, max: 5 },
];

// Travel class options
export const travelClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

// Sort options
export const sortOptions = [
  { value: "price", label: "Price" },
  { value: "duration", label: "Duration" },
  { value: "recommended", label: "Recommended" },
];

// Price range configuration
export const priceRangeConfig = {
  min: 0,
  max: 1500,
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
  if (!departureDate) return "";
  const nextDay = new Date(departureDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return formatDate(nextDay);
};

// Validation functions
export const validateDates = (departureDate, returnDate) => {
  if (!departureDate || !returnDate) return true;
  return new Date(returnDate) > new Date(departureDate);
};

export const validatePassengers = (adults, children, infants) => {
  return adults >= 1 && adults + children + infants <= 9 && infants <= adults;
};
