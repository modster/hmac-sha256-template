/**
 * @name Binance API Testnet - Create Order
 * @description A worker that creates, signs, and submits a new order using on Binance Testnet.
 * @see https://binance-docs.github.io/apidocs/testnet/en/#new-order-trade
 * @github https://github.com/modster/hmac-sha256-template
 * @version 0.0.1
 * @exports
*/

import "https://deno.land/std@0.192.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { createHmac } from "node:crypto";

const apiKey = Deno.env.get("TESTNET_APIKEY");
const apiSecret = Deno.env.get("TESTNET_SECRET");
const baseUrl = Deno.env.get("TESTNET_APIURL");
const hdrs = new Headers();
const theUrl = new URL( `${baseUrl}/${pathName}` );
const searchParams = new URLSearchParams();
const pathName = "orders";

hdrs.append("X-MBX-APIKEY", apiKey);
hdrs.append("Content-Type", "application/x-www-form-urlencoded");
searchParams.append("symbol", "BTCUSDT");
searchParams.append("side", "BUY");
searchParams.append("type", "MARKET");
searchParams.append("quantity", "0.001");
searchParams.append("timestamp", Date.now());

// binance might be using toLowerCase?
// they sort keys on wss, but not on rest?
// searchParams.sort();

// mock searchParams string
const mockSearchParams = "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559";

// mock secretKey:
const mockSecretKey = "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j";

/**
 * @name signature
 * @description creates a signature for the request
*/
async function signature(query_string) {
  return createHmac('sha256', mockSecretKey)
  .update(query_string)
  .digest('hex');
}

// correct: c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
const correct = "c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71";
assertEquals(signature(mockSearchParams), correct);
console.log(`
  theUrl      : ${theUrl}
  searchParams: ${searchParams.toString()}
  signature   : ${signature(mockSearchParams)}
  passing     : ${signature(mockSearchParams) === correct}
`);

try {
  /**
   */
  const response = await fetch(theUrl, {
    method: "POST",
    headers: {hdrs},
    body: searchParams.toString(),
  }).then(response => response.json()).catch(error => console.error(error));
  return new Response(JSON.stringify(response));

} catch (error) {
  console.error(error);
}

export default fetchTheUrl;
