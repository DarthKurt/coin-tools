// ==UserScript==
// @name         AB Links Solver
// @namespace    ABLinks Solver(Solves Ablinks images)
// @version      0.0.1
// @description  Solves AbLink images
// @author       DarthKurt
// @match        https://claimfreecoins.io/*
// @match        https://tagecoin.com/*
// @match        https://starcoins.ws/*
// @connect https://cdn.jsdelivr.net
// @require https://cdn.jsdelivr.net/gh/DarthKurt/coin-tools@main/coins-rotator/dist/bundle.js
// @noframes
// @grant        GM_xmlhttpRequest
// @antifeature  referral-link
// ==/UserScript==
"use strict";
if(rtr && rtr.solver) {
    rtr.solver(10000);
}
