import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
// import { fetch } from "https://deno.land/x/fetch/mod.ts";
import "https://deno.land/std@0.192.0/dotenv/load.ts";
import { createHmac } from "node:crypto";//'https://deno.land/std/node/crypto.ts'
// import { crypto } from "https://deno.land/std@0.192.0/crypto/mod.ts";
// import * as mod from "https://deno.land/std@0.192.0/crypto/crypto.ts";


// const env = await load();

const apiKey = Deno.env.get("TESTNET_APIKEY");
const _apiSecret = Deno.env.get("TESTNET_SECRET");
const baseUrl = Deno.env.get("TESTNET_APIURL");
const pathName = "orders";
const hdrs = new Headers();
hdrs.append("X-MBX-APIKEY", apiKey);
hdrs.append("Content-Type", "application/x-www-form-urlencoded");

const theUrl = new URL( `${baseUrl}/${pathName}` );
const searchParams = new URLSearchParams();

// binance might be using toLowerCase?
searchParams.append("symbol", "BTCUSDT");
searchParams.append("side", "BUY");
searchParams.append("type", "MARKET");
searchParams.append("quantity", "0.001");
searchParams.append("timestamp", Date.now());
// they sort keys on wss?
// searchParams.sort();

// mock secretKey
const mockSecretKey = "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j";
//hashing string
const searchP = "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559";
// returns:
const correct = "c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71";

const signature = (query_string) => {
  return createHmac('sha256', mockSecretKey)
    .update(query_string)
    .digest('hex');
}

// expect c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
assertEquals(signature(searchP), correct);

  console.log(`
  apiKey      : ${apiKey}
  baseUrl     : ${baseUrl}
  hdrs        : ${hdrs}
  theUrl      : ${theUrl}
  searchParams: ${searchParams.toString()}

`);// signature   : ${signature(searchP)}

// const fetchTheUrl = await fetch(theUrl, {
  // method: "POST",
  // headers: {hdrs},
  // body: searchParams.toString(),
// });


// export default fetchTheUrl;
