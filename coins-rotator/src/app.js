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
// @connect      self
// @connect      claimfreecoins.io
// @connect      tagecoin.com
// @connect      starcoins.ws
// @connect      www.freefaucetpay.com
// @connect      turbo-btc.icu
// @connect      turbo-sol.icu
// @connect      turbo-ltc.icu
// @connect      turbo-zec.icu
// @connect      turbo-bnb.icu
// @connect      turbo-dash.icu
// @connect      turbo-usdt.icu
// @connect      turbo-trx.icu
// @connect      turbo-doge.icu
// @connect      turbo-dgb.icu
// @connect      turbo-eth.icu
// @connect      turbo-bch.icu
// @connect      freefaucet.space
// @connect      https://cdn.jsdelivr.net
// @require      https://cdn.jsdelivr.net/gh/DarthKurt/coin-tools@4a996e056b4bf36eb4e43d867c0290975eee37c4/coins-rotator/dist/bundle.js
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @antifeature  referral-link
// ==/UserScript==

if (window.name && (!window.name.includes("https://") && window.name != "nextWindowUrl")) {
    console.warn("Window is considered as popup. Stopping the execution");
    return;
}

unsafeWindow.open = function () { };

function successMessageSelectorsPresent(msgSelectors, msg) {
    if (msgSelectors) {
        for (const selector of msgSelectors) {
            for (const element of document.querySelectorAll(selector)) {
                if (element && rtr.Utils.includesOneOf(element.innerText, msg)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function messageSelectorsCategory(msgSelectors, msg) {
    if (msgSelectors) {
        for (const selector of msgSelectors) {
            for (const element of document.querySelectorAll(selector)) {
                if (!element) {
                    continue;
                }

                let postponeCategory = rtr.Utils.getCategory(element.innerText, msg);

                if (postponeCategory) {
                    console.debug(`Found message of category: ${postponeCategory}`);

                    return postponeCategory;
                }

                if (!element.value) {
                    continue;
                }

                postponeCategory = rtr.Utils.getCategory(element.value, msg);


                if (postponeCategory) {
                    console.debug(`Found message of category: ${postponeCategory}`);

                    return postponeCategory;
                }
            }
        }
    }
    return false;
}

function clickCaptcha() {
    const captchaSwitchElement = document.querySelector("#switch");
    if (captchaSwitchElement && captchaSwitchElement.innerText.toLowerCase().includes("hcaptcha")) {
        captchaSwitchElement.click();
    } else if (captchaSwitchElement && captchaSwitchElement.innerText.toLowerCase().includes("recaptcha")) {
        captchaSwitchElement.click();
    }
}

// TODO: better name
function clickInput() {
    const inputElement = document.querySelector("#ads-show > div > div > div > form > input");
    if (inputElement) {
        inputElement.click();
    }
}

function clickLogin() {
    const link = document.querySelector(".btn.btn-success.btn-lg.get-link");

    if (link) {
        link.click();
    }
}

async function checkAbLinksSolution(navigateNextUrl) {
    const imagesCount = 4;
    let count = 0;

    const abModals = [".modal-content [href='/']", ".modal-body [href='/']", ".antibotlinks [href='/']"];
    const abModalsImgs = [".modal-content [href='/'] img", ".modal-body [href='/'] img", ".antibotlinks [href='/'] img"];

    for (const abModalsImg of abModalsImgs) {
        const element = document.querySelector(abModalsImg);
        if (element && element.value == "####") {
            await navigateNextUrl();
            return false;
        }
    }

    for (let i = 0; i < imagesCount; i++) {
        for (let j = 0; j < abModals.length; j++) {
            const abModelElement = document.querySelectorAll(abModals[j])[i];
            if (document.querySelectorAll(abModalsImgs[j]).length == imagesCount
                && abModelElement
                && abModelElement.style
                && abModelElement.style.display == 'none') {
                count++;
                break;
            }
        }
    }
    return count == 4;
}

function triggerEvent(el, type) {
    try {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } catch (exception) {
        console.error(exception);
    }
}

function getIndex(data) {
    const index = Object.values(data).findIndex(value => {
        return value.url.includes(window.location.hostname)
            && (
                window.location.href.includes(`/${value.coin}/`)
                || window.location.href.includes(`/${value.coin}-`)
                || window.location.href.includes(`-${value.coin}`)
                || window.location.href.endsWith(`/${value.coin}`)
            );
    });

    if (index < 0) {
        return 0;
    } else {
        return index;
    }
}

function createNavigator(postpone) {
    if (rtr && rtr.Navigator) {
        const ping = {
            request: (parameters) => GM_xmlhttpRequest({
                method: parameters.method,
                url: parameters.url,
                headers: parameters.headers,
                timeout: parameters.timeout,
                onload: parameters.onload,
                onerror: parameters.onerror,
                ontimeout: parameters.ontimeout,
            })
        }
        return new rtr.Navigator(ping, postpone);
    }

    return null;
}

function createPostponeCheck() {
    if (rtr && rtr.PostponeCheck) {
        const storage = {
            getDate: (url, wallet) => {
                return GM_getValue(`[${url}|${wallet}]`, 0);
            },
            setDate: (url, wallet, date) => {
                console.debug(`Set postpone date for \n\t${url}\n\t${wallet}\n\tNew date: ${date}`);
                GM_setValue(`[${url}|${wallet}]`, date);
            },
            removeDate: (url, wallet) => {
                console.debug(`Delete postpone date for \n\t${url}\n\t${wallet}\n\t`);
                GM_deleteValue(`[${url}|${wallet}]`);
            }
        }
        return new rtr.PostponeCheck(storage);
    }

    return null;
}

(async function () {
    'use strict';
    
    console.debug(GM_listValues());

    const midInterval = 3 * 1000;
    const delayBeforeMovingToNextUrl = 60 * 1000;
    const iFramSelector = "iframe";

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                 //
    //    ENTER YOUR FAUCETPAY ADDRESS BELOW AND SAVE IT IN A NOTEPAD IN CASE THERE IS AN UPDATE       //
    //                                                                                                 //
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const Emailfaucetpay = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31@mailinator.com";
    const UserNameFaucetpay = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31@mailinator.com";

    const eth = "0xd2bae80aad4f144ec6130d1bf11a852e780a4304";
    const ltc = "LUG3vR9AJRXdDu8JxmP79cH2yBsm6fDipp";
    const bch = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31";
    const sol = "FgouMS7fDyPEy43xtG6LYNtR27ZvKPtbdVxFz1gDLerN";
    const dash = "XrpJJV4P32fXj3W8yyESPEYQexpb6KKKNx";
    const dgb = "DSmQPZSPBBVQhRCFxUc8MECtyjKc8kBpit";

    const btc = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31";
    const bnb = "0xd2bae80aad4f144ec6130d1bf11a852e780a4304";
    const doge = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31";
    const fey = "1NYaqn4C3UoFqWunMgX22JMtVyffYUBz31";
    const tron = "TQNuwtBq2HMJ7hk1Urk2FyhcToczuDBtqv";
    const tether = "TQNuwtBq2HMJ7hk1Urk2FyhcToczuDBtqv";
    const zcash = "t1UVcnNbfor9JZ7urhQe6QjEZiitY9fuN1j";

    const websiteData = [
        { url: "https://claimfreecoins.io/free-bitcoin/", coin: "free-bitcoin", address: btc },
        { url: "https://tagecoin.com/page/faucet/bitcoin/", coin: "bitcoin", address: btc },
        { url: "https://starcoins.ws/bitcoin-faucet/", coin: "bitcoin-faucet", address: btc },
        { url: "https://turbo-btc.icu/", coin: "btc", address: btc },

        { url: "https://claimfreecoins.io/free-dogecoin/", coin: "free-dogecoin", address: doge },
        { url: "https://tagecoin.com/page/faucet/doge/", coin: "doge", address: doge },
        { url: "https://starcoins.ws/dogecoin-faucet/", coin: "dogecoin-faucet", address: doge },
        { url: "https://www.freefaucetpay.com/doge/", coin: "doge", address: doge },
        { url: "https://turbo-doge.icu/", coin: "doge", address: doge },
        { url: "https://freefaucet.space/doge/", coin: "doge", address: doge },

        { url: "https://claimfreecoins.io/free-litecoin/", coin: "free-litecoin", address: ltc },
        { url: "https://tagecoin.com/page/faucet/litecoin/", coin: "litecoin", address: ltc },
        { url: "https://starcoins.ws/litecoin-faucet/", coin: "litecoin-faucet", address: ltc },
        { url: "https://www.freefaucetpay.com/litecoin/", coin: "litecoin", address: ltc },
        { url: "https://turbo-ltc.icu/", coin: "ltc", address: ltc },
        { url: "https://freefaucet.space/litecoin/", coin: "litecoin", address: ltc },

        { url: "https://claimfreecoins.io/free-tron/", coin: "free-tron", address: tron },
        { url: "https://tagecoin.com/page/faucet/tron/", coin: "tron", address: tron },
        { url: "https://starcoins.ws/tron-faucet/", coin: "tron-faucet", address: tron },
        { url: "https://www.freefaucetpay.com/tron/", coin: "tron", address: tron },
        { url: "https://turbo-trx.icu/", coin: "trx", address: tron },
        { url: "https://freefaucet.space/tron/", coin: "tron", address: tron },

        { url: "https://claimfreecoins.io/free-binance/", coin: "free-binance", address: bnb },
        { url: "https://starcoins.ws/bnb-faucet/", coin: "bnb-faucet", address: bnb },
        { url: "https://turbo-bnb.icu/", coin: "bnb", address: bnb },
        { url: "https://freefaucet.space/bnb/", coin: "bnb", address: bnb },

        { url: "https://claimfreecoins.io/free-dash/", coin: "free-dash", address: dash },
        { url: "https://tagecoin.com/page/faucet/dash/", coin: "dash", address: dash },
        { url: "https://starcoins.ws/dash-faucet/", coin: "dash-faucet", address: dash },
        { url: "https://turbo-dash.icu/", coin: "dash", address: dash },
        { url: "https://freefaucet.space/free-dash/", coin: "dash", address: dash },

        { url: "https://claimfreecoins.io/free-tether/", coin: "free-tether", address: tether },
        { url: "https://starcoins.ws/tether-faucet/", coin: "tether-faucet", address: tether },
        { url: "https://www.freefaucetpay.com/usdt/", coin: "usdt", address: tether },
        { url: "https://turbo-usdt.icu/", coin: "usdt", address: tether },
        { url: "https://freefaucet.space/usdt/", coin: "usdt", address: tether },

        { url: "https://claimfreecoins.io/free-zcash/", coin: "free-zcash", address: zcash },
        { url: "https://tagecoin.com/page/faucet/zcash/", coin: "zcash", address: zcash },
        { url: "https://starcoins.ws/zcash-faucet/", coin: "zcash-faucet", address: zcash },
        { url: "https://turbo-zec.icu/", coin: "zec", address: zcash },

        { url: "https://claimfreecoins.io/free-solana/", coin: "free-solana", address: sol },
        { url: "https://tagecoin.com/page/faucet/solana/", coin: "solana", address: sol },
        { url: "https://starcoins.ws/solana-faucet/", coin: "solana-faucet", address: sol },
        { url: "https://turbo-sol.icu/", coin: "sol", address: sol },
        { url: "https://freefaucet.space/solana/", coin: "solana", address: sol },

        { url: "https://claimfreecoins.io/free-digibyte/", coin: "free-digibyte", address: dgb },
        { url: "https://tagecoin.com/page/faucet/digibyte/", coin: "digibyte", address: dgb },
        { url: "https://starcoins.ws/digibyte-faucet/", coin: "digibyte-faucet", address: dgb },
        { url: "https://www.freefaucetpay.com/dgb/", coin: "dgb", address: dgb },
        { url: "https://turbo-dgb.icu/", coin: "dgb", address: dgb },
        { url: "https://freefaucet.space/dgb/", coin: "dgb", address: dgb },

        { url: "https://claimfreecoins.io/free-ethereum/", coin: "free-ethereum", address: eth },
        { url: "https://tagecoin.com/page/faucet/ethereum/", coin: "ethereum", address: eth },
        { url: "https://starcoins.ws/ethereum-faucet/", coin: "ethereum-faucet", address: eth },
        { url: "https://turbo-eth.icu/", coin: "eth", address: eth },

        { url: "https://claimfreecoins.io/free-feyorra/", coin: "free-feyorra", address: fey },
        { url: "https://starcoins.ws/feyorra-faucet/", coin: "feyorra-faucet", address: fey },
        { url: "https://www.freefaucetpay.com/feyorra/", coin: "feyorra", address: fey },
        { url: "https://freefaucet.space/feyorra/", coin: "feyorra", address: fey },

        { url: "https://claimfreecoins.io/free-bitcoin-cash/", coin: "free-bitcoin-cash", address: bch },
        { url: "https://tagecoin.com/page/faucet/bitcoin-cash/", coin: "bitcoin-cash", address: bch },
        { url: "https://turbo-bch.icu/", coin: "bch", address: bch },
    ];

    const websiteMap = [{
        website: ["claimfreecoins.io", "starcoins.ws"],
        inputTextSelector: "[name='address']",
        inputTextSelectorButton: "input.btn.btn-block.btn-primary",
        defaultButtonSelectors: ["button.btn.btn-block.btn-primary", "div.form > a.btn.btn-block.btn-primary", ".btn.btn-success.btn-lg.get-link"],
        captchaButtonSubmitSelector: ["[name='captcha']"],
        allMessageSelectors: [".alert.alert-warning", ".alert.alert-success", ".alert.alert-danger", "#cf-error-details"],
        successMessageSelectors: [".alert.alert-success"],
        messagesToCheckBeforeMovingToNextUrl: {
            0: [
                "Claim not Valid",
                "wrong order",
                "rate limited",
                "Login not valid",
                "You have to wait",
            ],
            1: [
                "You have already claimed",
                "locked",
                "you have reached",
                "tomorrow",
            ],
            2: [
                "insufficient",
            ],
            3: [
                "was sent to your",
                "claimed successfully",
            ],
        },
        ablinks: true
    }, {
        website: ["fescrypto.com", "tagecoin.com", "unlimitedtrx.tk", "funnyowl.one", "cryptofuture.co.in", "www.freefaucetpay.com", "99faucets.com", "freefaucet.space"],
        inputTextSelector: ["#address"],
        defaultButtonSelectors: ["a.homebutton.faa-parent.animated-hover", "button.btn.btn-block.btn-primary.my-2"],
        captchaButtonSubmitSelector: "#login",
        allMessageSelectors: [".alert.alert-warning", ".alert.alert-success", ".alert.alert-danger", "#cf-error-details"],
        successMessageSelectors: [".alert.alert-success"],
        messagesToCheckBeforeMovingToNextUrl: {
            0: [
                "Claim not Valid",
                "wrong order",
                "rate limited",
                "Login not valid",
                "You have to wait",
            ],
            1: [
                "You have already claimed",
                "locked",
                "you have reached",
                "tomorrow",
            ],
            2: [
                "The send limit set",
                "insufficient",
                "sufficient",
            ],
            3: [
                "was sent to your",
                "claimed successfully",
            ],
        },
        ablinks: true
    }, {
        website: [".icu", "turbo-"],
        inputTextSelector: ".form-control",
        defaultButtonSelectors: ["button.btn.btn-block.btn-primary", "input.btn.btn-block.btn-primary"],
        captchaButtonSubmitSelector: ["#ncb > input"],
        allMessageSelectors: [".alert.alert-warning", ".alert.alert-success", ".alert.alert-danger", "#cf-error-details"],
        successMessageSelectors: [".alert.alert-success"],
        messagesToCheckBeforeMovingToNextUrl: {
            0: [
                "Claim not Valid",
                "wrong order",
                "rate limited",
                "Login not valid",
                "You have to wait",
            ],
            1: [
                "You have already claimed",
                "locked",
                "you have reached",
                "tomorrow",
            ],
            2: [
                "The send limit set",
                "insufficient",
                "sufficient",
            ],
            3: [
                "was sent to your",
                "claimed successfully",
            ],
        },
        ablinks: true
    }];

    clickInput();

    // setTimeout(function () {
    //     if (window.location.href.includes("aruble.net")) {
    //         document.querySelector("#body > div.container-fluid.no-padding.no-margin > div > div > div:nth-child(10) > a").click();
    //     }
    // }, 500);

    const timers = [];
    timers.push(setTimeout(function () {
        const element = document.querySelector("#faucet > div > div.alert.alert-danger");
        if (element && element.click) {
            element.click();
        }
    }, midInterval));

    const websiteDataValues = {};
    const settings = Object.values(websiteMap)
        .find(
            value => rtr.Utils.includesOneOf(window.location.href, value.website)
        );

    if (settings) {
        websiteDataValues.inputTextSelector = settings.inputTextSelector;
        websiteDataValues.inputTextSelectorButton = settings.inputTextSelectorButton;
        websiteDataValues.defaultButtonSelectors = settings.defaultButtonSelectors;
        websiteDataValues.claimButtonSelectors = settings.claimButtonSelectors;
        websiteDataValues.captchaButtonSubmitSelector = settings.captchaButtonSubmitSelector;
        websiteDataValues.allMessageSelectors = settings.allMessageSelectors;
        websiteDataValues.messagesToCheckBeforeMovingToNextUrl = settings.messagesToCheckBeforeMovingToNextUrl;
        websiteDataValues.withdrawPageUrl = settings.withdrawPageUrl;
        websiteDataValues.withdrawEnabled = settings.withdrawEnabled;
        websiteDataValues.balanceSelector = settings.balanceSelector;
        websiteDataValues.withdrawMinAmount = settings.withdrawMinAmount;
        websiteDataValues.successMessageSelectors = settings.successMessageSelectors;
        websiteDataValues.additionalFunctions = settings.additionalFunctions;
        websiteDataValues.formSubmit = settings.formSubmit;
        websiteDataValues.ablinks = settings.ablinks;
    }

    const postponeCheck = createPostponeCheck();
    if (!postponeCheck) {
        console.warn("PostponeCheck was not loaded.");
        return;
    }
    
    const navigator = createNavigator(postponeCheck);
    if (!navigator) {
        console.warn("Navigator was not loaded.");
        return;
    }

    if (!rtr.solver) {
        console.warn("Solver was not loaded.");
        return;
    }

    const solveTask = await rtr.solver(10000);

    const index = getIndex(websiteData);
    websiteDataValues.address = websiteData[index].address;
    websiteDataValues.url = websiteData[index].url;

    const navigateNextUrl = async () => {
        await navigator.navigateNextUrl(websiteData, index, midInterval);
        await solveTask.abort();
        timers.forEach(t => clearTimeout(t));
    };

    timers.push(setTimeout(
        async () => await navigateNextUrl(),
        delayBeforeMovingToNextUrl
    ));

    if (window.location.href.includes("to=FaucetPay")
        || (websiteDataValues.address) && (websiteDataValues.address.length < 5
            || websiteDataValues.address.includes("YOUR_"))) {
        await navigateNextUrl();
    }

    timers.push(setTimeout(() => {
        const invisibleCaptchaShortlink = document.querySelector("#invisibleCaptchaShortlink");
        if (invisibleCaptchaShortlink) {
            invisibleCaptchaShortlink.click();
        }
        setInterval(() => clickLogin(), midInterval)
    }, midInterval));

    // function herafaucet() {
    //     if (document.querySelector("div.daily-claims.alert-info > div.text-right p")
    //         && Number(document.querySelector("div.daily-claims.alert-info > div.text-right p").innerText.split(" ")[0]) <= 0) {
    //         goToNextUrl();
    //     }
    // }

    // function diamondfaucet() {
    //     if (document.querySelector("#first > p.alert.a-info") && Number(document.querySelector("#first > p.alert.a-info").innerText.split(".")[1].split(" ")[0]) <= 0) {
    //         goToNextUrl();
    //     }
    // }

    timers.push(setTimeout(async () => {

        let ablinksSolved = false;
        setInterval(function () {
            clickCaptcha();
            ablinksSolved = checkAbLinksSolution(navigateNextUrl);
        }, midInterval);

        if (window.name == "nextWindowUrl") {
            window.name = "";
            await navigateNextUrl();
            return;
        } else {
            window.name = window.location.href;
        }

        if (websiteDataValues.additionalFunctions) {
            websiteDataValues.additionalFunctions();
        }

        if (websiteDataValues.withdrawEnabled) {
            if (websiteDataValues.balanceSelector && document.querySelector(websiteDataValues.balanceSelector)) {
                var currentBalance = document.querySelector(websiteDataValues.balanceSelector).innerText;
                if (currentBalance > websiteDataValues.withdrawMinAmount && !window.location.href.includes(websiteDataValues.withdrawPageUrl)) {
                    goToWithdrawPage();
                }

            } else {
                if (successMessageSelectorsPresent(websiteDataValues.successMessageSelectors, websiteDataValues.successMessageSelectors)) {
                    goToWithdrawPage();
                }
            }
        }

        const postponeCategory = messageSelectorsCategory(
            websiteDataValues.allMessageSelectors,
            websiteDataValues.messagesToCheckBeforeMovingToNextUrl);
        if (postponeCategory) {
            postponeCheck.postponeNextCheck(websiteDataValues.url, websiteDataValues.address, postponeCategory);
            await navigateNextUrl();
        }

        if (document.querySelector(websiteDataValues.inputTextSelector)) {
            document.querySelector(websiteDataValues.inputTextSelector).value = websiteDataValues.address;
            triggerEvent(document.querySelector(websiteDataValues.inputTextSelector), 'keypress');
            triggerEvent(document.querySelector(websiteDataValues.inputTextSelector), 'change');
            setTimeout(function () {
                if (websiteDataValues.inputTextSelectorButton && document.querySelector(websiteDataValues.inputTextSelectorButton)) {
                    document.querySelector(websiteDataValues.inputTextSelectorButton).click();
                }

            }, midInterval);
        }

        if (websiteDataValues.defaultButtonSelectors) {
            for (let i = 0; i < websiteDataValues.defaultButtonSelectors.length; i++) {
                if (document.querySelector(websiteDataValues.defaultButtonSelectors[i])) {
                    triggerEvent(document.querySelector(websiteDataValues.defaultButtonSelectors[i]), 'mousedown');
                    triggerEvent(document.querySelector(websiteDataValues.defaultButtonSelectors[i]), 'mouseup');
                    document.querySelector(websiteDataValues.defaultButtonSelectors[i]).click();
                    break;
                }
            }
        }

        setTimeout(function () {
            if (websiteDataValues.claimButtonSelectors) {
                for (let i = 0; i < websiteDataValues.claimButtonSelectors.length; i++) {
                    if (document.querySelector(websiteDataValues.claimButtonSelectors[i])) {
                        triggerEvent(document.querySelector(websiteDataValues.claimButtonSelectors[i]), 'mousedown');
                        triggerEvent(document.querySelector(websiteDataValues.claimButtonSelectors[i]), 'mouseup');
                        document.querySelector(websiteDataValues.claimButtonSelectors[i]).click();
                        break;
                    }
                }
            }
        }, midInterval);

        var clicked = false;
        const captchaInterval = setInterval(function () {

            if (websiteDataValues.ablinks && !ablinksSolved) {
                return;
            }

            const captchaButtonSubmitElement = document.querySelector(websiteDataValues.captchaButtonSubmitSelector);

            try {
                if (!clicked
                    && unsafeWindow.grecaptcha
                    && unsafeWindow.grecaptcha.getResponse().length > 0
                    && captchaButtonSubmitElement
                    && captchaButtonSubmitElement.style.display != 'none'
                    && !captchaButtonSubmitElement.disabled) {

                    rtr.Utils.submitOrClick(websiteDataValues.formSubmit, captchaButtonSubmitElement);
                    clicked = true;
                    clearInterval(captchaInterval);
                    setTimeout(async function () {
                        const postponeCategory = messageSelectorsCategory(
                            websiteDataValues.allMessageSelectors,
                            websiteDataValues.messagesToCheckBeforeMovingToNextUrl);
                        if (postponeCategory) {
                            postponeCheck.postponeNextCheck(websiteDataValues.url, websiteDataValues.address, postponeCategory);
                            await navigateNextUrl();
                        }
                    }, midInterval);
                }
            } catch (e) {

            }

            for (const iFrame of document.querySelectorAll(iFramSelector)) {
                if (!clicked
                    && iFrame
                    && iFrame.hasAttribute("data-hcaptcha-response")
                    && iFrame.getAttribute("data-hcaptcha-response").length > 0
                    && captchaButtonSubmitElement
                    && captchaButtonSubmitElement.style.display != 'none'
                    && !captchaButtonSubmitElement.disabled) {
                    rtr.Utils.submitOrClick(websiteDataValues.formSubmit, captchaButtonSubmitElement);
                    clicked = true;
                    clearInterval(captchaInterval);
                    setTimeout(async function () {
                        const postponeCategory = messageSelectorsCategory(
                            websiteDataValues.allMessageSelectors,
                            websiteDataValues.messagesToCheckBeforeMovingToNextUrl);
                        if (postponeCategory) {
                            postponeCheck.postponeNextCheck(websiteDataValues.url, websiteDataValues.address, postponeCategory);
                            await navigateNextUrl();
                        }
                    }, midInterval);
                }
            }
        }, midInterval);
    }, midInterval));
})();