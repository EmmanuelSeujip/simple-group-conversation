import {create} from "zustand";
import type Message from "../models/messageModel.ts";
import {sender} from "../utils/sender.ts";


interface MessageStoreState {
    messages: Message[];
    setMessage: () => Promise<void>;
    lastMessage: Message[];
    setLastMessage: () => Promise<void>;
    addMessage: (message: Message) => void;
}

function getLastMessagePerUser(messages: Message[]): Message[] {
    const byUser = new Map<string, Message>();

    for (const message of messages) {
        const key = message.user.username;
        const existing = byUser.get(key);
        if (!existing || new Date(message.sentAt) > new Date(existing.sentAt)) {
            byUser.set(key, message);
        }
    }

    return Array.from(byUser.values()).sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
}

export const messageStore = create<MessageStoreState>((set, get) => ({
    lastMessage: [],
    messages: [],
    setLastMessage: async (): Promise<void> => {
        const messages = await sender<Message[]>({url: '/messages'});
        set({lastMessage: getLastMessagePerUser(messages)});
    },
    setMessage: async (): Promise<void> => {
        const messages = await sender<Message[]>({url: '/messages'});
        const sorted = [...messages].sort(
            (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        );
        set({
            messages: sorted,
            lastMessage: getLastMessagePerUser(sorted),
        });
    },
    addMessage: (message: Message) => {
        const messages = [...get().messages, message];
        set({
            messages,
            lastMessage: getLastMessagePerUser(messages),
        });
    },
}));
