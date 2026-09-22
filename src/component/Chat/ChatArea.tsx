import {useEffect, useRef} from "react";
import {messageStore} from "../../store/MessageStore.ts";
import {userStore} from "../../store/UserStore.ts";
import MessageBubble from "./MessageBubble.tsx";
import MessageComposer from "./MessageComposer.tsx";

const TypingIndicator = ({names}: {names: string[]}) => {
    if (names.length === 0) return null;
    const label =
        names.length === 1
            ? `${names[0]} est en train d'écrire…`
            : `${names.slice(0, 2).join(", ")} écrivent…`;

    return (
        <div className="flex items-center gap-2 px-1 py-0.5">
            <div className="flex gap-1 items-center">
                <span
                    className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                    style={{animationDelay: "0ms"}}
                />
                <span
                    className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                    style={{animationDelay: "150ms"}}
                />
                <span
                    className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                    style={{animationDelay: "300ms"}}
                />
            </div>
            <span className="text-xs text-gray-400 italic">{label}</span>
        </div>
    );
};

const ChatArea = () => {
    const setMessage = messageStore((state) => state.setMessage);
    const messages = messageStore((state) => state.messages);
    const typingUsers = messageStore((state) => state.typingUsers);
    const currentUser = userStore((state) => state.user);
    const wsConnected = messageStore((state) => state.wsConnected);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessage();
    }, [setMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, typingUsers]);

    const typingNames = typingUsers
        .filter((u) => u.username !== currentUser?.username)
        .map((u) => u.username);

    return (
        <section
            className="flex flex-col flex-1 min-w-0 min-h-0 h-full bg-white
                       rounded-2xl sm:rounded-3xl lg:rounded-4xl
                       shadow-2xl shadow-amber-100 border border-amber-50
                       px-3 sm:px-5 py-3 sm:py-4 gap-3"
        >
            <header className="flex-shrink-0 pb-2 border-b border-amber-100 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-base sm:text-lg text-gray-800">Discussion</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Chat ouvert · plusieurs intervenants</p>
                </div>
                {/* Indicateur de connexion WebSocket */}
                <div className="flex items-center gap-1.5">
                    <span
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-500 ${
                            wsConnected ? "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" : "bg-gray-300"
                        }`}
                    />
                    <span className="text-xs text-gray-400 hidden sm:inline">
                        {wsConnected ? "Connecté" : "Déconnecté"}
                    </span>
                </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 sm:gap-4 py-2 pr-1">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm m-auto">
                        Aucun message pour le moment
                    </p>
                ) : (
                    messages.map((message, index) => (
                        <MessageBubble
                            key={`${message.user.username}-${message.sentAt}-${index}`}
                            message={message}
                            isOwn={message.user.username === currentUser?.username}
                        />
                    ))
                )}

                {/* Indicateur de typing */}
                <TypingIndicator names={typingNames} />
                <div ref={bottomRef} />
            </div>

            <MessageComposer />
        </section>
    );
};

export default ChatArea;
