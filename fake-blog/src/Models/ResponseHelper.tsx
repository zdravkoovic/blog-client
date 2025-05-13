export type ResponseHelper<T> = {
    status: string,
    success: boolean,
    message: string,
    data: T
}