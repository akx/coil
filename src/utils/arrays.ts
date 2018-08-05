export function removeInPlace<T>(array: T[], obj: T): boolean {
  const index = array.indexOf(obj);
  if (index > -1) {
    array.splice(index, 1);
    return true;
  }
  return false;
}
