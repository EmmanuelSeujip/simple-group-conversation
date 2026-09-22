import {create} from "zustand";
import type User from "../models/userModel.ts";
import type {AuthResponse, LoginRequest} from "../models/request/authRequest.ts";
import {sender} from "../utils/sender.ts";
import axios from "axios";

interface UserStoreState {
    user:User | null,
    setUser: (user: User | null) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    error : string | null,
    setError: (error: string | null) => void,
    log: ({ username, password ,route}:LogRequest) => Promise<boolean>,
    logout: () => void,
}

interface LogRequest {
    username: string;
    password: string;
    route: string;
}
export const userStore = create<UserStoreState> ((set)=> ({
    user:null,
    setUser: (user:User | null):void => {
        set({user:user})
    },
    loading:true,
    setLoading:(loading:boolean):void => {
        set({loading:loading})
    },
    error:null,
    setError:(error:string |null):void=>{
        set({error:error})
    },
    log: async ({ username, password ,route}:LogRequest):Promise<boolean> => {
        set({ error: null });
        try {
            const res = await sender<AuthResponse, LoginRequest>({
                url: `/api/auth/${route}`,
                method: "POST",
                data: { username, password },
            });
            localStorage.setItem('token', res.token);

            const me = await sender<User>({ url: "/api/auth/me", method: "GET" });
            set({ user: me, loading: false });
            return true;
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Échec de connexion'
                : 'Échec de connexion';
            set({ error: message, loading: false });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
    }
}));