import browser from "webextension-polyfill";

export enum BrowserStorageKeys {
  transcripts = "transcripts",
}

export function setBrowserStorageItem<T>(key: BrowserStorageKeys, value: T): Promise<void> {
  return browser.storage.local.set({ [key]: value });
}

export function getBrowserStorageItem<T>(key: BrowserStorageKeys): Promise<T | undefined> {
  return browser.storage.local.get(key).then((result) => result[key] as T | undefined);
}
