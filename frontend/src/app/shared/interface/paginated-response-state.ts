
export interface PaginatedResponseState<T> {
    loading: boolean,
    error?: any,
    data?: T
}