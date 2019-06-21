import fs from "fs";
const path = require("path");
const equal = require("deep-equal");
import util from "util";
import { Order } from "../model";

const writeFile = util.promisify(fs.writeFile);
const getFile = util.promisify(fs.readFile);

export const readJsonFileAsync = async (): Promise<any> => {
  return JSON.parse(await getFile("./src/db/orders.json", "utf-8"));
};

export const writeJsonFileAsync = async (content: string): Promise<any> => {
  return await writeFile("./src/db/orders.json", content, "utf-8");
};

export const readJsonFile = () =>
  JSON.parse(fs.readFileSync("./src/db/orders.json", "utf-8"));

export const writeJsonFile = (path: string, content: string): void =>
  fs.writeFileSync(path, content, "utf-8");
