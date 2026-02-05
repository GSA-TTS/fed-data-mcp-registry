# Contributing a Government MCP Server

Thank you for contributing! Here's how to add your server to the catalog.

## Quick Start

1. **Fork this repo**
2. **Edit `catalog.json`** - Add your entry to the `servers` array
3. **Open a pull request** - CI will validate and generate the README

## Entry Template

Copy this template and fill in your server's details:

```json
{
  "id": "my-server-id",
  "name": "My Government Data MCP Server",
  "agency": "Department of Example",
  "dataset": "Example Dataset Name",
  "description": "Brief description of what data this server provides",
  "repository": "https://github.com/org/repo",
  "remote_url": "https://example.gov/mcp",
  "health_endpoint": "https://example.gov/health",
  "license": "MIT",
  "tags": ["tag1", "tag2"],
  "status": "active"
}
```

## Field Guidelines

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique slug (lowercase, hyphens only). Example: `census-demographics` |
| `name` | ✅ | Display name for your server |
| `agency` | ✅ | Government agency that owns the data |
| `dataset` | ✅ | Primary dataset name |
| `description` | ✅ | 1-2 sentence description (10-500 characters) |
| `repository` | ✅ | Repository URL (GitHub, GitLab, or other code forges) |
| `remote_url` | ⬜ | Hosted endpoint URL (if available) |
| `health_endpoint` | ⚠️ | Health check URL. **Required if `remote_url` is set** |
| `license` | ⬜ | SPDX identifier (e.g., `MIT`, `Apache-2.0`, `CC0-1.0`) |
| `tags` | ⬜ | Array of relevant keywords |
| `status` | ⬜ | `active`, `experimental`, or `archived` (default: `active`) |

## Adding Your Entry

### Option 1: Edit on GitHub (easiest)

1. Go to [`catalog.json`](./catalog.json)
2. Click the pencil icon to edit
3. Add your entry to the `servers` array
4. Scroll down and click "Propose changes"
5. Click "Create pull request"

### Option 2: Edit locally

1. Clone your fork
2. Edit `catalog.json`
3. Run `npm install` (first time only)
4. Run `npm run validate` to check your entry
5. Run `npm run generate` to update the README
6. Commit and push: `git commit -m "Add [server-name]"`
7. Open a pull request

## Example Entry

```json
{
  "id": "census-demographics",
  "name": "U.S. Census Demographics MCP Server",
  "agency": "U.S. Census Bureau",
  "dataset": "American Community Survey",
  "description": "Provides programmatic access to U.S. Census demographic data including population, income, and housing statistics",
  "repository": "https://github.com/example/census-mcp",
  "remote_url": "https://census-mcp.census.gov/mcp",
  "health_endpoint": "https://census-mcp.census.gov/health",
  "license": "CC0-1.0",
  "tags": ["demographics", "census", "population"],
  "status": "active"
}
```

## Validation

When you open a PR, GitHub Actions will automatically:

- ✅ Validate your JSON against the schema
- ✅ Check for duplicate IDs
- ✅ Regenerate the README table
- ❌ Fail if anything is invalid

If the check fails, look at the error message, fix the issue, and push again.

## Common Issues

**"must match pattern" on `id` field**
→ IDs must be lowercase with hyphens only (e.g., `my-server-id`)

**"must match format 'uri'" on `repository` field**
→ Repository must be a valid URL (e.g., `https://github.com/org/repo`)

**"Duplicate server IDs found"**
→ Your `id` is already taken; choose a unique one

**"README.md is out of date"**
→ Run `npm run generate` locally before pushing

## Questions?

- Open an [issue](../../issues)
- Ask in your pull request
- Check existing entries in `catalog.json` for examples

Thank you for contributing! 🎉