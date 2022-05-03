import * as fs from "fs";
import _ from "lodash";
import YAML from "yaml";
import buildDifference from "./formatters/index.js";

const getFileContent = (path) => {
  const extension = path.split(".").pop();
  if (extension === "json") {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  }
  if (extension === "yaml" || extension === "yml") {
    return YAML.parse(fs.readFileSync(path, "utf-8"));
  }
  return `Unsupported file extension ${extension}`;
};

const makeDifferenceTree = (content1, content2) => {
  const content = { ...content1, ...content2 };
  const keys = Object.keys(content);

  const tree = keys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(content1, key)) {
      return {
        key,
        value: content2[key],
        type: "added",
      };
    }
    if (!Object.prototype.hasOwnProperty.call(content2, key)) {
      return {
        key,
        value: content1[key],
        type: "removed",
      };
    }
    if (typeof content1[key] === "object" && typeof content2[key] === "object") {
      return {
        key,
        type: "parent",
        children: makeDifferenceTree(content1[key], content2[key]),
      };
    }
    if (content1[key] === content2[key]) {
      return {
        key,
        value: content1[key],
        type: "unmodified",
      };
    }
    return {
      key,
      old: content1[key],
      new: content2[key],
      type: "modified",
    };
  });
  return _.sortBy(_.toArray(tree), "key");
};

const genDiff = (path1, path2, format = "stylish") => {
  const diff = makeDifferenceTree(getFileContent(path1), getFileContent(path2));
  return buildDifference(diff, format);
};

export default genDiff;
