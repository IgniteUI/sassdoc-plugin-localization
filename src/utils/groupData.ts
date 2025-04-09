export function byGroupAndType(data: Array<any>) {
  const sorted = {};

  for (const item of data) {
    const group = item.group[0];
    const type = item.context.type;

    if (!(group in sorted)) {
      sorted[group] = {};
    }

    if (!(type in sorted[group])) {
      sorted[group][type] = [];
    }

    sorted[group][type].push(item);
  }

  return sorted;
}
