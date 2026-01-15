# Open Government Data MCP Servers

A curated catalog of Model Context Protocol (MCP) servers providing programmatic access to U.S. government datasets.

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) is an open standard that enables AI assistants to securely connect to data sources and tools. MCP servers act as bridges between AI models and external systems.

## Available Servers

<!-- BEGIN GENERATED TABLE -->
| Dataset | Agency | Server | Code | Remote |
| --- | --- | --- | --- | --- |
| U.S. Census Data | U.S. Census Bureau | U.S. Census Demographics MCP Server | [GitHub](https://github.com/example/census-mcp) |  |
<!-- END GENERATED TABLE -->


## Contributing

Have an MCP server for government data? We'd love to include it!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions.

**Quick start:**
1. Fork this repo
2. Add your entry to `catalog.json`
3. Open a pull request

## Usage

To use these servers:

1. **Local installation**: Clone the server repository and follow its setup instructions
2. **Remote endpoint**: If a Remote URL is provided, configure your MCP client to connect directly

### Example Configuration

For Claude Desktop, add to your config file:

```json
{
  "mcpServers": {
    "census": {
      "command": "node",
      "args": ["/path/to/census-mcp/index.js"]
    }
  }
}

```

## License

This catalog is released under CC0-1.0. Individual servers have their own licenses - check each repository.

## Maintained By

This catalog is community-maintained. For questions or issues, please [open an issue](../../issues).
