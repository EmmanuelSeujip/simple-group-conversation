import { create } from "zustand";
import type Message from "../models/messageModel.ts";
import { sender } from "../utils/sender.ts";
import {
    connectWebSocket,
    disconnectWebSocket,
    sendMessage as wsSendMessage,
    sendTyping as wsSendTyping,
} from "../utils/websocket.ts";

interface TypingUser {
    username: string;
    avatarColor: string;
    expiresAt: number;
}

interface MessageStoreState {
    messages: Message[];
    lastMessage: Message[];
    typingUsers: TypingUser[];
    wsConnected: boolean;

    /** Charge l'historique via REST */
    setMessage: () => Promise<void>;

    /** Ouvre la connexion WebSocket */
    connectWs: (token: string) => void;

    /** Ferme la connexion WebSocket */
    disconnectWs: () => void;

    /** Envoie un message via WebSocket */
    sendMessage: (content: string) => void;

    /** Envoie un signal typing via WebSocket */
    sendTyping: () => void;

    /** Ajoute un message (reçu du WS ou optimiste) */
    addMessage: (message: Message) => void;

    /** Met à jour les derniers messages depuis le WS */
    setLastMessageFromWs: (messages: Message[]) => void;

    /** Marque un utilisateur comme en train de taper */
    setTypingUser: (message: Message) => void;
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

let typingTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const messageStore = create<MessageStoreState>((set, get) => ({
    messages: [],
    lastMessage: [],
    typingUsers: [],
    wsConnected: false,

    setMessage: async (): Promise<void> => {
        const messages = await sender<Message[]>({ url: "/api/messages" });
        const sorted = [...messages].sort(
            (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        );
        set({
            messages: sorted,
            lastMessage: getLastMessagePerUser(sorted),
        });
    },

    connectWs: (token: string) => {
        connectWebSocket(
            token,
            // onMessage : nouveau message CHAT
            (message: Message) => {
                get().addMessage(message);
            },
            // onLatestMessages : mise à jour de la sidebar
            (messages: Message[]) => {
                get().setLastMessageFromWs(messages);
            },
            // onTyping
            (message: Message) => {
                get().setTypingUser(message);
            },
            // onConnected
            () => set({ wsConnected: true }),
            // onDisconnected
            () => set({ wsConnected: false }),
        );
    },

    disconnectWs: () => {
        disconnectWebSocket();
        set({ wsConnected: false });
    },

    sendMessage: (content: string) => {
        wsSendMessage(content);
    },

    sendTyping: () => {
        wsSendTyping();
    },

    addMessage: (message: Message) => {
        const messages = [...get().messages, message];
        set({
            messages,
            lastMessage: getLastMessagePerUser(messages),
        });
    },

    setLastMessageFromWs: (messages: Message[]) => {
        set({ lastMessage: messages });
    },

    setTypingUser: (message: Message) => {
        const username = message.user.username;

        // Nettoie le timer précédent
        if (typingTimers[username]) {
            clearTimeout(typingTimers[username]);
        }

        set((state) => ({
            typingUsers: [
                ...state.typingUsers.filter((u) => u.username !== username),
                {
                    username,
                    avatarColor: message.user.avatarColor,
                    expiresAt: Date.now() + 3000,
                },
            ],
        }));

        // Retire l'utilisateur après 3s sans nouveau signal
        typingTimers[username] = setTimeout(() => {
            set((state) => ({
                typingUsers: state.typingUsers.filter(
                    (u) => u.username !== username
                ),
            }));
            delete typingTimers[username];
        }, 3000);
    },
}));
