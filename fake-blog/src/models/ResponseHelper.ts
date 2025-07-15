export type ResponseHelper<T> = {
    status: string,
    success: boolean,
    message: string,
    meta: {
        current_page: number,
        last_page: number
    }
    data: T
}