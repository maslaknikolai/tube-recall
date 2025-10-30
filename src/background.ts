import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  if (details.reason === 'install') {
    browser.runtime.openOptionsPage();
  }
});

browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});
