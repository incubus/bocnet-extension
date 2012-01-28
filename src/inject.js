var scripts = [
  "IEProxy.js",
  "md5.js",
  "resources_zh_CN.js",
  "common.js",
  "PageLimit.js",
  "FormCheck.js",
  "createElement.js",
  "CurCode.js",
  "FormatMoneyShow.js",
  "FormatMoneyBase.js"
];

// All the files are decoded frem BOC site directly.
// Excepts: 
// Correct some scripts in calendar.js(defs of document.onXXX).
// We cannot gurantee the order of the elements loaded, resource and CurCode
// are combined in a single file.

script = document.createElement("script");
script.type = "text/javascript";
script.innerText = "Object.prototype.attachEvent = function (sEvent, fnHandler, bUseCapture) { this.addEventListener(sEvent.indexOf('on') == 0 ? sEvent.replace('on', '') : sEvent, fnHandler, bUseCapture);};";
document.documentElement.insertBefore(script);

function addscript(url) {
  var obj = document.createElement('script');
//  var req = new XMLHttpRequest();
//  req.open("GET", chrome.extension.getURL(url), false);
//  req.send();
//  obj.innerHTML = req.responseText;
  obj.type = "text/javascript";
  obj.src = chrome.extension.getURL(url);
  if (document.documentElement) {
    document.documentElement.appendChild(obj);
  } else {
    document.appendChild(obj);
  }
}

for (var i = 0; i < scripts.length; ++i) {
  addscript(scripts[i]);
}
