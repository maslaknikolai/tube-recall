import { Store } from "@/store/create-store";
import { useEffect, useRef, useState } from "react";


export const useStore = <T>(store: Store<T>) => {
  const [value, setValue] = useState(store.get());
  const [isCacheLoaded, setIsCacheLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribeAndRun((newValue) => {
      setValue(newValue);
    });

    store.gettingCachePromise.then(() => {
      setIsCacheLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  const stringifiedValue = JSON.stringify(value);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    store.set(valueRef.current);
  }, [stringifiedValue, store]);

  return [value, setValue, isCacheLoaded] as const;
};
