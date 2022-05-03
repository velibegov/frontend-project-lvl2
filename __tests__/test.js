import * as fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import genDiff from "../src/genDiff.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, ".", "__fixtures__", filename);

const path1 = getFixturePath("file1.json");
const path2 = getFixturePath("file2.json");
const path3 = getFixturePath("file1.yaml");
const path4 = getFixturePath("file2.yaml");

test("json-stylish", () => {
  const expected = fs.readFileSync(getFixturePath("stylishResult"), "utf-8");
  const actual = genDiff(path1, path2, { format: "stylish" });
  expect(actual).toBe(expected);
});

test("json-plain", () => {
  const expected = fs.readFileSync(getFixturePath("plainResult"), "utf-8");
  const actual = genDiff(path1, path2, { format: "plain" });
  expect(actual).toBe(expected);
});

test("json-json", () => {
  const expected = fs.readFileSync(getFixturePath("jsonResult"), "utf-8");
  const actual = genDiff(path1, path2, { format: "json" });
  expect(actual).toBe(expected);
});

test("yaml-stylish", () => {
  const expected = fs.readFileSync(getFixturePath("stylishResult"), "utf-8");
  const actual = genDiff(path3, path4, { format: "stylish" });
  expect(actual).toBe(expected);
});

test("yaml-plain", () => {
  const expected = fs.readFileSync(getFixturePath("plainResult"), "utf-8");
  const actual = genDiff(path3, path4, { format: "plain" });
  expect(actual).toBe(expected);
});

test("yaml-json", () => {
  const expected = fs.readFileSync(getFixturePath("jsonResult"), "utf-8");
  const actual = genDiff(path3, path4, { format: "json" });
  expect(actual).toBe(expected);
});
