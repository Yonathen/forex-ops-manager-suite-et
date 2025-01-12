
export class AppStorage implements Storage {

  // Length is already non numerable
  get length(): number {
    throw new Error('Not Implemented');
  }

  public constructor(private sessionStorage: Storage, private localStorage: Storage) {}

  clear(): void {
    this.sessionStorage.clear();
    this.localStorage.clear();
  }

  getItem(key: string): string | null {
    let item: string | null = this.localStorage.getItem(key);
    if(item != null) {
      this.sessionStorage.setItem(key, item);
      this.localStorage.removeItem(key);
    } else {
      item = this.sessionStorage.getItem(key);
    }

    return item;
  }

  key(index: number): string {
    throw new Error('Not Implemented');
  }

  removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
    this.localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

}
