/**
 * @name Binance API Testnet - Create Order
 * @description A worker that creates, signs, and submits a new order using on Binance Testnet.
 * @see https://binance-docs.github.io/apidocs/testnet/en/#new-order-trade
 * @github https://github.com/modster/hmac-sha256-template
 * @version 0.0.1
 * @
 */

import "https://deno.land/std@0.192.0/dotenv/load.ts";
const { createHmac } = await import('node:crypto');

const encoder = new TextEncoder();
const apiSecret = encoder.encode(Deno.env.get("TESTNET_SECRET"));
const baseUrl = Deno.env.get("TESTNET_APIURL");
const apiKey = Deno.env.get("TESTNET_APIKEY");

const pathName = "order";

const theUrl = new URL(`${baseUrl}/${pathName}`);

const hdrs = new Headers();
hdrs.append("X-MBX-APIKEY", `${apiKey}`);
hdrs.append("Content-Type", "application/x-www-form-urlencoded");

const searchParams = new URLSearchParams();
searchParams.append("symbol", "BTCUSDT");
searchParams.append("side", "BUY");
searchParams.append("type", "MARKET");
searchParams.append("quantity", "0.001");
searchParams.append("timestamp", Date.now().toString());


function hmac(searchParams: URLSearchParams, apiSecret: Uint8Array | string) {
 return createHmac('sha256', apiSecret)
  .update(searchParams.toString())
  .digest('hex');
}
// console.log(hmac);

// function hmacSHA256(key: string, data: string) {
//   const hmac = createHmac("sha256", key);
//   hmac.update(data);
//   return hmac.digest("hex");
// }

// hmac.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  // const data = hmac.read();
  // if (data) {
    // console.log(data.toString('hex'));
    // Prints:
    //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  // }
// });

// console.log(hmac.write(searchParams.toString()));
searchParams.append("signature", `${hmac(searchParams, apiSecret)}`);

console.log(`${theUrl.href}?${searchParams.toString()}`);

const response = await fetch(theUrl.href,{
  method: "POST",
  headers: hdrs,
  body: searchParams
}).then((response) => response.text()).catch((error) => console.error(error));

console.log(`${response}`,null,2);


if (import.meta.main) {
  console.log("running main");

}

export { searchParams, hmac, theUrl, hdrs };
