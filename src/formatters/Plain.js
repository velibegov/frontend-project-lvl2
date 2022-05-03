const toString = (value) => {
  const result = typeof value === "object" ? "[complex value]" : JSON.stringify(value);
  if (value === null) {
    return "null";
  }
  return result;
};

const changeQuotes = (value) => value.replace(/"/g, "'");

const getPlain = (differenceTree, parts = []) => {
  const mapped = differenceTree.map((value) => {
    const propertyNameParts = [...parts];
    const merged = propertyNameParts.concat(value.key);
    const propertyName = merged.join(".");
    switch (value.type) {
      case "parent":
        return getPlain(value.children, merged);
      case "modified":
        return `Property '${propertyName}' was updated. From ${toString(value.old)} to ${toString(value.new)}`;
      case "removed":
        return `Property '${propertyName}' was removed`;
      case "added":
        return `Property '${propertyName}' was added with value: ${toString(value.value)}`;
      case "unmodified":
        break;
      default:
        return `Unknown value type ${value.type}`;
    }
    return "";
  });
  return (mapped
    .filter((item) => item !== ""))
    .map((item) => changeQuotes(item))
    .join("\n");
};

export default getPlain;
