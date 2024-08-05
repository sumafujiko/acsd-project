// Function gotten to extract nested json values

export const getNestedKeyValue = (object, path) => {
  return path.split(".").reduce((o, i) => o?.[i], object);
};
