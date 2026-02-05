import fs from "node:fs";
import process from "node:process";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const CATALOG_PATH = "./catalog.json";
const SCHEMA_PATH = "./schema/catalog.schema.json";

/**
 * @typedef {import("ajv").ErrorObject} AjvError
 */

/**
 * @typedef {Object} Server
 * @property {string} id
 * @property {string} name
 * @property {string} agency
 * @property {string} dataset
 * @property {string} description
 * @property {string} repository
 * @property {string} [remote_url]
 * @property {string} [license]
 * @property {string[]} [tags]
 * @property {"active" | "experimental" | "archived"} [status]
 */

/**
 * @typedef {Object} Catalog
 * @property {string} version
 * @property {string} [updated]
 * @property {Server[]} servers
 */

/**
 * @template T
 * @param {string} filePath
 * @returns {T}
 */
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Invalid JSON in ${filePath}: ${message}`);
  }
}

/**
 * @param {readonly AjvError[] | null | undefined} errors
 * @returns {string}
 */
function formatErrors(errors) {
  if (!errors || errors.length === 0) {
    return "  (no AJV errors reported)";
  }

  return errors.map((e) => {
    const path = e.instancePath || "(root)";
    const msg = e.message;
    const detail = e.params ? ` [${JSON.stringify(e.params)}]` : "";
    return `  ${path}: ${msg}${detail}`;
  }).join("\n");
}

/**
 * @param {Server[]} servers
 * @returns {string[]}
 */
function checkDuplicateIds(servers) {
  const ids = new Set();
  const duplicates = [];
  
  for (const server of servers) {
    if (ids.has(server.id)) {
      duplicates.push(server.id);
    }
    ids.add(server.id);
  }
  
  return duplicates;
}

async function main() {
  console.log("Validating catalog...\n");

  // Load files
  /** @type {Catalog} */
  const catalog = readJson(CATALOG_PATH);
  const schema = readJson(SCHEMA_PATH);

  // Validate against schema
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  
  const validate = ajv.compile(schema);
  const valid = validate(catalog);

  if (!valid) {
    console.error("Schema validation failed:\n");
    console.error(formatErrors(validate.errors));
    process.exit(1);
  }

  console.log("Schema validation passed");

  // Check for duplicate IDs
  const duplicates = checkDuplicateIds(catalog.servers);
  if (duplicates.length > 0) {
    console.error(`\nDuplicate server IDs found: ${duplicates.join(", ")}`);
    process.exit(1);
  }

  console.log("No duplicate IDs");
  console.log(`\nCatalog is valid (${catalog.servers.length} servers)`);
}

main().catch((err) => {
  console.error(`\nValidation error: ${err.message}`);
  process.exit(1);
});