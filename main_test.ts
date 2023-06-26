// import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
// import { searchParams, signature, theUrl } from "./main.ts";
// import * as crypto from "node:crypto";
// const { createHmac } = await import('node:crypto');
import { hmac } from "./main.ts";

Deno.test(
function signatureTest() {
  // mock searchParams string
  const mockSearchParams = new URLSearchParams("symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559");

  // mock secretKey:
  const encoder = new TextEncoder();

  const mockKey = encoder.encode("NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j");

  // correct:
  const correct = "c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71";
  const signature = hmac(mockSearchParams, mockKey);
  console.log(`
    passing: ${(signature === correct)?"true":"false"}

  `);
}
);
// signatureTest();
