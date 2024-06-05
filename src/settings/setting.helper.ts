export function isStringNumber(str: string) {
  const num = Number(str);
  return !isNaN(num);
}
