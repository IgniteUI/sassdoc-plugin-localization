export function byGroupAndType(data: Array<any>) {
  const result = Object.create(null);

  for (const item of data) {
    const group = item?.group?.[0];
    const type = item?.context?.type;

    if (group === undefined || type === undefined) {
      continue;
    }

    if (!Object.prototype.hasOwnProperty.call(result, group)) {
      result[group] = Object.create(null);
    }

    if (!Object.prototype.hasOwnProperty.call(result[group], type)) {
      result[group][type] = [];
    }

    result[group][type].push(item);
  }

  return result;
}
