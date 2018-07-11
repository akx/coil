export function load(key: string): any | undefined {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return undefined;
  }
  try {
    return JSON.parse(rawValue);
  } catch (e) {
    return undefined;
  }
}

export function save(key: string, value: any) {
  if (value === undefined || value === null) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}
