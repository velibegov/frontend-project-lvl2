import genDiff from "./src/genDiff.js";

const app = (path1, path2, type) => {
  const format = (typeof type === "object" && type !== null) ? type.format : "stylish";
  return genDiff(path1, path2, format);
};
export default app;
