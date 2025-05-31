const storage = {
  getParsedItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      console.warn(`Failed to parse localStorage item for key "${key}"`);
      return null;
    }
  },
  setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
  clearStorage(): void {
    localStorage.clear();
  },
};

export default storage;
