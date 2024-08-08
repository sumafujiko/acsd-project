import * as yup from "yup";

// simple Yup validation object.  We can chain different checks together and pass error messages to these failure state
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
  //there is no explicit check to see whether a number 2 digits so have to do a custom test
  expMonth: yup
    .number()
    .required("Expiry Month is required")
    //pad start as converting to string will change 01 to a 1
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
      "Must be 3 digits",
      (val) => val && val.toString().length === 3
    ),
});

export default cardValidation;
