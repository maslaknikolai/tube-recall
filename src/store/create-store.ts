import { BrowserStorageKeys } from "./browser-storage";
import browser from "webextension-polyfill";

export type Store<T> = {
  stateName: BrowserStorageKeys | undefined;
  get: () => T;
  set: (newValue: T) => Promise<void>;
  subscribeAndRun: (cb: (value: T) => void) => () => boolean;
  gettingCachePromise: Promise<void>;
};

export function createStore<T>(defaultValue: T, stateName?: BrowserStorageKeys): Store<T> {
  let value: T = defaultValue;
  let resolveGettingCachePromise: () => void;
  const gettingCachePromise = new Promise<void>((resolve) => {
    resolveGettingCachePromise = resolve;
  });
  const subscribers = new Set<(value: T) => void>();

  if (stateName) {
    browser.storage.local.get(stateName).then((result) => {
      resolveGettingCachePromise();

      if (stateName in result === false) {
        return;
      }

      const newValue = result[stateName];
      saveIfNew(newValue as T);
    });

    browser.storage.local.onChanged.addListener((storage) => {
      if (stateName in storage === false) {
        return;
      }

      const newValue = storage[stateName]?.newValue;
      saveIfNew(newValue as T);
    });
  }

  function notifySubscribers(newValue: T) {
    subscribers.forEach((cb) => cb(newValue));
  }

  /** */
  function saveIfNew(newValue: T) {
    if (newValue === value) {
      return;
    }
    value = newValue;
    notifySubscribers(newValue);
  }

  /** */
  async function set(newValue: T) {
    if (newValue === value) {
      return;
    }

    value = newValue;

    try {
      if (stateName) {
        await browser.storage.local.set({ [stateName]: newValue });
      }
      notifySubscribers(newValue);
    } catch (error) {
      console.error(`Failed to set state for ${stateName}:`, error);
      throw error;
    }
  }

  /** */
  function subscribeAndRun(cb: (value: T) => void) {
    subscribers.add(cb);
    cb(value);
    return () => subscribers.delete(cb);
  }

  return {
    stateName,
    get: () => value,
    set,
    subscribeAndRun,
    gettingCachePromise,
  };
}
