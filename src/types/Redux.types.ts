export interface ReduxState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface ReduxStatus {
  status: boolean;
  loading: boolean;
  error: string | null;
}
