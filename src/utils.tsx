export function printList(list: Array<string>): void {
  const o = list
    .reduce((acc: { [k: string]: string }, item: string) => {
      const [k, v] = item.split('=').map(a => a.trim());
      acc[k] = v;
      return acc;
    }, {});
  console.log(JSON.stringify(o, null, 2));
}

export function trimPair(str: string): string[] {
  return str.split('=').map(a => a.trim());
}

export function trimAndFormat(str: string): string {
  return trimPair(str).join('=');
}

export function checkFormat(str: string): boolean {
  try {
    const pair = trimPair(str);
    return Array.isArray(pair) && pair.length === 2 && pair[0].length > 0 && pair[1].length > 0;
  } catch (e) {
    return false;
  }
}
