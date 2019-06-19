# moltin-cli
CLI tool to make Moltin requests

## Setup
You will need the following in your `.env` file

```
MOLTIN_CLIENT_ID
MOLTIN_CLIENT_SECRET
```

## Authentication
You can call the authenticate command manually
`bin/moltin authenticate`
However, an access token will be automatically created for any request if there isn't one available, or it has expired.

## Products

### Get products
```
./bin/run products
```

### Get a product
```
./bin/run products:get {uuid}
```
You can specify an `only` argument to only return specific fields in the output (useful for piping)
```
./bin/run products:get {uuid} --only 'id,name'
```

### Update a product
```
./bin/run products:update {uuid} --name "Product name"
```
You can also update a product via a JSON string
```
./bin/run products:update {uuid} --json '{"name": "Product name"}'
```
or you can specify a JSON file
```
./bin/run products:update {uuid} --file ~/Desktop/data.json
```
## Piping

You can pipe the output of one command in to another.
For example, to update a product, you can grab the ID from the products command, which will be used in the update command:
```
./bin/run products {uuid} | ./bin/run products:update --name "Product name"
```
