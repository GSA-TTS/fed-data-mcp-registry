import fs from "node:fs";

const CATALOG_PATH = "./catalog.json";
const README_PATH = "./README.md";
const START_MARKER = "<!-- BEGIN GENERATED TABLE -->";
const END_MARKER = "<!-- END GENERATED TABLE -->";

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
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * @param {string} text
 * @returns {string}
 */
function mdEscape(text) {
  return String(text || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

/**
 * @param {Server[]} servers
 * @returns {string}
 */
function generateTable(servers) {
  // Sort by agency, then dataset
  const sorted = [...servers].sort((a, b) => {
    const agencyCmp = a.agency.localeCompare(b.agency);
    return agencyCmp !== 0 ? agencyCmp : a.dataset.localeCompare(b.dataset);
  });

  const rows = sorted.map(s => {
    const code = s.repository ? `[GitHub](${s.repository})` : "";
    const remote = s.remote_url ? `[Remote](${s.remote_url})` : "";
    const status = s.status !== "active" ? ` (${s.status})` : "";
    
    return [
      mdEscape(s.dataset),
      mdEscape(s.agency),
      mdEscape(s.name) + status,
      code,
      remote
    ];
  });

  const header = ["Dataset", "Agency", "Server", "Code", "Remote"];
  const separator = ["---", "---", "---", "---", "---"];
  
  const lines = [header, separator, ...rows].map(cols => 
    `| ${cols.join(" | ")} |`
  );

  return lines.join("\n");
}

/**
 * @param {string} table
 * @returns {string}
 */
function updateReadme(table) {
  const readme = fs.readFileSync(README_PATH, "utf8");

  if (!readme.includes(START_MARKER) || !readme.includes(END_MARKER)) {
    throw new Error(
      `README.md must contain:\n${START_MARKER}\n...\n${END_MARKER}`
    );
  }

  const before = readme.split(START_MARKER)[0] + START_MARKER + "\n";
  const after = "\n" + END_MARKER + readme.split(END_MARKER)[1];

  return before + table + after;
}

function main() {
  console.log("Generating README table...\n");

  /** @type {Catalog} */
  const catalog = readJson(CATALOG_PATH);
  const table = generateTable(catalog.servers);
  const updated = updateReadme(table);

  fs.writeFileSync(README_PATH, updated, "utf8");

  console.log(`Generated table with ${catalog.servers.length} servers`);
}

main();