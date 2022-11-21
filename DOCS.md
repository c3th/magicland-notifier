> MagicLand Socket

## Pre

API - https://www.magicland.se/backend/jsonrpc/v1

Params - { webshop: 33732 }

### Url.get

Get information about the current article url

```json
{
  "id": 7,
  "jsonrpc": "2.0",
  "method": "Url.get",
  "params": ["https://www.magicland.se/produkter/rea/hemligt-paket-kortlekar"]
}
```

### Article.get

Get information about an article

```json
{
  "id": 17,
  "jsonrpc": "2.0",
  "method": "Article.get",
  "params": [
    188068979 // The article id
  ]
}
```

### Articlegroup.list

Get a list of all articles groups

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "method": "Articlegroup.list",
  "params": [
    {
      "children": true,
      "name": "sv",
      "parent": true,
      "uid": true,
      "url": "sv"
    },
    {
      "filters": {
        "/parent": null,
        "hiddenInMenu": false
      }
    }
  ]
}
```

### Article.list

Get a list of parametered article ids

```json
{
  "id": 22,
  "jsonrpc": "2.0",
  "method": "Article.list",
  "params": [
    {
      "articleNumber": true,
      "articleTemplate": true,
      "attachments": true,
      "attributes": true,
      "type": true,
      "news": true,
      "content": {
        "uid": true,
        "images": true,
        "articleNumber": true,
        "attachments": true,
        "price": true
      },
      "deliveryInfo": "sv",
      "description": "sv",
      "images": true,
      "isBuyable": true,
      "metaDescription": "sv",
      "pricing": true,
      "showPricesIncludingVat": true,
      "stock": true,
      "url": true,
      "weight": true,
      "quantityInfo": true
    },
    {
      "filters": {
        "/uid": {
          "in": [161882467, 188068979]
        }
      }
    }
  ]
}
```

### Articlegroup.get

Get an article group

```json
[
  {
    "id": 20,
    "jsonrpc": "2.0",
    "method": "Articlegroup.get",
    "params": [
      5514533,
      {
        "name": true,
        "pageItems": {}
      }
    ]
  }
]
```
