# Coinbase Pro Investor

Coinbase Pro does not offer automatic investing like the consumer Coinbase app. This script, ran via a cron job, can be used to enable automatic investing in Coinbase Pro.

## How to use

First, you need to [create an API key](https://help.coinbase.com/en/pro/other-topics/api/how-do-i-create-an-api-key-for-coinbase-pro) under your Coinbase Pro account.

This script requires the following environment variables be set:

```
CB_ACCESS_KEY
CB_ACCESS_SECRET
CB_ACCESS_PASSPHRASE
PRODUCTS_TO_BUY
FUNDS_TO_DEPOSIT
DEFAULT_CURRENCY # Optional, defaults to USD if not provided.
```

- The top 3 of which you should get when you create your API key.
- `PRODUCTS_TO_BUY` should be a JSON array containing the assets you want to invest in, like `[{ "name": "ETH-USD", "amountToInvest": 10 }, ...]` for example.
- `FUNDS_TO_DEPOSIT` is the amount to deposit before making any orders.
- `DEFAULT_CURRENCY` is optional and defaults to `USD`.

Install dependencies with `npm install`

Run the script with `npm run start`
