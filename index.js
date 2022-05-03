import genDiff from "./src/genDiff.js";

const app = (path1, path2, format = "stylish") => genDiff(path1, path2, format);
export default app;
