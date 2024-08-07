import * as yup from "yup";

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

// Yup schema for form validation
export const refinementValidation = yup
  .object()
  .shape({
    location: yup.string().required("City is required"),
    departureDate: yup
      .date()
      .min(getMinDepartureDate(), "Departure date cannot be in the past")
      .required("Departure date is required"),
    returnDate: yup
      .date()
      .min(yup.ref("departureDate"), "Return date must be after departure date")
      .required("Return date is required"),
    adults: yup
      .number()
      .min(MIN_ADULTS, `There must be at least ${MIN_ADULTS} adult passenger`)
      .max(9, "Maximum 9 adults allowed")
      .required("Number of adults is required"),
    children: yup
      .number()
      .min(0, "Number of children cannot be negative")
      .max(8, "Maximum 8 children allowed")
      .required("Number of children is required"),
    infants: yup
      .number()
      .min(0, "Number of infants cannot be negative")
      .max(4, "Maximum 4 infants allowed")
      .required("Number of infants is required"),
    priceRange: yup
      .array()
      .of(yup.number())
      .length(2, "Price range must have two values")
      .test(
        "price-range",
        "Invalid price range",
        (value) =>
          value[0] >= priceRangeConfig.min && value[1] <= priceRangeConfig.max
      ),
  })
  .test(
    "total-passengers",
    `Total passengers cannot exceed ${MAX_TOTAL_PASSENGERS}`,
    function (values) {
      const totalPassengers = values.adults + values.children + values.infants;
      return totalPassengers <= MAX_TOTAL_PASSENGERS;
    }
  )
  .test(
    "infants-adults",
    "The number of infants cannot exceed the number of adults",
    function (values) {
      return values.infants <= values.adults;
    }
  );
