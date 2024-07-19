import fs from "fs-extra";
import { getCacheFolderPath } from "../helper/cache.js";

const CACHE_FOLDER = getCacheFolderPath();

if (!fs.pathExistsSync(CACHE_FOLDER)) {
  fs.mkdirSync(CACHE_FOLDER);
}
