import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.action.onClicked.addListener(() => {
  browser.tabs.create({
    url: browser.runtime.getURL('src/options.html')
  });
});
