import type { User } from "./User"

export type UserToken = {
    user: User;
    token: string;
}