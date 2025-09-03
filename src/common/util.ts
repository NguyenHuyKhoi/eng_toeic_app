export function removeUndefinedFields(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}
export function paginate(
  data: any[],
  total: number,
  per_page: number,
  current_page: number
) {
  let from = (current_page - 1) * per_page + 1;
  let to = current_page * per_page <= total ? current_page * per_page : total;
  if (from > to) from = to = 0;
  return {
    data: data.slice(from - 1, to),
    pagination: {
      total: total,
      per_page: per_page,
      current_page: current_page,
      last_page: Math.ceil(total / per_page),
      from: from,
      to: to,
    },
  };
}
