import browser from "webextension-polyfill";

export function injectScript() {
    const s = document.createElement("script");
    s.src = browser.runtime.getURL("injectable.js");
    s.async = false;
    (document.head || document.documentElement).appendChild(s);
    s.remove();
}
