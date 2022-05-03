#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import app from "../index.js";

const command = new Command();

command
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format <type>", "output format", "stylish")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, type) => {
    const path1 = path.resolve(filepath1);
    const path2 = path.resolve(filepath2);
    console.log(app(path1, path2, type));
  });
command.parse();
