/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

var requestFilter = {
    urls: ["https://ebs.boc.cn/*"]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    var headers = details.requestHeaders;
    for (var i = 0; i < headers.length; ++i) {
        if (headers[i].name == "User-Agent") {
            headers[i].value = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)";
            break;
        }
    }
    return {
        requestHeaders: headers
    };
}, requestFilter, ["requestHeaders", "blocking"]);
