import {useEffect, useRef} from "react";
import {messageStore} from "../../store/MessageStore.ts";
import {userStore} from "../../store/UserStore.ts";
import MessageBubble from "./MessageBubble.tsx";
import MessageComposer from "./MessageComposer.tsx";

const ChatArea = () => {
    const setMessage = messageStore((state) => state.setMessage);
    const messages = messageStore((state) => state.messages);
    const currentUser = userStore((state) => state.user);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessage();
    }, [setMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <section
            className="flex flex-col flex-1 min-w-0 min-h-0 h-full bg-white
                       rounded-2xl sm:rounded-3xl lg:rounded-4xl
                       shadow-2xl shadow-amber-100 border border-amber-50
                       px-3 sm:px-5 py-3 sm:py-4 gap-3"
        >
            <header className="flex-shrink-0 pb-2 border-b border-amber-100">
                <h2 className="font-semibold text-base sm:text-lg text-gray-800">Discussion</h2>
                <p className="text-xs sm:text-sm text-gray-500">Chat ouvert · plusieurs intervenants</p>
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
                            isOwn={message.user.username === currentUser.username}
                        />
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            <MessageComposer />
        </section>
    );
};

export default ChatArea;
