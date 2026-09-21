import {create} from "zustand";
import type Message from "../models/messageModel.ts";
import {sender} from "../utils/sender.ts";


interface MessageStoreState {
    lastMessage: Message[];
    setLastMessage: () => Promise<void>;
}

export const messageStore= create<MessageStoreState>((set)=>({
    lastMessage:[],
    setLastMessage: async (): Promise<void> => {
        const messages = await sender<Message[]>({ url: '/messages' });
        set({ lastMessage: messages });
    },
}))