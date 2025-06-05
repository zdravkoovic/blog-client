import { createContext } from "react";
import type { User } from "../Models/User";

export const UserContext = createContext<User | null>(null);