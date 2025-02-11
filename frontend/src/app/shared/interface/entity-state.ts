export interface IEntityState<T> {
    data?: T | null,
    loading?: boolean,
    error?: any
}