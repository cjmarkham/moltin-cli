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
bin/moltin products --all
```

### Get a product
```
bin/moltin products {uuid}
```
You can specify an `only` argument to only return specific fields in the output (useful for piping)
```
bin/moltin products {uuid} --only 'id,name'
```

### Update a product
```
bin/moltin products:update {uuid} --name "Product name"
```
## Piping

You can pipe the output of one command in to another.
For example, to update a product, you can grab the ID from the products command, which will be used in the update command:
```
bin/moltin products {uuid} | bin/moltin products:update --name "Product name"
```
