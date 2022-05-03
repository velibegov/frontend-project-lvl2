import genDiff from "./src/genDiff.js";

const app = (path1, path2, type) => {
  const format = type ? type.format : "stylish";
  return genDiff(path1, path2, format);
};
export default app;
