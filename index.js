import genDiff from "./src/gendiff.js";

const gendiff = (path1, path2, format = "stylish") => genDiff(path1, path2, format);
export default gendiff;
