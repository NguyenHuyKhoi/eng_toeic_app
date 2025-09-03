export interface EntityBase {
  id: string;
}
export interface IPagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface IList<T> {
  data: T[];
  pagination: IPagination;
}
