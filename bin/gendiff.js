#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import gendiff from "../index.js";

const command = new Command();

command
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format <type>", "output format", "stylish")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, type) => {
    const path1 = path.resolve(filepath1);
    const path2 = path.resolve(filepath2);
    const format = (typeof type === "object" && type !== null) ? type.format : "stylish";
    console.log(gendiff(path1, path2, format));
  });
command.parse();
