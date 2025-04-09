export function byGroupAndType(data: Array<any>) {
  const sorted = new Map();

  for (const item of data) {
    const group = item.group[0];
    const type = item.context.type;

    if (!sorted.has(group)) {
      sorted.set(group, new Map());
    }

    const groupMap = sorted.get(group);

    if (!groupMap.has(type)) {
      groupMap.set(type, []);
    }

    groupMap.get(type).push(item);
  }

  return sorted;
}
