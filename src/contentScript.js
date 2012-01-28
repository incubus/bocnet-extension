/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

// All the files from bocjs directory are downloaded from BOC site directly
// or decoded via http://www.greymagic.com/security/tools/decoder/
var scripts = [
  "IEProxy.js",
  "SHA1.js",
  "bocjs/md5.js",
  "bocjs/resources_zh_CN.js",
  "bocjs/common.js",
  "bocjs/PageLimit.js",
  "bocjs/FormCheck.js",
  "bocjs/createElement.js",
  "bocjs/CurCode.js",
//  "bocjs/calendar.js",
  "bocjs/FormatMoneyShow.js",
  "bocjs/FormatMoneyBase.js"
];

function injectScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(url);
  document.documentElement.appendChild(script);
}

script = document.createElement("script");
script.type = "text/javascript";
script.innerText = "Object.prototype.attachEvent = function (sEvent, fnHandler, bUseCapture) { this.addEventListener(sEvent.indexOf('on') == 0 ? sEvent.replace('on', '') : sEvent, fnHandler, bUseCapture);};";
document.documentElement.insertBefore(script);

for (var i = 0; i < scripts.length; ++i) {
  injectScript(scripts[i]);
}
