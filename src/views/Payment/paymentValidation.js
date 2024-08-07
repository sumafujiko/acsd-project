import * as yup from "yup";

const cardValidation = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .max(100, "Should not be more than 100 Chars")
    .min(2, "Must be 2 characters or longer"),
  cardNumber: yup
    .number()
    .required("Card Number is required")
    .test(
      "length",
      "Must be 12 digits",
      (val) => val && val.toString().padStart(2, "0").length === 12
    ),
  expMonth: yup
    .number()
    .required("Expiry Month is required")
    .test(
      "length",
      "Exp Month Must be 2 digits",
      (val) => val && val.toString().padStart(2, "0").length === 2
    ),
  expYear: yup
    .number()
    .required("Expiry Year is required")
    .test(
      "length",
      "Exp Year Must be 2 digits",
      (val) => val && val.toString().length === 2
    )
    .min(
      new Date(Date.now()).getFullYear().toString().slice(2),
      "Exp Year can't be in the past"
    ),
  cvc: yup
    .number()
    .required("CVC is required")
    .test(
      "length",
      "Must be 12 digits",
      (val) => val && val.toString().length === 3
    ),
});

export default cardValidation;
