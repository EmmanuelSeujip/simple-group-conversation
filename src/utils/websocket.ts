import { Client, type StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type Message from '../models/messageModel.ts';

const WS_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

type MessageCallback = (message: Message) => void;
type LatestMessagesCallback = (messages: Message[]) => void;
type TypingCallback = (message: Message) => void;

let client: Client | null = null;
let publicSub: StompSubscription | null = null;
let latestSub: StompSubscription | null = null;

export function connectWebSocket(
    token: string,
    onMessage: MessageCallback,
    onLatestMessages: LatestMessagesCallback,
    onTyping: TypingCallback,
    onConnected?: () => void,
    onDisconnected?: () => void,
) {
    if (client?.active) return;

    client = new Client({
        webSocketFactory: () => new SockJS(`${WS_URL}/ws`),
        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },
        reconnectDelay: 3000,
        onConnect: () => {
            onConnected?.();

            // S'abonner au topic public (messages + typing)
            publicSub = client!.subscribe('/topic/public', (frame) => {
                const msg: Message = JSON.parse(frame.body);
                if (msg.type === 'TYPING') {
                    onTyping(msg);
                } else {
                    onMessage(msg);
                }
            });

            // S'abonner aux derniers messages par utilisateur
            latestSub = client!.subscribe('/topic/latest-messages', (frame) => {
                const messages: Message[] = JSON.parse(frame.body);
                onLatestMessages(messages);
            });
        },
        onDisconnect: () => {
            onDisconnected?.();
        },
        onStompError: (frame) => {
            console.error('STOMP error', frame);
        },
    });

    client.activate();
}

export function disconnectWebSocket() {
    publicSub?.unsubscribe();
    latestSub?.unsubscribe();
    client?.deactivate();
    client = null;
}

export function sendMessage(content: string) {
    if (!client?.active) return;
    client.publish({
        destination: '/app/chat.sendingMessage',
        body: JSON.stringify({
            content,
            type: 'CHAT',
            // sentAt omis → le backend applique LocalDateTime.now()
        }),
    });
}

export function sendTyping() {
    if (!client?.active) return;
    client.publish({
        destination: '/app/chat.typing',
        body: JSON.stringify({
            content: '',
            type: 'TYPING',
            // sentAt omis → géré côté backend
        }),
    });
}

export function requestLatestMessages() {
    if (!client?.active) return;
    client.publish({
        destination: '/app/chat.latestPerUser',
        body: JSON.stringify({}),
    });
}

export function isConnected(): boolean {
    return client?.active ?? false;
}
