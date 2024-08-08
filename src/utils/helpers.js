// Function gotten to extract nested json values - This was taken from a stack overflow question

export const getNestedKeyValue = (object, path) => {
  return path.split(".").reduce((o, i) => o?.[i], object);
};
