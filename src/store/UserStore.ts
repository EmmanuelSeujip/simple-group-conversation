import {create} from "zustand";
import type User from "../models/userModel.ts";

interface UserStoreState {
    user:User
}
export const userStore = create<UserStoreState> (()=> ({
    user:{
        username:"EmmanuelSeujip",
        avatarColor:"gray",
        lastSeen: null,
        isOnline:false
    }
}));