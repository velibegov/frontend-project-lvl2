import getStylish from "./Stylish.js";
import getPlain from "./Plain.js";
import getJson from "./Json.js";

const buildDifference = (tree, type) => {
  const format = type ? type.format : "stylish";
  switch (format) {
    case "plain":
      return getPlain(tree);
    case "json":
      return getJson(tree);
    case "stylish":
      return getStylish(tree);
    default:
      return "";
  }
};
export default buildDifference;
