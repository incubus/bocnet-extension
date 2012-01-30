/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

// All the files from bocjs directory are downloaded from BOC site directly
// or decoded via http://www.greymagic.com/security/tools/decoder/
// Except:
// createElement.js - Removed ActiveX control. See https://github.com/incubus/bocnet-extension/commits/master/src/bocjs/createElement.js
// resources_zh_CN_CurCode.js - Joined resources_zh_CN.js and CurCode.js files
var scripts = [
    "IEProxy.js",
    "Utils.js",
    "bocjs/md5.js",
    // "bocjs/resources_zh_CN.js",
    "bocjs/resources_zh_CN_CurCode.js",
    "bocjs/common.js",
    "bocjs/PageLimit.js",
    "bocjs/FormCheck.js",
    "bocjs/createElement.js",
    // "bocjs/CurCode.js",
    // "bocjs/calendar.js",
    "bocjs/FormatMoneyShow.js",
    "bocjs/FormatMoneyBase.js",
    "bocjs/register.js",
    "bocjs/userInfo.js"
    ];

function injectScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof(safari) !== 'undefined') {
        script.src = safari.extension.baseURI + url;
    }
    else {
        script.src = chrome.extension.getURL(url);
    }
    document.documentElement.appendChild(script);
}

// Add window.attachEvent function
script = document.createElement("script");
script.type = "text/javascript";
script.innerText = "Object.prototype.attachEvent = function (sEvent, fnHandler, bUseCapture) { this.addEventListener(sEvent.indexOf('on') == 0 ? sEvent.replace('on', '') : sEvent, fnHandler, bUseCapture);};";
document.documentElement.insertBefore(script);

for (var i = 0; i < scripts.length; ++i) {
    injectScript(scripts[i]);
}

// Add favicon.ico
link = document.createElement("link");
link.type = "image/x-icon";
link.href = "http://www.boc.cn/favicon.ico";
link.setAttribute("rel", "shortcut icon");
document.documentElement.appendChild(link);

function onBOCBeforeLoad() {
    if (document.body && document.getElementById("validImage")) {
        document.body.onload = function() {
            if (document.getElementById("validImage")) {
                document.all.validImage.src = "ImageValidation/validation" + Math.round(Math.random() * 0x7fffffff) + ".gif";
            }
        };
    }
}

if (typeof(safari) !== 'undefined') {
    document.addEventListener("beforeload", onBOCBeforeLoad, true);
}
