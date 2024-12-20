export function clearAllPiniaSessionStorage() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key:any = sessionStorage.key(i);
      if (key.startsWith('pinia')) {
        sessionStorage.removeItem(key);
      }
    }
  }