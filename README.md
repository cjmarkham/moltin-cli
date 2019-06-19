# moltin-cli
CLI tool to make Moltin requests

## Setup
You will need the following in your `.env` file

```
MOLTIN_CLIENT_ID
MOLTIN_CLIENT_SECRET
```

## Working with resources

Most resources have 6 basic methods: `index`, `get`, `create`, `update`, `destroy`, `attributes`
These methods are called by specifying the resource name and then the method prefixed with a colon
```
bin/run products:update
bin/run products:get
```
In the case of index, you can omit the command or use `all`
```
bin/run products
bin/run products:all
```

## Flags

Flags are specific to the method call. For example, **create** and **update** allow flags such as `--json` or `--file`, while **get** or **index** methods allow the `--only` flag. Use `--help` to get more information about the supported flags per command.

## Piping

You can pipe the output of one command in to another.
For example, to update a product, you can grab the ID from the products command, which will be used in the update command:
```
bin/run products {uuid} | bin/run products:update --name "Product name"
```
