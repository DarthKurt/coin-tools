// ==UserScript==
// @name         Coin Faucets Rotator
// @namespace    Coin Faucets Rotator
// @version      0.0.1
// @description  Solves tasks for coins
// @author       DarthKurt
// @match        https://claimfreecoins.io/*
// @match        https://tagecoin.com/*
// @match        https://starcoins.ws/*
// @match        https://www.freefaucetpay.com/*
// @match        https://turbo-btc.icu/*
// @match        https://turbo-sol.icu/*
// @match        https://turbo-ltc.icu/*
// @match        https://turbo-zec.icu/*
// @match        https://turbo-bnb.icu/*
// @match        https://turbo-dash.icu/*
// @match        https://turbo-usdt.icu/*
// @match        https://turbo-trx.icu/*
// @match        https://turbo-doge.icu/*
// @match        https://turbo-dgb.icu/*
// @match        https://turbo-eth.icu/*
// @match        https://turbo-bch.icu/*
// @match        https://freefaucet.space/*
// @connect      https://cdn.jsdelivr.net
// @require      https://cdn.jsdelivr.net/gh/DarthKurt/coin-tools@e6a9649c62e2abdee9ad10b19e9156617141dc53/coins-rotator/dist/bundle.js
// @noframes
// @grant        GM_xmlhttpRequest
// ==/UserScript==
"use strict";
if(rtr && rtr.solver) {
    rtr.solver(10000);
}
