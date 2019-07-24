export const moveElement = (collection, from, to) => {
    const copy = [...collection];
    const [element] = copy.splice(from, 1);
    copy.splice(to, 0, element);
    return copy;
  };
  
  export const findIndex = (collection, predicate) => {
    const element = collection.find(predicate);
    if (!element) {
      throw new Error("Element not found");
    }
    return collection.indexOf(element);
  };
  