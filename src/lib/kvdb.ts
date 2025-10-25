// kvdb.ts
export class KVDB {
  private dbPromise: Promise<IDBDatabase>;

  constructor(private store: string, private dbName = 'tuberecall') {
    this.dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  private async withStore<T>(
    mode: IDBTransactionMode,
    fn: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.store, mode);
      const req = fn(tx.objectStore(this.store));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async get<T = any>(key: string): Promise<T | undefined> {
    return this.withStore('readonly', s => s.get(key));
  }

  async set(key: string, value: any): Promise<void> {
    await this.withStore('readwrite', s => s.put(value, key));
  }

  async delete(key: string): Promise<void> {
    await this.withStore('readwrite', s => s.delete(key));
  }

  async keys(): Promise<string[]> {
    return this.withStore('readonly', s => s.getAllKeys()) as Promise<string[]>;
  }
}
