import genDiff from "./src/genDiff.js";

const gendiff = (path1, path2, format = "stylish") => genDiff(path1, path2, format);
export default gendiff;
