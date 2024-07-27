//this was based on work on stack overflow https://stackoverflow.com/questions/77826715/find-and-return-a-data-structures-nested-value-by-a-given-keypath
export const getNestedKeyValue = (object, path) => {
  return path.split(".").reduce((o, i) => o?.[i], object);
};
