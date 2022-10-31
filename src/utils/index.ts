export const isEmpty = (obj: object) => !Object.entries(obj).length;

export const isURL = (str: string) => {
  try {
    new URL(str);
  } catch {
    return false;
  }
  return true;
};
