import { createContext } from "react";
import type { User } from "../models/User";

export const UserContext = createContext<User | null>(null);