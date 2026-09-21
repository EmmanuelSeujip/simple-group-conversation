import {create} from "zustand";
import type User from "../models/userModel.ts";

interface UserStoreState {
    user:User | null,
    setUser: (user: User | null) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    error : string | null,
    setError: (error: string | null) => void,
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
    }

}));