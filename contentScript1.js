/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

(function () {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("inject.js");
    document.documentElement.insertBefore(script);
})()